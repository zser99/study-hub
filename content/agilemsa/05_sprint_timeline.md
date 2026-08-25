# 2주는 어떻게 흘러가는가: 스프린트 실전 타임라인

*이론만 들으면 막연합니다. 5편에서는 2주짜리 스프린트 하나가 실제로 어떤 하루하루로 채워지는지, 그리고 진행 상황을 어떻게 눈에 보이게(가시화) 관리하는지를 구체적으로 그려봅니다.*

## 2주 스프린트 캘린더

<svg viewBox="0 0 620 110" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto;">
      <g font-size="12" font-weight="700" fill="#fff" text-anchor="middle">
        <rect x="0" y="20" width="90" height="46" rx="8" fill="#1b2a4a"></rect><text x="45" y="40">Day 1</text><text x="45" y="55" font-size="10.5" font-weight="400">Sprint Planning</text>
        <rect x="105" y="20" width="120" height="46" rx="8" fill="#2f6fed"></rect><text x="165" y="40">Day 2-4</text><text x="165" y="55" font-size="10.5" font-weight="400">개발 + Daily Scrum</text>
        <rect x="240" y="20" width="120" height="46" rx="8" fill="#2f6fed"></rect><text x="300" y="40">Day 5-8</text><text x="300" y="55" font-size="10.5" font-weight="400">개발 + Daily Scrum</text>
        <rect x="375" y="20" width="120" height="46" rx="8" fill="#f0a83a"></rect><text x="435" y="40">Day 9</text><text x="435" y="55" font-size="10.5" font-weight="400">개발 마무리</text>
        <rect x="510" y="20" width="110" height="46" rx="8" fill="#1a9e6b"></rect><text x="565" y="40">Day 10</text><text x="565" y="55" font-size="10.5" font-weight="400">Review + Retro</text>
      </g>
    </svg>

*2주(10 영업일) 스프린트의 표준적인 흐름 예시*

## 하루 일과 예시 (Daily Scrum 기준)

<table>
    <tbody><tr><th>시간</th><th>활동</th></tr>
    <tr><td>09:30 – 09:45</td><td>Daily Scrum — 어제/오늘/장애물 공유</td></tr>
    <tr><td>09:45 – 12:00</td><td>개발 집중 시간 (Task 작업)</td></tr>
    <tr><td>14:00 – 17:00</td><td>개발 집중 시간 + 필요 시 Backlog Refinement</td></tr>
    <tr><td>17:00 – 17:15</td><td>Sprint Board 업데이트 (Task 상태 갱신)</td></tr>
  </tbody></table>

## 데일리 스크럼, 실제로는 이렇게 말합니다

팀원 A (백엔드)"어제는 로그인 API 개발을 완료했습니다. 오늘은 토큰 갱신 로직을 진행합니다. 특별한 장애물은 없습니다."

팀원 B (백엔드)"어제는 Gateway 라우팅 설정 작업 중이었고, 오늘 이어서 진행합니다. Kafka 연동 설정 관련해서 SM님과 논의가 필요합니다."

팀원 C (프론트)"어제는 로그인 화면 UI를 완성했습니다. 오늘은 API 연동을 시작합니다. 팀원 A님의 API 완료 시점 확인이 필요합니다."

> 여기서 나온 장애물(Kafka 연동, API 완료 시점)은 데일리 스크럼에서 "발견"만 하고, 실제 논의는 회의를 마친 뒤 관련자끼리 별도로 진행합니다. 15분이라는 시간을 지키기 위한 원칙입니다.

## Sprint Board로 진행 상황 가시화하기

To DoKafka Topic 설정단위 테스트 작성
    In Progress로그인 API 구현JWT 토큰 로직
    DoneGateway 라우팅 설정

Sprint Board(칸반보드) 없이 진행하면, 팀장이든 팀원이든 "지금 뭐가 어디까지 됐는지" 물어봐야만 알 수 있는 상태가 됩니다. 물리 보드든 디지털 도구든, 매일 업데이트되는 보드 하나만 있어도 불필요한 상태 보고 회의를 크게 줄일 수 있습니다.

## Velocity와 Burndown Chart: 팀의 페이스를 숫자로 보기

Velocity(속도)는 한 스프린트 동안 팀이 완료한 Story Point의 합입니다. 몇 번의 스프린트를 거치면 팀의 평균 Velocity가 안정화되는데, 이 숫자를 알면 "다음 스프린트에 얼마나 많은 일을 넣을 수 있을지"를 감이 아니라 데이터로 판단할 수 있습니다. Burndown Chart는 스프린트 기간 동안 남은 작업량이 얼마나 줄어들고 있는지를 그래프로 보여줘서, 일정보다 뒤처지고 있는지를 스프린트 중간에 미리 알아챌 수 있게 해줍니다.

#### 핵심 키워드

- **Sprint Board**: To Do / In Progress / Done 등의 열로 작업 상태를 시각화한 보드. 칸반보드라고도 부른다.
- **Velocity**: 한 스프린트 동안 팀이 완료한 Story Point의 합. 팀의 평균 작업 처리량을 나타낸다.
- **Burndown Chart**: 스프린트 기간 동안 남은 작업량의 변화를 시간 축으로 보여주는 그래프.
- **Blocker (장애물)**: 팀의 진행을 가로막는 문제나 이슈. 데일리 스크럼에서 발견하고 별도로 해결한다.
- **SoS Meeting (Scrum of Scrums)**: 특정 이슈에 대해 별도 해결책 논의가 필요할 때 요청하는 별도 회의.
