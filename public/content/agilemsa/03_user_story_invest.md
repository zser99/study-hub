# 좋은 요구사항 vs 나쁜 요구사항: 유저스토리와 INVEST

*"로그인 기능 개발"이라는 한 줄짜리 요구사항으로 개발을 시작하면, 열에 아홉은 나중에 다시 만나 이야기해야 합니다. 3편에서는 요구사항을 사용자 관점에서 명확하게 쓰는 방법인 유저스토리(User Story)와, 그 품질을 점검하는 INVEST 원칙을 다룹니다.*

## 비즈니스 요구가 실제 작업으로 구체화되는 흐름

<svg viewBox="0 0 620 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;height:auto;">
      <g font-size="13" font-weight="700" fill="#fff" text-anchor="middle">
        <rect x="0" y="30" width="130" height="40" rx="8" fill="#8b93a6"></rect><text x="65" y="55">비즈니스 요구</text>
        <rect x="165" y="30" width="110" height="40" rx="8" fill="#5b6b8c"></rect><text x="220" y="55">Epic</text>
        <rect x="310" y="20" width="140" height="60" rx="8" fill="#2f6fed"></rect><text x="380" y="45">User Story</text><text x="380" y="63" font-size="11" font-weight="400">(오늘의 주제)</text>
        <rect x="485" y="30" width="120" height="40" rx="8" fill="#1a9e6b"></rect><text x="545" y="55">Task</text>
      </g>
      <text x="147" y="55" font-size="18" fill="#b7bcc9">›</text>
      <text x="292" y="55" font-size="18" fill="#b7bcc9">›</text>
      <text x="467" y="55" font-size="18" fill="#b7bcc9">›</text>
    </svg>

*Product Backlog는 Epic·User Story 단위로 구성되며, Sprint에 들어온 User Story가 Task로 쪼개져 Sprint Backlog가 됩니다.*

## 유저스토리 작성 템플릿

유저스토리는 개발자가 "무엇을 만들지" 나열하는 명세서가 아니라, 사용자가 어떤 가치를 얻는지를 설명하는 짧은 문장입니다. 형식은 다음과 같습니다.

> **As a** [사용자 유형], **I want** [원하는 기능/행동], **So that** [얻고자 하는 가치/이유]  
  
예) As a 회원, I want 비밀번호를 재설정하고 싶다, So that 계정 접근 권한을 다시 얻을 수 있다.

이 형식이 중요한 이유는, PO는 "이 기능이 누구에게 무슨 가치를 주는지"를 설명하고, 개발자는 그 가치를 제공하기 위한 기술적 역할과 책임을 갖는다는 역할 분담이 자연스럽게 드러나기 때문입니다.

## Before / After로 보는 실전 차이

Before — 모호한 작성"로그인 기능 개발"
      
        누가(사용자 유형) 사용하는지 불명확
        왜(가치) 필요한지 이유가 없음
        완료 기준(인수조건)이 없어 검증 불가
        팀마다 다르게 해석할 위험이 큼
      
    
    After — INVEST 적용As a 회원, I want 이메일/비밀번호로 로그인하고 싶다, So that 내 계정에 안전하게 접근할 수 있다
      
        올바른 정보 입력 시 메인 화면으로 이동한다
        잘못된 정보 입력 시 오류 메시지를 표시한다
        5회 연속 실패 시 계정이 일시 잠긴다

## INVEST 원칙: 좋은 유저스토리인지 점검하기

<table>
    <tbody><tr><th>원칙</th><th>의미</th></tr>
    <tr><td><b>I</b>ndependent (독립적)</td><td>다른 스토리와 독립적으로 개발 가능해야 한다</td></tr>
    <tr><td><b>N</b>egotiable (협상 가능)</td><td>세부 구현은 협의 가능해야 한다 (계약이 아닌 대화)</td></tr>
    <tr><td><b>V</b>aluable (가치 있음)</td><td>사용자 및 고객에게 명확한 가치를 제공해야 한다</td></tr>
    <tr><td><b>E</b>stimable (추정 가능)</td><td>팀이 작업 규모를 추정할 수 있을 정도로 명확해야 한다</td></tr>
    <tr><td><b>S</b>mall (작음)</td><td>한 Sprint 내 완료 가능한 크기여야 한다</td></tr>
    <tr><td><b>T</b>estable (검증 가능)</td><td>완료 여부를 검증할 수 있는 기준이 있어야 한다</td></tr>
  </tbody></table>

## 얼마나 상세하게 써야 할까

모든 유저스토리를 처음부터 완벽하게 쓸 필요는 없습니다. 오히려 너무 이른 시점에 과하게 상세화하면, 나중에 우선순위가 바뀌었을 때 들인 노력이 낭비됩니다. 그래서 실무에서는 상세화 수준을 단계적으로 높여갑니다.

<table>
    <tbody><tr><th>시점</th><th>상세화 수준</th></tr>
    <tr><td>백로그 초기 등록 시</td><td>제목 + 한 줄 가치 정도로 개략적으로 기록 (Epic 수준)</td></tr>
    <tr><td>Backlog Refinement 시점</td><td>Sprint 진입 후보로 좁혀지면 팀과 함께 세부 조건·인수기준 논의</td></tr>
    <tr><td>Sprint Planning 직전</td><td>INVEST 기준을 충족하도록 상세화, Task 분할이 가능한 수준까지</td></tr>
    <tr><td>Sprint 진행 중</td><td>필요 이상으로 앞서 상세화하지 않음 (Just-in-time 원칙)</td></tr>
  </tbody></table>

> **Just-in-time 원칙** — "필요한 시점에, 필요한 만큼만" 구체화한다는 원칙입니다. 몇 달 뒤에나 시작할 스토리를 지금부터 세세하게 다듬는 것은 시간 낭비일 가능성이 높습니다.

#### 핵심 키워드

- **Epic**: 여러 개의 User Story로 나뉠 만큼 큰 단위의 기능 덩어리. 예: "회원 관리 기능 전체".
- **User Story**: 사용자 관점에서 짧게 기술된 기능 요구사항. "As a ~, I want ~, So that ~" 형식으로 작성한다.
- **Task**: User Story를 실제로 구현하기 위해 쪼갠 더 작은 작업 단위. Sprint Backlog를 구성한다.
- **인수 기준 (Acceptance Criteria)**: 해당 스토리가 '완료'로 인정되기 위한 구체적 조건. Given-When-Then 형식으로 쓰기도 한다.
- **INVEST**: 좋은 User Story의 6가지 조건(Independent, Negotiable, Valuable, Estimable, Small, Testable)을 점검하는 체크리스트.
