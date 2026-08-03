const quizzes = {
  spring: [
    {
      question: 'DI(의존관계 주입) 방식 중 생성자 주입이 권장되는 이유로 틀린 것은?',
      choices: [
        'final 키워드를 사용할 수 있어 불변성을 보장한다',
        '필수 의존관계를 명확하게 표현한다',
        '순환참조를 애플리케이션 실행 시점에 조기 발견할 수 있다',
        '런타임에 의존관계를 자유롭게 교체할 수 있다',
      ],
      answerIndex: 3,
      explanation:
        '생성자 주입은 객체 생성 시점에 의존관계가 고정되는 방식이라 오히려 런타임 교체가 불가능한 것이 특징입니다.',
    },
    {
      question: '@Component와 @Bean의 차이로 올바른 것은?',
      choices: [
        '두 방식 모두 외부 라이브러리 클래스에 자유롭게 사용할 수 있다',
        '@Component는 내가 만든 클래스에, @Bean은 외부 라이브러리 클래스를 등록할 때 주로 쓰인다',
        '@Bean은 클래스 위에, @Component는 메서드 위에 붙인다',
        '@Bean으로 등록한 빈은 컴포넌트 스캔 대상이 된다',
      ],
      answerIndex: 1,
      explanation:
        '@Component는 내가 만든 클래스를 스캔 대상으로 등록하는 애노테이션이고, @Bean은 소스를 수정할 수 없는 외부 라이브러리 클래스를 자바 설정 코드로 직접 등록할 때 사용합니다.',
    },
    {
      question: '컴포넌트 스캔이 빈 등록 대상을 찾는 방식은?',
      choices: [
        'XML 설정 파일에 나열된 클래스만 찾는다',
        '클래스패스를 탐색해 @Component 계열 애노테이션이 붙은 클래스를 찾아 BeanDefinition으로 등록한다',
        '런타임에 호출된 클래스만 등록한다',
        '데이터베이스에 저장된 목록을 조회한다',
      ],
      answerIndex: 1,
      explanation:
        '컴포넌트 스캔은 지정된 패키지의 클래스패스를 뒤져 @Component 계열 애노테이션이 붙은 클래스를 찾아낸 뒤 BeanDefinition을 등록하는 방식으로 동작합니다.',
    },
    {
      question: '스프링 AOP가 프록시를 만드는 주된 목적은?',
      choices: [
        '메모리 사용량을 줄이기 위해',
        '핵심 로직과 로깅·트랜잭션 같은 부가 기능을 분리하기 위해',
        '컴파일 속도를 높이기 위해',
        '빈 등록 순서를 조정하기 위해',
      ],
      answerIndex: 1,
      explanation:
        'AOP는 프록시를 통해 핵심 비즈니스 로직과 로깅, 트랜잭션 같은 횡단 관심사(부가 기능)를 분리해서 관리하기 위한 기술입니다.',
    },
    {
      question: '스프링 MVC에서 모든 HTTP 요청이 가장 먼저 도착하는 진입점은?',
      choices: ['Controller', 'DispatcherServlet', 'ViewResolver', 'HandlerAdapter'],
      answerIndex: 1,
      explanation:
        'DispatcherServlet이 모든 요청을 가장 먼저 받아 적절한 Controller로 위임하는 프론트 컨트롤러 역할을 합니다.',
    },
    {
      question: '필터(Filter)와 인터셉터(Interceptor)의 차이로 올바른 것은?',
      choices: [
        '필터는 서블릿 컨테이너 레벨에서, 인터셉터는 스프링 컨텍스트(DispatcherServlet) 레벨에서 동작한다',
        '인터셉터는 서블릿 컨테이너 레벨에서만 동작한다',
        '필터가 인터셉터보다 항상 늦게 실행된다',
        '필터는 HandlerMethod 정보에 자유롭게 접근할 수 있다',
      ],
      answerIndex: 0,
      explanation:
        '필터는 DispatcherServlet 이전 서블릿 컨테이너 레벨에서, 인터셉터는 DispatcherServlet 내부(스프링 컨텍스트) 레벨에서 동작한다는 차이가 있습니다.',
    },
    {
      question: 'JPA 영속성 컨텍스트에 대한 설명으로 틀린 것은?',
      choices: [
        '1차 캐시를 제공한다',
        '변경 감지(Dirty Checking)로 별도 update 호출 없이 변경을 반영한다',
        '엔티티를 수정하면 즉시 데이터베이스에 반영된다',
        '동일한 엔티티에 대해 동일성을 보장한다',
      ],
      answerIndex: 2,
      explanation:
        '영속성 컨텍스트의 변경 사항은 트랜잭션 커밋(또는 flush) 시점에 반영되지, 수정 즉시 데이터베이스에 반영되지 않습니다.',
    },
    {
      question: '스프링 부트의 자동 설정(Auto Configuration)이 동작하는 핵심 원리는?',
      choices: [
        'XML 설정 파일을 자동으로 생성해준다',
        '클래스패스에 있는 라이브러리를 감지해 조건에 맞는 빈을 자동으로 등록한다',
        '개발자가 작성한 모든 설정을 무시한다',
        '항상 모든 빈을 무조건 등록한다',
      ],
      answerIndex: 1,
      explanation:
        '@Conditional 계열 애노테이션을 기반으로 클래스패스 상황(어떤 라이브러리가 있는지 등)에 따라 조건에 맞는 빈을 자동으로 등록해주는 것이 자동 설정의 핵심입니다.',
    },
    {
      question: '스프링 시큐리티에서 인증(Authentication)과 인가(Authorization)의 차이는?',
      choices: [
        '인증은 "누구인지" 확인하는 것, 인가는 "무엇을 할 수 있는지" 확인하는 것이다',
        '두 용어는 완전히 같은 의미다',
        '인가가 항상 인증보다 먼저 일어난다',
        '인증은 JWT를 쓸 때만 필요하다',
      ],
      answerIndex: 0,
      explanation:
        '인증은 사용자가 누구인지 확인하는 절차이고, 인가는 인증된 사용자가 특정 자원에 접근할 권한이 있는지 확인하는 절차입니다.',
    },
    {
      question: '테스트 피라미드에서 가장 아래(가장 많은 비중)를 차지해야 하는 테스트는?',
      choices: ['E2E 테스트', '단위 테스트(Unit Test)', '수동 테스트', '통합 테스트만 100%'],
      answerIndex: 1,
      explanation:
        '테스트 피라미드는 빠르고 안정적인 단위 테스트를 가장 많이, 느리고 깨지기 쉬운 E2E 테스트를 가장 적게 두는 구조를 권장합니다.',
    },
  ],
}

export default quizzes
