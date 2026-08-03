# 스크럼, 3가지 역할과 4가지 이벤트로 이해하기

*스크럼(Scrum)은 애자일을 실제로 운영하는 가장 널리 쓰이는 프레임워크입니다. 용어가 많아 복잡해 보이지만, 뼈대만 놓고 보면 "역할 3개, 회의 4개"로 정리됩니다. 2편에서는 이 뼈대를 정확히 잡고, 각 요소가 실제로 어떤 산출물을 만드는지까지 연결해봅니다.*

## 세 가지 역할

Product Owner (PO)제품 백로그를 관리하고 우선순위를 결정하며, 제품의 ROI(투자 대비 성과)에 책임을 진다.
    Scrum Master (SM)스크럼 프로세스가 원활히 돌아가도록 촉진하고, 팀 앞을 가로막는 장애물을 제거한다.
    Development Team기능을 설계·구현·테스트하여, 실제로 동작하는 결과물(Increment)을 완성한다.

세 역할은 위계 관계가 아닙니다. PO가 "무엇을, 왜" 만들지 결정하면 개발팀이 "어떻게" 만들지 스스로 판단하고, SM은 이 모든 과정이 스크럼 규칙대로 굴러가도록 옆에서 돕는 구조입니다. PO가 개발팀에게 일일이 작업 지시를 내리는 순간, 이미 스크럼이 아닌 경우가 많습니다.

## 네 가지 이벤트: 한 스프린트의 리듬

<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:420px;height:auto;">
      <circle cx="260" cy="150" r="120" fill="none" stroke="#dfe4ee" stroke-width="2" stroke-dasharray="4 5"></circle>
      <g font-size="13" font-weight="700" fill="#fff" text-anchor="middle">
        <rect x="195" y="15" width="130" height="40" rx="20" fill="#2f6fed"></rect><text x="260" y="40">Sprint Planning</text>
        <rect x="365" y="130" width="130" height="40" rx="20" fill="#1a9e6b"></rect><text x="430" y="155">Daily Scrum ×N</text>
        <rect x="195" y="245" width="130" height="40" rx="20" fill="#f0a83a"></rect><text x="260" y="270">Sprint Review</text>
        <rect x="25" y="130" width="130" height="40" rx="20" fill="#1b2a4a"></rect><text x="90" y="155">Retrospective</text>
      </g>
      <text x="260" y="150" text-anchor="middle" font-size="12" fill="#888">1~4주</text>
      <text x="260" y="167" text-anchor="middle" font-size="12" fill="#888">반복</text>
      <path d="M 300 55 A 120 120 0 0 1 400 130" stroke="#c6cede" stroke-width="2" fill="none" marker-end="url(#arrow)"></path>
      <path d="M 420 170 A 120 120 0 0 1 320 250" stroke="#c6cede" stroke-width="2" fill="none" marker-end="url(#arrow)"></path>
      <path d="M 210 250 A 120 120 0 0 1 110 170" stroke="#c6cede" stroke-width="2" fill="none" marker-end="url(#arrow)"></path>
      <path d="M 105 125 A 120 120 0 0 1 210 55" stroke="#c6cede" stroke-width="2" fill="none" marker-end="url(#arrow)"></path>
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#c6cede"></path></marker></defs>
    </svg>

*Sprint Planning → Daily Scrum(매일 반복) → Sprint Review → Retrospective, 그리고 다음 Sprint로 반복됩니다.*

<table>
    <tbody><tr><th>이벤트</th><th>권장 소요시간</th><th>참석자</th><th>핵심 아젠다</th></tr>
    <tr><td>Sprint Planning</td><td>2시간 (2주 Sprint 기준)</td><td>전체 팀</td><td>목표 합의 → Backlog 선택 → Task 분할</td></tr>
    <tr><td>Daily Scrum</td><td>15분</td><td>Dev팀 + SM</td><td>어제 한 일 / 오늘 할 일 / 장애물 공유</td></tr>
    <tr><td>Sprint Review</td><td>1시간</td><td>전체 + 이해관계자</td><td>동작하는 결과물 데모, 피드백 수집</td></tr>
    <tr><td>Retrospective</td><td>45분</td><td>전체 팀</td><td>Keep / Problem / Try 회고</td></tr>
  </tbody></table>

> **타임박스(Time-box)** 가 핵심입니다. 정해진 시간을 넘기지 않는 것이 원칙이며, 논의가 길어지면 별도 회의로 분리해 해당 이벤트의 시간을 지킵니다. 15분짜리 데일리 스크럼이 30분, 40분으로 늘어지기 시작하면 이미 스크럼의 리듬이 무너지고 있다는 신호입니다.

## 세 가지 산출물

<table>
    <tbody><tr><th>산출물</th><th>설명</th></tr>
    <tr><td>Product Backlog</td><td>제품에 필요한 모든 요구사항의 우선순위화된 목록. PO가 소유·관리하며 지속적으로 정제된다.</td></tr>
    <tr><td>Sprint Backlog</td><td>이번 Sprint에서 완료하기로 선택한 백로그 항목과, 이를 구현하기 위한 Task 계획.</td></tr>
    <tr><td>Increment</td><td>Sprint 종료 시점까지 완료된 모든 백로그 항목의 합. '완료(Done)' 기준을 충족해야 한다.</td></tr>
  </tbody></table>

## 스크럼을 지탱하는 다섯 가지 가치

Scrum.org는 스크럼이 실제로 작동하려면 다섯 가지 가치가 팀에 스며있어야 한다고 강조합니다.

Courage 용기
    Focus 집중
    Commitment 확약
    Respect 존중
    Openness 개방성

이 다섯 가지는 뻔한 구호처럼 들리지만, 실제로는 매우 실용적인 기준입니다. 예를 들어 데일리 스크럼에서 진짜 막힌 문제를 숨기지 않고 꺼내려면 '용기'와 '개방성'이 필요하고, 회고에서 나온 비판을 받아들이려면 '존중'이 필요합니다.

#### 핵심 키워드

- **Product Owner (PO)**: 제품의 가치를 극대화할 책임을 지는 역할. 백로그 우선순위 결정권을 가진다.
- **Scrum Master (SM)**: 팀의 관리자가 아니라 촉진자(Facilitator). 프로세스를 지키고 장애물을 치우는 역할이다.
- **Increment**: 한 스프린트 동안 완료되어 실제로 동작하는 결과물의 합. '완료의 정의'를 충족해야 인정된다.
- **타임박스 (Time-box)**: 회의나 작업에 미리 정해둔 시간 제한. 정해진 시간이 지나면 논의를 강제로 마무리한다.
- **완료의 정의 (Definition of Done)**: 작업 결과물이 '완료'로 인정받기 위한 팀 공통 기준. 예: 테스트 통과, 코드 리뷰 완료 등.
