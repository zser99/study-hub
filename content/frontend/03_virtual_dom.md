# Virtual DOM, 정말 빠르기만 한 걸까

*React나 Vue를 쓰다 보면 "Virtual DOM 덕분에 빠르다"는 이야기를 자주 듣습니다. 하지만 이 말은 절반만 맞습니다. 진짜 역할과 한계를 이해하려면 먼저 실제 DOM 조작이 왜 느린지부터 살펴봐야 합니다.*

## 1. 실제 DOM 조작이 비싼 이유

실제 DOM(Document Object Model)은 브라우저가 HTML을 파싱해서 만든 트리 구조입니다. DOM 노드를 하나 바꿀 때마다 브라우저는 스타일을 다시 계산하고(reflow), 화면을 다시 그리는(repaint) 작업을 수행할 수 있습니다. 변경이 잦은 UI에서는 이 과정이 반복되며 성능 문제가 누적됩니다.

## 2. Virtual DOM이란 무엇인가

**Virtual DOM**은 실제 DOM을 그대로 흉내 낸 자바스크립트 객체입니다. 상태가 바뀌면 React는 실제 DOM을 바로 건드리지 않고, 먼저 메모리 상에서 새로운 Virtual DOM 트리를 만듭니다.

```js
// 상태가 바뀌면 이런 형태의 자바스크립트 객체가 새로 생성됩니다
{
  type: 'div',
  props: { className: 'card' },
  children: [
    { type: 'h2', props: {}, children: ['제목'] },
    { type: 'p', props: {}, children: ['내용'] }
  ]
}
```

> **공식 문서 · Vue** — Virtual DOM(VDOM)은 "UI의 이상적인, 혹은 '가상의' 표현을 메모리에 유지하면서 실제 DOM과 동기화하는 프로그래밍 개념"입니다. 이 개념을 처음 제시한 것은 React이며, 이후 Vue를 포함한 여러 프레임워크가 저마다 다른 방식으로 구현해 채택했습니다. 즉 특정 기술이라기보다 하나의 설계 패턴에 가깝습니다.

## 3. 동작 원리: Reconciliation과 Diffing

새로운 Virtual DOM 트리가 만들어지면, React는 이전 트리와 비교합니다. 이 비교 과정을 **Reconciliation**(재조정)이라 하고, 차이를 찾아내는 알고리즘을 **Diffing**이라 부릅니다. Vue 쪽 용어로는 이 비교·반영 과정 전체를 **patch**, 최초에 실제 DOM을 만드는 과정은 **mount**라고 부릅니다.

예를 들어 본문 텍스트만 바뀐 경우, 흐름은 다음과 같습니다.

| 이전 Virtual DOM | → Diffing → | 새 Virtual DOM | → Commit → | 실제 DOM |
| --- | --- | --- | --- | --- |
| `div.card` | | `div.card` | | `div.card` (유지) |
| `h2 "제목"` | | `h2 "제목"` | | `h2` (유지) |
| `p "내용"` | | `p "수정된 내용"` (변경) | | `p` 텍스트만 교체 |

> **공식 문서 · React** — `key`의 규칙은 두 가지입니다. 형제 요소 사이에서 유일해야 하고, 렌더링 도중 즉석에서 생성하지 말고 값이 바뀌지 않아야 합니다. 배열 인덱스를 `key`로 쓰거나 `Math.random()`으로 즉석 생성하는 것은 대표적인 안티패턴입니다 — 항목의 순서가 바뀔 때 React가 엉뚱하게 매칭해 불필요한 재생성이 일어나거나, 리스트 안 입력 상태가 엉뚱한 항목으로 옮겨붙는 버그로 이어질 수 있습니다. 또한 "React는 렌더링 결과가 이전과 같다면 DOM을 건드리지 않는다"는 원칙도 명확히 밝히고 있습니다.

## 4. Virtual DOM은 항상 빠른가

Virtual DOM이 있다고 무조건 실제 DOM 조작보다 빠른 것은 아닙니다. 아주 단순한 변경 하나만 있는 경우, DOM을 직접 조작하는 편이 Virtual DOM 트리를 만들고 비교하는 과정보다 빠를 수도 있습니다.

Virtual DOM의 진짜 가치는 다음 조합에서 나옵니다.

**선언적 UI**("어떻게 바꿀지"가 아니라 "어떤 상태여야 하는지"만 기술) + **배치 처리**(여러 상태 변경을 묶어 불필요한 DOM 업데이트 최소화) = **합리적 성능** + 낮은 개발 복잡도

즉 Virtual DOM은 "최적의 성능"을 보장하는 장치가 아니라, "합리적인 성능을 유지하면서 개발 복잡도를 낮춰주는" 장치에 가깝습니다.

## 5. 프레임워크별 접근 차이

> **공식 문서 · Vue의 자체 평가** — React를 포함한 순수 런타임 방식의 Virtual DOM 구현은 "선언성과 정확성을 지키는 대가로 어느 정도 효율을 희생하는 무차별적인(brute-force) 재조정 과정"입니다. 컴파일러가 어느 부분이 바뀔지 미리 알 수 없어, 트리를 매번 전부 순회하며 모든 vnode의 props를 비교해야 합니다.

| 프레임워크 | 접근 방식 |
| --- | --- |
| **React** | 순수 런타임 Virtual DOM. 매 렌더링마다 트리를 전부 순회하며 diffing. 선언성과 정확성 우선. |
| **Vue** — Compiler-Informed VDOM | Cache Static(정적 노드 재사용) · Patch Flags(비트 플래그로 변경 지점 사전 인코딩) · Tree Flattening(동적 노드만 평평하게 추적)으로 비교 범위를 줄임. |
| **Svelte** | Virtual DOM 없음. 컴파일 시점에 "상태가 바뀌면 이 DOM 속성을 이렇게 바꿔라"는 코드를 직접 생성. |

Vue는 프레임워크가 컴파일러와 런타임을 모두 직접 통제한다는 점을 살려 이 문제를 우회합니다. 반면 Svelte는 아예 다른 길을 택해, 런타임 비교 과정 자체를 없앴습니다. 이는 Virtual DOM의 개발 경험(선언적 프로그래밍, 컴포넌트 조합의 유연성)과는 다른 트레이드오프를 가진 접근입니다.

## 마무리

Virtual DOM은 "DOM 조작보다 항상 빠른 마법"이 아니라, "실제 DOM 조작 비용을 최소화하면서도 개발자가 선언적으로 UI를 작성할 수 있게 해주는 중간 계층"입니다. 성능이 정말 중요한 구간이라면 `key`, 불필요한 리렌더링, 배치 처리의 동작 원리를 이해하고 코드를 작성하는 것이 훨씬 중요합니다.

#### 참고 자료

- [Render and Commit – React](https://react.dev/learn/render-and-commit)
- [Rendering Lists – React](https://react.dev/learn/rendering-lists)
- [Rendering Mechanism – Vue.js](https://vuejs.org/guide/extras/rendering-mechanism.html)
