# 동기와 비동기: REST와 이벤트 기반 통신

*서비스가 여러 개로 나뉘면, 서비스끼리 어떻게 대화할지가 새로운 설계 문제가 됩니다. 9편에서는 가장 널리 쓰이는 두 가지 통신 방식, 동기 방식인 REST API와 비동기 방식인 이벤트 기반 메시징(Kafka 등)의 차이와 선택 기준을 다룹니다.*

## 동기(Synchronous) 통신: REST API

<svg viewBox="0 0 560 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:520px;height:auto;">
      <rect x="10" y="40" width="110" height="40" rx="8" fill="#2f6fed"></rect><text x="65" y="64" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">서비스 A</text>
      <rect x="440" y="40" width="110" height="40" rx="8" fill="#1a9e6b"></rect><text x="495" y="64" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">서비스 B</text>
      <line x1="120" y1="52" x2="440" y2="52" stroke="#333" stroke-width="1.5" marker-end="url(#a1)"></line>
      <text x="280" y="45" text-anchor="middle" font-size="11" fill="#333">① 요청</text>
      <line x1="440" y1="68" x2="120" y2="68" stroke="#999" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#a2)"></line>
      <text x="280" y="88" text-anchor="middle" font-size="11" fill="#666">② 응답이 올 때까지 대기 → 응답</text>
      <defs>
        <marker id="a1" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#333"></path></marker>
        <marker id="a2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#999"></path></marker>
      </defs>
    </svg>

*A가 B에 요청을 보내고, 응답이 돌아올 때까지 기다렸다가 다음 작업을 진행합니다.*

REST API는 A 서비스가 B 서비스를 호출하고, 응답이 돌아올 때까지 기다리는 방식입니다. 로그인처럼 "지금 당장 성공했는지 실패했는지 알아야 하는" 요청에 적합합니다. 구조가 직관적이고 디버깅이 쉽다는 장점이 있지만, B 서비스가 느려지거나 다운되면 A 서비스도 함께 지연되거나 실패할 수 있다는 결합 위험이 있습니다.

## 비동기(Asynchronous) 통신: 이벤트 기반 메시징

<svg viewBox="0 0 620 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;height:auto;">
      <rect x="10" y="60" width="110" height="40" rx="8" fill="#2f6fed"></rect><text x="65" y="84" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">주문 서비스</text>
      <rect x="250" y="60" width="120" height="40" rx="8" fill="#8a5cd6"></rect><text x="310" y="84" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">Kafka Topic</text>
      <rect x="500" y="15" width="110" height="36" rx="8" fill="#1a9e6b"></rect><text x="555" y="37" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">알림 서비스</text>
      <rect x="500" y="60" width="110" height="36" rx="8" fill="#1a9e6b"></rect><text x="555" y="82" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">배송 서비스</text>
      <rect x="500" y="105" width="110" height="36" rx="8" fill="#1a9e6b"></rect><text x="555" y="127" text-anchor="middle" fill="#fff" font-size="11" font-weight="700">통계 서비스</text>
      <line x1="120" y1="80" x2="250" y2="80" stroke="#333" stroke-width="1.5" marker-end="url(#a3)"></line>
      <text x="185" y="72" text-anchor="middle" font-size="10.5" fill="#333">이벤트 발행</text>
      <line x1="370" y1="80" x2="500" y2="33" stroke="#999" stroke-width="1.3" marker-end="url(#a4)"></line>
      <line x1="370" y1="80" x2="500" y2="78" stroke="#999" stroke-width="1.3" marker-end="url(#a4)"></line>
      <line x1="370" y1="80" x2="500" y2="123" stroke="#999" stroke-width="1.3" marker-end="url(#a4)"></line>
      <text x="435" y="105" text-anchor="middle" font-size="10" fill="#666">각자 구독(Subscribe)</text>
      <defs>
        <marker id="a3" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#333"></path></marker>
        <marker id="a4" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#999"></path></marker>
      </defs>
    </svg>

*주문 서비스는 "주문 상태 변경" 이벤트만 발행하고, 이후 처리는 각 구독 서비스가 알아서 담당합니다.*

Kafka 같은 메시지 브로커를 이용한 이벤트 기반 통신에서는, 주문 서비스가 "주문 상태가 바뀌었다"는 이벤트를 Topic에 발행(Publish)만 하면 끝입니다. 이 이벤트에 관심 있는 알림 서비스, 배송 서비스, 통계 서비스가 각자 알아서 구독(Subscribe)해서 처리합니다. 주문 서비스는 몇 개의 서비스가 이 이벤트를 받는지, 그 서비스들이 지금 살아있는지조차 신경 쓸 필요가 없습니다.

## 선택 기준 한 줄 정리

<table>
    <tbody><tr><th>구분</th><th>REST (동기)</th><th>메시지 브로커 (비동기)</th></tr>
    <tr><td>적합한 상황</td><td>즉시 응답이 필요한 요청</td><td>서비스 간 느슨한 결합, 이벤트 전파가 목적</td></tr>
    <tr><td>대표 사례</td><td>로그인, 결제 승인 확인</td><td>주문 상태 변경 알림, 로그 수집, 통계 집계</td></tr>
    <tr><td>장점</td><td>구조가 직관적, 디버깅 용이</td><td>서비스 간 결합도 낮음, 장애 격리에 유리</td></tr>
    <tr><td>단점</td><td>호출 대상 서비스 장애 시 함께 영향받음</td><td>흐름 추적이 상대적으로 어려움, 최종 일관성 고려 필요</td></tr>
  </tbody></table>

> **실전 조합** — 실제 MSA 시스템은 REST와 이벤트 방식을 함께 씁니다. 예를 들어 로그인은 REST로 즉시 응답을 받고, 로그인 이후 발생하는 "인증 이력 기록" 같은 부가 작업은 Kafka로 비동기 처리하는 식입니다. 사용자가 기다릴 필요가 없는 작업을 굳이 동기로 묶어두면, 전체 응답 속도만 느려질 뿐입니다.

#### 핵심 키워드

- **동기 통신 (Synchronous)**: 요청을 보낸 쪽이 응답을 받을 때까지 기다렸다가 다음 작업을 진행하는 통신 방식.
- **비동기 통신 (Asynchronous)**: 요청을 보낸 쪽이 응답을 기다리지 않고, 처리 결과를 나중에 별도로 받거나 신경 쓰지 않는 통신 방식.
- **메시지 브로커 (Message Broker)**: 서비스 간 메시지(이벤트)를 중계해주는 미들웨어. Kafka, RabbitMQ 등이 대표적이다.
- **Producer / Consumer**: 메시지를 발행하는 쪽(Producer)과 구독해서 소비하는 쪽(Consumer)을 가리키는 용어.
- **이벤트 기반 아키텍처 (Event-Driven Architecture)**: 서비스 간 통신을 직접 호출이 아닌 이벤트 발행·구독을 통해 이루어지게 설계하는 아키텍처 방식.
