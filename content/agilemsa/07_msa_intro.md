# 마이크로서비스, 왜 다들 이야기할까

*여기서부터는 애자일에서 개발 아키텍처 이야기로 넘어갑니다. 마이크로서비스 아키텍처(MSA)는 거대한 애플리케이션 하나(모놀리식)를 작고 독립적인 서비스 여러 개로 쪼개는 설계 방식입니다. 7편에서는 왜 이렇게 쪼개는지, 그리고 아무렇게나 쪼개도 되는 것은 아니라는 점을 짚어봅니다.*

## 모놀리식 vs 마이크로서비스

<svg viewBox="0 0 620 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;height:auto;">
      <text x="130" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2a4a">Monolithic</text>
      <rect x="40" y="35" width="180" height="110" rx="10" fill="#dfe6f5" stroke="#9db2e0"></rect>
      <g font-size="11" fill="#33456e">
        <rect x="55" y="48" width="70" height="26" rx="5" fill="#fff"></rect><text x="90" y="65" text-anchor="middle">회원</text>
        <rect x="135" y="48" width="70" height="26" rx="5" fill="#fff"></rect><text x="170" y="65" text-anchor="middle">주문</text>
        <rect x="55" y="82" width="70" height="26" rx="5" fill="#fff"></rect><text x="90" y="99" text-anchor="middle">결제</text>
        <rect x="135" y="82" width="70" height="26" rx="5" fill="#fff"></rect><text x="170" y="99" text-anchor="middle">알림</text>
      </g>
      <text x="130" y="128" text-anchor="middle" font-size="10" fill="#6b7fae">↑ 하나의 DB, 하나의 배포 단위</text>
      <text x="480" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2a4a">Microservices</text>
      <g font-size="11" fill="#fff" font-weight="600">
        <rect x="330" y="40" width="90" height="34" rx="8" fill="#2f6fed"></rect><text x="375" y="61" text-anchor="middle">회원</text>
        <rect x="430" y="40" width="90" height="34" rx="8" fill="#1a9e6b"></rect><text x="475" y="61" text-anchor="middle">주문</text>
        <rect x="530" y="40" width="90" height="34" rx="8" fill="#f0a83a"></rect><text x="575" y="61" text-anchor="middle">결제</text>
        <rect x="380" y="90" width="90" height="34" rx="8" fill="#8a5cd6"></rect><text x="425" y="111" text-anchor="middle">알림</text>
      </g>
      <text x="480" y="145" text-anchor="middle" font-size="10" fill="#6b7fae">↑ 서비스별 독립 DB, 독립 배포</text>
    </svg>

*모놀리식은 하나로 묶여 배포되지만, MSA는 서비스마다 독립적으로 개발·배포·확장됩니다.*

## 왜 굳이 쪼개는가

⚡Speed 속도모놀리식에서는 코드 한 줄 변경도 전체 재배포가 필요하지만, MSA는 해당 서비스만 배포하면 된다.
    🛡️Safety 안정성한 서비스에 장애가 나도 다른 서비스는 영향을 덜 받도록 격리할 수 있다.
    📈Scale 확장성트래픽이 몰리는 서비스만 골라서 자원(서버)을 늘릴 수 있다.

반대로 생각해보면, "한 줄 코드 변경이 2주 후에나 반영된다"거나 "장애가 나면 서비스 전체가 다운된다"는 상황이 지금도 자연스럽게 느껴진다면, 아직 MSA가 꼭 필요한 단계는 아닐 수 있습니다. MSA는 목적이 아니라 특정 문제(속도, 안정성, 확장성)를 해결하기 위한 수단입니다.

## 아무렇게나 쪼개면 안 되는 이유

서비스를 나눌 때 가장 중요한 기준은 도메인 경계(Bounded Context)입니다. 기술적으로 비슷하다고 묶는 것이 아니라, 비즈니스 기능 단위와 데이터 소유권을 기준으로 나눠야 합니다. 예를 들어 "차량 정보"와 "운송 정보"는 서로 다른 팀이 서로 다른 속도로 변경하는 영역이라면, 이 둘을 하나의 서비스로 묶어두는 순간 한쪽 변경이 다른 쪽에 계속 영향을 주는 결합이 생깁니다.

<table>
    <tbody><tr><th>서비스 분리 기준</th><th>설명</th></tr>
    <tr><td>도메인 경계 (Bounded Context)</td><td>비즈니스 개념이 명확히 구분되는 경계 단위로 나눈다</td></tr>
    <tr><td>데이터 소유권</td><td>어떤 서비스가 특정 데이터의 '주인'인지 명확히 한다</td></tr>
    <tr><td>변경 빈도</td><td>자주 바뀌는 영역과 잘 바뀌지 않는 영역을 분리한다</td></tr>
  </tbody></table>

> **DB는 어떻게?** MSA로 전환할 때 가장 많이 놓치는 부분이 데이터베이스입니다. 애플리케이션만 나누고 DB는 그대로 공유하면, 여전히 모든 서비스가 하나의 DB 변경에 발이 묶입니다. "애플리케이션 모듈화 → API로만 통신 → 데이터베이스까지 분리"라는 순서로 단계적으로 진행하는 것이 정석입니다.

#### 핵심 키워드

- **모놀리식 (Monolithic)**: 모든 기능이 하나의 코드베이스, 하나의 배포 단위로 묶여 있는 전통적 아키텍처.
- **마이크로서비스 (Microservice)**: 독립적으로 개발·배포·확장 가능한 작은 서비스 단위로 애플리케이션을 나누는 아키텍처.
- **도메인 경계 (Bounded Context)**: 도메인 주도 설계(DDD)에서, 특정 비즈니스 모델이 일관된 의미를 갖는 경계 범위.
- **도메인 주도 설계 (Domain-Driven Design, DDD)**: 비즈니스 도메인의 구조를 소프트웨어 설계에 그대로 반영하려는 설계 방법론.
- **데이터 소유권**: 특정 데이터를 관리할 배타적 책임을 가진 서비스가 명확히 정해져 있는 상태.
