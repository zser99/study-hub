# MSA를 지탱하는 네 기둥

*서비스를 잘게 쪼개면 그만큼 서비스 사이를 연결하고 관리하는 인프라가 중요해집니다. 8편에서는 대부분의 MSA 시스템에 공통적으로 등장하는 네 가지 핵심 구성요소, API 게이트웨이·서비스 디스커버리·인증서버·설정 서버를 하나씩 짚어봅니다.*

## 요청이 흘러가는 경로

<svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;">
      <g font-size="12" font-weight="700" fill="#fff" text-anchor="middle">
        <rect x="0" y="45" width="90" height="40" rx="8" fill="#8b93a6"></rect><text x="45" y="69">Client</text>
        <rect x="130" y="45" width="120" height="40" rx="8" fill="#2f6fed"></rect><text x="190" y="69">API Gateway</text>
        <rect x="290" y="10" width="130" height="34" rx="7" fill="#1a9e6b"></rect><text x="355" y="32" font-size="11">인증서버 (Auth)</text>
        <rect x="290" y="50" width="130" height="30" rx="7" fill="#5b6b8c"></rect><text x="355" y="69" font-size="11">Eureka (Discovery)</text>
        <rect x="290" y="86" width="130" height="30" rx="7" fill="#5b6b8c"></rect><text x="355" y="105" font-size="11">비즈니스 서비스</text>
        <rect x="470" y="45" width="150" height="40" rx="8" fill="#8a5cd6"></rect><text x="545" y="69">Kafka (이벤트 브로커)</text>
      </g>
      <text x="105" y="70" font-size="18" fill="#b7bcc9">›</text>
      <text x="262" y="70" font-size="18" fill="#b7bcc9">›</text>
      <text x="440" y="70" font-size="18" fill="#b7bcc9">›</text>
    </svg>

*① Client → API Gateway(단일 진입점) → ② Gateway가 Eureka에서 서비스 위치 조회 후 라우팅 → ③ 인증 필요 시 Auth 서버가 토큰 검증 → ④ 처리 후 상태 변경 이벤트를 Kafka로 발행*

## 네 가지 핵심 구성요소

<table>
    <tbody><tr><th>구성요소</th><th>역할</th><th>통신 방식</th></tr>
    <tr><td>API Gateway</td><td>모든 요청의 단일 진입점. 라우팅과 인증 필터를 처리</td><td>REST (동기)</td></tr>
    <tr><td>Service Discovery (Eureka)</td><td>서비스 등록 및 위치 탐색. 서비스가 동적으로 늘어나도 서로를 찾을 수 있게 함</td><td>REST 등록, 클라이언트 조회</td></tr>
    <tr><td>Auth Server (인증서버)</td><td>로그인 처리, 토큰(JWT) 발급·검증을 전담</td><td>REST (동기)</td></tr>
    <tr><td>Kafka (이벤트 브로커)</td><td>서비스 간 이벤트 기반 비동기 통신</td><td>Producer / Consumer, Topic 기반</td></tr>
  </tbody></table>

## 왜 이 네 가지가 필요한가

**API Gateway** 가 없다면, 클라이언트가 회원 서비스·주문 서비스·결제 서비스의 주소를 전부 알고 각각 직접 호출해야 합니다. 서비스가 늘어날수록 클라이언트 코드가 복잡해지고, 인증 로직도 서비스마다 중복 구현하게 됩니다. Gateway를 두면 클라이언트는 단 하나의 주소만 알면 되고, 인증·로깅·라우팅 같은 공통 관심사를 한곳에서 처리할 수 있습니다.

**서비스 디스커버리** 는 클라우드 환경에서 특히 중요합니다. 서버가 자동으로 늘었다 줄었다 하는 환경에서는 서비스의 IP 주소가 고정되어 있지 않습니다. Eureka 같은 디스커버리 서버는 각 서비스가 "나 여기 있다"고 등록하고, 다른 서비스가 "이 서비스 어디 있어?"라고 물으면 현재 위치를 알려주는 실시간 전화번호부 역할을 합니다.

**인증서버** 를 별도로 분리하면, 다른 모든 서비스가 매번 로그인 검증 로직을 새로 구현할 필요가 없습니다. 한 곳에서 OAuth 2.0 방식으로 토큰을 발급하고, 각 서비스는 그 토큰이 유효한지만 검증하면 됩니다.

## 보이지 않는 곳의 안전장치

1Circuit Breaker (서킷 브레이커)한 서비스의 장애가 다른 서비스로 연쇄적으로 전이되는 것을 막기 위해, 오류가 잦은 서비스로의 호출을 일시적으로 차단한다.
    2Tracing Monitor (트레이싱 모니터)하나의 요청이 어떤 서비스들을 거쳐 처리됐는지 추적해, 문제가 생겼을 때 어디서 지연·오류가 발생했는지 빠르게 찾아낸다.
    3Config Server (설정 서버)여러 서비스에 흩어진 설정값을 한곳(예: git 저장소)에서 관리해, 설정이 바뀔 때마다 서비스를 재빌드·재배포하지 않아도 되게 한다.

> 서비스가 몇 개 안 될 때는 이런 구성요소가 과해 보일 수 있습니다. 하지만 서비스가 10개, 20개로 늘어나는 순간부터는 이 인프라 없이 MSA를 운영하는 것이 사실상 불가능해집니다. 그래서 MSA 전환은 "언제 이 인프라 투자를 감당할 것인가"의 문제이기도 합니다.

#### 핵심 키워드

- **API Gateway**: 모든 클라이언트 요청이 거쳐가는 단일 진입점. 라우팅, 인증, 프로토콜 변환 등을 담당한다.
- **서비스 디스커버리 (Service Discovery)**: 동적으로 늘고 줄어드는 서비스들의 현재 위치(네트워크 주소)를 등록·조회하는 메커니즘.
- **JWT / OAuth 2.0**: JWT는 인증 정보를 담은 토큰 형식, OAuth 2.0은 이 토큰을 발급·검증하는 표준 인증 프로토콜.
- **Config Server**: 여러 서비스의 설정 정보를 한곳에서 중앙 관리하는 서버.
- **Circuit Breaker (서킷 브레이커)**: 장애가 있는 서비스로의 호출을 차단해 연쇄 장애(장애 전파)를 방지하는 안전장치 패턴.
