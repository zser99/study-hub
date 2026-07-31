# Study Hub

Spring, Network, 운영체제, Kubernetes 네트워킹 — 4개 시리즈 총 40편의 강의체 블로그 글을 한 곳에서 볼 수 있는 React 기반 정적 사이트입니다.

## 실행 방법

```bash
npm install
npm run dev       # 개발 서버
npm run build      # dist/ 폴더에 정적 빌드 생성
npm run preview    # 빌드 결과 미리보기
```

## 새 글 추가하기

1. `public/content/<series>/` 아래에 `.md` 파일과 참조하는 `.svg` 이미지를 함께 넣습니다.
   - `series`는 `spring`, `network`, `os`, `k8s` 중 하나입니다.
   - 마크다운 첫 줄은 `# 제목` 형식이어야 사이드바에 제목이 표시됩니다.
2. 매니페스트를 다시 생성합니다.

```bash
npm run build-manifest
```

이 명령이 `public/content`를 스캔해 `src/data/posts.json`을 새로 만들어줍니다.

## 구조

```
public/content/
  spring/   01_...초안.md, img_01_...svg, ...
  network/  N01_...초안.md, img_n01_...svg, ...
  os/       OS01_...초안.md, img_os01_...svg, ...
  k8s/      K01_...초안.md, img_k01_...svg, ...
src/
  components/Sidebar.jsx   시리즈별 목차
  components/PostView.jsx  마크다운 렌더링 + 이전/다음 글 이동
  components/Home.jsx      랜딩 페이지
  data/posts.json          자동 생성되는 글 목록 매니페스트
  App.jsx                  레이아웃 + 라우트 정의
scripts/build-manifest.mjs  매니페스트 생성 스크립트
```

이미지 경로는 마크다운 안에서 `./img_xxx.svg` 형태의 상대 경로로 쓰여 있고, 렌더링 시 해당 글이 속한 `content/<series>/` 폴더 기준으로 자동 변환됩니다.
