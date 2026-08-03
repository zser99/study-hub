# Study Hub

함께 성장하고 가꿔가는 스터디 데이터 허브입니다.

🔗 https://study-hub-phi-six.vercel.app/

## 주요 기능

- 시리즈별 목차와 검색으로 원하는 글을 바로 찾기
- 읽은 글 자동 표시 + 시리즈별 읽음 진행률
- 글 스크롤 진행률 바
- 시리즈별 쪽지시험 — 점수는 로컬에 저장되고 최고 점수가 홈 화면에 남습니다
- 라이트/다크 테마 전환 (모바일 대응)

## 실행 방법

```bash
npm install
npm run dev       # 개발 서버
npm run build      # dist/ 폴더에 정적 빌드 생성
npm run preview    # 빌드 결과 미리보기
```

## 새 글 추가하기

1. `public/content/<series>/` 아래에 `.md` 파일과 참조하는 `.svg` 이미지를 함께 넣습니다.
   - `series`는 `spring`, `network`, `os`, `k8s`, `linux`, `docker`, `db`, `dataai`, `agilemsa`, `frontend` 중 하나입니다.
   - 마크다운 첫 줄은 `# 제목` 형식이어야 사이드바에 제목이 표시됩니다.
2. 매니페스트를 다시 생성합니다.

```bash
npm run build-manifest
```

이 명령이 `public/content`를 스캔해 `src/data/posts.json`을 새로 만들어줍니다.

새 시리즈의 쪽지시험을 추가하려면 `src/data/quizzes.js`에 `series` 키로 문항 배열을 추가하면 됩니다.

## 구조

```
public/content/
  spring/ network/ os/ k8s/ linux/ docker/ db/ dataai/ agilemsa/ frontend/
    각 폴더에 <번호>_<제목>.md, img_*.svg 형태로 글과 이미지가 들어있습니다.
src/
  components/Sidebar.jsx     시리즈별 목차, 검색
  components/PostView.jsx    마크다운 렌더링 + 이전/다음 글 이동, 읽음 처리
  components/Home.jsx        랜딩 페이지, 시리즈 카드, OSS/크레딧 푸터
  components/QuizPage.jsx    시리즈별 쪽지시험
  hooks/useReadPosts.js      읽은 글 localStorage 관리
  hooks/useQuizScores.js     쪽지시험 점수 localStorage 관리
  hooks/useScrollProgress.js 글 스크롤 진행률
  hooks/useTheme.js          라이트/다크 테마 관리
  data/posts.json            자동 생성되는 글 목록 매니페스트
  data/quizzes.js            시리즈별 쪽지시험 문항
  App.jsx                    레이아웃 + 라우트 정의
scripts/build-manifest.mjs   매니페스트 생성 스크립트
```

이미지 경로는 마크다운 안에서 `./img_xxx.svg` 형태의 상대 경로로 쓰여 있고, 렌더링 시 해당 글이 속한 `content/<series>/` 폴더 기준으로 자동 변환됩니다.

## 기여하기

Study Hub는 오픈소스 프로젝트입니다. 오탈자 수정, 기존 글 보강, 새 글·시리즈 추가, 기능 개선까지 어떤 형태의 기여도 환영합니다. PR을 올릴 때는 [PR 템플릿](.github/PULL_REQUEST_TEMPLATE.md)의 체크리스트를 참고해주세요.

## 만든 사람들

판교 9반 YYM · JSY · JEH · KSH · PJM · KTD
