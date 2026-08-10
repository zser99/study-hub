# 6강. 자바 메모리 구조와 static, final

## 학습 목표
자바 프로그램 실행 중 메모리가 어떻게 세 영역으로 나뉘어 관리되는지 이해하고, 인스턴스와 무관하게 공유되는 `static`, 값 변경을 막는 `final`의 쓰임을 익힌다.

## 1. 자바 메모리 구조
자바가 실행되면 메모리는 크게 세 영역으로 나뉜다.

- **메서드 영역(Method Area)**: 클래스의 설계도(실행 코드, 필드/메서드 정보), `static` 변수, 프로그램 전체가 공유하는 상수 등을 보관한다. 프로그램이 실행되는 동안 단 한 벌만 존재하며 모든 곳에서 공유한다.
- **스택 영역(Stack Area)**: 메서드가 호출될 때마다 그 메서드의 지역 변수(매개변수 포함)와 실행 정보를 담는 "스택 프레임"이 하나씩 쌓인다. 메서드가 끝나면 그 프레임은 제거된다.
- **힙 영역(Heap Area)**: `new`로 생성한 객체(인스턴스)와 배열이 저장되는 공간이다. 더 이상 아무도 참조하지 않는 객체는 가비지 컬렉션(GC)에 의해 자동으로 정리된다.

비유하자면 클래스는 쿠키 틀, 인스턴스는 그 틀로 찍어낸 쿠키다. 쿠키 틀(클래스 정보)은 메서드 영역에 하나만 있고, 찍어낸 쿠키(인스턴스)들은 힙 영역에 여러 개 만들어질 수 있다.

## 2. 스택 구조와 메서드 호출
스택(Stack)은 나중에 넣은 것이 먼저 나오는 자료구조다(후입선출, LIFO). 책을 쌓아두고 맨 위에서만 넣고 빼는 것과 같다. 반대로 먼저 넣은 것이 먼저 나오는 구조는 큐(Queue, 선입선출)라 하며, 대기줄 같은 상황에 쓰인다. 자바는 메서드 호출을 관리할 때 스택 구조를 사용한다.
```java
public class CallMain {
    public static void main(String[] args) {
        System.out.println("main 시작");
        step1();
        System.out.println("main 끝");
    }
    static void step1() {
        System.out.println("step1 시작");
        step2();
        System.out.println("step1 끝");
    }
    static void step2() {
        System.out.println("step2 시작");
        System.out.println("step2 끝");
    }
}
```
실행 결과:
```
main 시작
step1 시작
step2 시작
step2 끝
step1 끝
main 끝
```
`main()`이 호출되면 `main` 프레임이 스택에 쌓인다. `main()`이 `step1()`을 부르면 그 위에 `step1` 프레임이, `step1()`이 `step2()`를 부르면 그 위에 `step2` 프레임이 쌓인다. `step2()`가 끝나면 가장 위에 있던 `step2` 프레임이 제거되고, `step1()`이 이어서 실행되다 끝나면 `step1` 프레임도 제거된다. 마지막으로 `main()`이 끝나면 `main` 프레임도 사라지고 프로그램이 종료된다. **지역 변수(매개변수 포함)는 이 스택 프레임 안에 보관되며, 프레임이 사라지면 그 지역 변수도 함께 사라진다.**

## 3. 힙 영역과 함께 쓰일 때
객체를 다루는 메서드를 호출하면 스택(지역 변수)과 힙(객체 실체)이 함께 동작한다.
```java
static void method1() {
    Ticket t = new Ticket();   // t는 스택에, Ticket 인스턴스는 힙에 생성
    method2(t);                // 참조값이 복사되어 전달됨
}
static void method2(Ticket ticket) {
    // ticket도 같은 힙 인스턴스를 가리킴
}
```
`method2`가 끝나면 `ticket`이라는 지역 변수(스택의 참조값)만 사라질 뿐, 힙에 있는 `Ticket` 인스턴스 자체는 그대로 남는다. `method1`까지 끝나서 `t`도 사라지면, 그 `Ticket` 인스턴스를 가리키는 변수가 아무 곳에도 없게 된다. 이렇게 참조하는 곳이 하나도 없는 객체를 GC가 찾아내 메모리에서 제거한다.

## 4. static 변수가 필요한 이유
발급된 티켓 수를 세는 프로그램을 만든다고 하자. 인스턴스마다 카운트를 갖게 하면 어떻게 될까?
```java
public class Ticket {
    String owner;
    int count;   // 인스턴스 변수

    Ticket(String owner) {
        this.owner = owner;
        count++;
    }
}
```
```java
Ticket t1 = new Ticket("A");
System.out.println(t1.count);  // 1
Ticket t2 = new Ticket("B");
System.out.println(t2.count);  // 1  ← 원하는 결과가 아니다!
```
`t1`, `t2`는 각각 별개의 인스턴스라서 `count`도 서로 독립적으로 존재한다. "지금까지 발급된 전체 티켓 수"를 세려면, 모든 인스턴스가 공유하는 하나의 값이 필요하다. 이때 `static`을 쓴다.
```java
public class Ticket {
    String owner;
    static int totalIssued;   // 클래스 변수(정적 변수)

    Ticket(String owner) {
        this.owner = owner;
        totalIssued++;
    }
}
```
```java
Ticket t1 = new Ticket("A");
System.out.println(Ticket.totalIssued);  // 1
Ticket t2 = new Ticket("B");
System.out.println(Ticket.totalIssued);  // 2
```
`static`이 붙은 변수는 인스턴스마다 새로 만들어지지 않고, **메서드 영역에 딱 하나만 존재**하며 그 클래스로 만든 모든 인스턴스가 공유한다. 그래서 흔히 **클래스 변수(정적 변수)**라 부르고, `static`이 없는 일반 멤버 변수는 **인스턴스 변수**라 부른다.

| 구분 | 인스턴스 변수 | 클래스 변수(static) |
|---|---|---|
| 저장 위치 | 힙 (인스턴스 안) | 메서드 영역 |
| 개수 | 인스턴스 수만큼 | 딱 1개 |
| 생명주기 | 인스턴스가 GC될 때까지 | 프로그램 시작부터 종료까지 |

**접근 방법**: `static` 변수는 `클래스명.변수명`으로 접근하는 것이 원칙이다 (`Ticket.totalIssued`). 인스턴스를 통해서도 접근은 되지만(`t1.totalIssued`), 마치 인스턴스 변수처럼 보여 헷갈릴 수 있으므로 권장하지 않는다.

## 5. static 메서드
인스턴스의 데이터(필드)를 전혀 쓰지 않고 단순 기능만 제공하는 메서드는 `static`으로 선언할 수 있다. 문자열 앞뒤로 기호를 붙여주는 유틸리티를 예로 들어보자.
```java
public class TextStyler {
    public static String wrap(String text) {
        return "[" + text + "]";
    }
}
```
```java
String result = TextStyler.wrap("hello");  // 인스턴스 생성 없이 바로 호출
```
`static` 메서드(클래스 메서드)는 객체를 만들지 않고 `클래스명.메서드명()`으로 바로 호출할 수 있다. 반면 `static`이 없는 메서드(인스턴스 메서드)는 반드시 인스턴스를 먼저 생성해야 호출할 수 있다.

**중요한 제약**: `static` 메서드 내부에서는 인스턴스 변수나 인스턴스 메서드를 직접 사용할 수 없다.
```java
public class Sample {
    int instanceValue;
    static int staticValue;

    static void staticMethod() {
        staticValue++;      // OK: static은 static을 사용 가능
        // instanceValue++; // 컴파일 오류! 어떤 인스턴스인지 알 수 없음
    }

    void instanceMethod() {
        instanceValue++;    // OK
        staticValue++;      // OK: 인스턴스 메서드는 static도 자유롭게 사용 가능
    }
}
```
`static` 메서드는 특정 인스턴스와 연결되지 않은 채 호출되므로, "어떤 인스턴스의 값을 써야 하는지" 알 수가 없어서 인스턴스 변수/메서드에 접근할 수 없다. 반대로 인스턴스 메서드는 자신이 어떤 인스턴스에 속해 있는지 알기 때문에 `static`, 인스턴스 멤버 모두 자유롭게 쓸 수 있다.

**참고**: 우리가 항상 써온 `public static void main(String[] args)`도 `static` 메서드다. 프로그램 시작 시점에는 아직 어떤 인스턴스도 없기 때문에, 인스턴스 생성 없이 바로 실행 가능한 `static`이어야만 프로그램의 시작점이 될 수 있다.

## 6. final: 값을 한 번만 정하고 바꾸지 못하게 하기
`final`이 붙은 변수는 값을 최초 한 번만 할당할 수 있고, 이후에는 변경이 불가능하다.

### 지역 변수 / 매개변수
```java
final int limit = 5;
// limit = 10;  // 컴파일 오류!

static void process(final int value) {
    // value = 99;  // 컴파일 오류! 매개변수 값을 바꿀 수 없음
}
```

### 필드
필드에 `final`을 쓰면, 생성자에서 딱 한 번만 초기화할 수 있다 (이후 변경 불가).
```java
public class Ticket {
    private final String id;   // 생성자에서만 초기화 가능

    public Ticket(String id) {
        this.id = id;
    }

    public void relabel(String newId) {
        // this.id = newId;  // 컴파일 오류!
    }
}
```
이렇게 하면 "발급 후 절대 바뀌면 안 되는 값"(예: 티켓 고유 번호)을 실수로 변경하는 사고를 컴파일 시점에 막을 수 있다.

### 참조형 변수에 final을 쓰면?
`final`은 "변수에 든 값"을 못 바꾸게 막는다. 참조형 변수라면 그 값은 **참조값(주소)**이지, 객체 내부의 필드가 아니다.
```java
final Ticket t = new Ticket("A100");
// t = new Ticket("B200");  // 컴파일 오류! 다른 객체를 참조하도록 바꿀 수 없음

t.relabel("something");  // 이건 객체 내부 상태를 바꾸는 것 -> final과 무관 (단, id 필드 자체가 final이면 이것도 막힘)
```
즉 `final Ticket t`는 "t가 다른 객체를 가리키도록 재할당하는 것"만 막을 뿐, 그 객체 내부의 필드까지 자동으로 막아주지는 않는다. 내부 필드까지 막으려면 그 필드에도 별도로 `final`을 붙여야 한다.

## 7. 상수: static + final
프로그램 전체에서 절대 변하지 않는 고정값(예: 최대 인원 수, 원주율)은 **상수(Constant)**라 하고, 관례상 `static final`로 선언하고 이름은 대문자와 언더스코어(`_`)로 짓는다.
```java
public class AppConfig {
    public static final int MAX_CAPACITY = 500;
    public static final double TAX_RATE = 0.1;
}
```
- `static`이라 메서드 영역에 딱 하나만 존재해 메모리를 낭비하지 않는다.
- `final`이라 실수로라도 값이 바뀔 걱정이 없다.
- 코드 곳곳에 `500`처럼 의미를 알 수 없는 숫자(매직 넘버)를 그대로 쓰는 대신, `AppConfig.MAX_CAPACITY`처럼 이름으로 의미를 드러낼 수 있고, 값을 바꿀 일이 생기면 한 곳만 고치면 된다.

## 확인 문제
1. 스택 영역과 힙 영역에 각각 저장되는 것은 무엇인가?
2. 인스턴스 변수 대신 클래스 변수(static)를 써야 하는 상황은 언제인가?
3. static 메서드 안에서 인스턴스 변수에 접근할 수 없는 이유는?
4. 상수를 선언할 때 `static final`을 함께 쓰는 이유는?

<details>
<summary>정답 확인</summary>

1. 스택 영역에는 지역 변수(매개변수 포함)와 메서드 호출 정보가, 힙 영역에는 `new`로 생성한 객체와 배열이 저장된다.
2. 여러 인스턴스가 공통으로 공유해야 하는 값(예: 전체 생성 개수)을 다룰 때.
3. static 메서드는 특정 인스턴스에 소속되지 않고 호출되므로, 어떤 인스턴스의 필드를 사용해야 할지 알 수 없기 때문이다.
4. static으로 메모리에 단 하나만 존재하게 하고, final로 값이 바뀌지 않도록 고정하기 위해서다.

</details>

## 핵심 정리
| 개념 | 설명 |
|---|---|
| 메서드 영역 | 클래스 정보, static 변수, 공용 상수 보관 |
| 스택 영역 | 메서드 호출마다 지역 변수를 담은 프레임이 쌓임 (LIFO) |
| 힙 영역 | new로 만든 인스턴스/배열 저장, GC 대상 |
| static 변수 | 모든 인스턴스가 공유하는 단 하나의 값 |
| static 메서드 | 인스턴스 생성 없이 클래스명으로 바로 호출, 인스턴스 멤버 접근 불가 |
| final | 값을 한 번만 할당 가능, 참조형은 재할당만 막고 내부 필드는 별개 |
| 상수 | `static final`로 선언하는 변하지 않는 고정값 |

---
다음: **7강. 상속**
