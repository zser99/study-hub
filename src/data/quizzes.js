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
  network: [
    {
      question: '네트워크를 계층으로 나누는 이유로 가장 적절한 것은?',
      choices: [
        '성능을 극대화하기 위해',
        '각 계층이 독립적으로 발전·교체될 수 있도록 관심사를 분리하기 위해',
        '코드 줄 수를 줄이기 위해',
        '하드웨어 비용을 아끼기 위해',
      ],
      answerIndex: 1,
      explanation:
        '계층을 나누면 한 계층(예: 물리 매체)이 바뀌어도 다른 계층(예: 애플리케이션 프로토콜)은 영향을 받지 않는 독립성을 얻을 수 있습니다.',
    },
    {
      question: '스위치가 MAC 주소를 학습하는 방식은?',
      choices: [
        '관리자가 모든 MAC 주소를 정적으로 등록해야 한다',
        '들어오는 프레임의 출발지 MAC 주소를 보고 포트와 매핑해서 학습한다',
        'DNS 서버에 물어봐서 학습한다',
        'IP 주소로부터 MAC 주소를 계산한다',
      ],
      answerIndex: 1,
      explanation:
        '스위치는 프레임이 들어올 때마다 출발지 MAC 주소와 수신 포트를 MAC 주소 테이블에 기록해 이후 트래픽을 해당 포트로만 전달합니다.',
    },
    {
      question: '서브네팅(subnetting)의 목적으로 거리가 먼 것은?',
      choices: [
        '하나의 네트워크를 여러 논리적 네트워크로 분할',
        '브로드캐스트 도메인 축소',
        'IP 주소를 더 효율적으로 할당',
        '물리적 케이블 길이를 늘림',
      ],
      answerIndex: 3,
      explanation:
        '서브네팅은 논리적인 주소 공간 분할과 관리 효율을 위한 것으로, 케이블의 물리적 길이와는 관련이 없습니다.',
    },
    {
      question: 'TCP의 3-way handshake 순서로 올바른 것은?',
      choices: [
        'SYN → SYN-ACK → ACK',
        'ACK → SYN → SYN-ACK',
        'SYN → ACK → SYN-ACK',
        'SYN-ACK → SYN → ACK',
      ],
      answerIndex: 0,
      explanation: '클라이언트의 SYN, 서버의 SYN-ACK, 클라이언트의 ACK 순서로 연결이 수립됩니다.',
    },
    {
      question: 'HTTP/2가 HTTP/1.1보다 개선한 점은?',
      choices: [
        '완전히 새로운 텍스트 기반 프로토콜을 도입했다',
        '하나의 TCP 커넥션에서 여러 요청/응답을 동시에 처리하는 멀티플렉싱을 지원한다',
        '캐시를 전혀 사용하지 않는다',
        'TCP 대신 항상 UDP를 사용한다',
      ],
      answerIndex: 1,
      explanation:
        'HTTP/2는 하나의 커넥션 위에서 여러 스트림을 동시에 주고받는 멀티플렉싱으로 HOL(Head-of-Line) 블로킹 문제를 완화했습니다.',
    },
    {
      question: 'DNS 조회 시 브라우저가 가장 먼저 확인하는 곳은?',
      choices: ['루트 네임서버', '브라우저/OS의 로컬 캐시', 'TLD 네임서버', 'ISP의 DNS 서버'],
      answerIndex: 1,
      explanation:
        '매번 전체 트리를 조회하면 비효율적이므로, 먼저 로컬(브라우저/OS) 캐시에 결과가 남아있는지 확인합니다.',
    },
    {
      question: 'epoll 같은 I/O 멀티플렉싱이 필요한 이유는?',
      choices: [
        '스레드를 무한정 늘리기 위해',
        '적은 수의 스레드로 대량의 동시 연결을 효율적으로 처리하기 위해',
        '디스크 속도를 높이기 위해',
        '프로토콜 자체를 바꾸기 위해',
      ],
      answerIndex: 1,
      explanation:
        'epoll은 이벤트가 발생한 소켓만 통보받아, 연결마다 스레드를 하나씩 배정하지 않고도 대규모 동시 접속을 효율적으로 처리할 수 있게 해줍니다.',
    },
    {
      question: 'TLS 핸드셰이크에서 실제 데이터 암호화에 대칭키를 사용하는 이유는?',
      choices: [
        '대칭키가 비대칭키보다 안전해서',
        '대칭키 암복호화가 비대칭키보다 훨씬 빨라서',
        '대칭키만 인증서 발급이 가능해서',
        '비대칭키는 사용할 수 없어서',
      ],
      answerIndex: 1,
      explanation:
        '비대칭키로 안전하게 대칭키를 교환한 뒤, 실제 데이터 전송은 훨씬 빠른 대칭키 암호화로 처리합니다.',
    },
    {
      question: 'L4 로드밸런서와 L7 로드밸런서의 차이는?',
      choices: [
        'L4는 IP/포트 기준으로, L7은 HTTP 헤더나 URL 같은 애플리케이션 정보를 보고 라우팅한다',
        '둘은 완전히 동일하게 동작한다',
        'L7이 항상 더 빠르다',
        'L4만 HTTPS를 지원한다',
      ],
      answerIndex: 0,
      explanation:
        'L4는 전송 계층(IP/포트) 정보만으로, L7은 애플리케이션 계층(URL, 헤더 등)까지 보고 더 정교하게 라우팅합니다.',
    },
    {
      question: '네트워크 트러블슈팅 시 curl 타이밍 분석에서 가장 먼저 확인하기 좋은 구간은?',
      choices: [
        'DNS 조회 시간',
        '응답 본문 파싱 시간',
        '브라우저 렌더링 시간',
        '자바스크립트 실행 시간',
      ],
      answerIndex: 0,
      explanation:
        '요청의 가장 앞 단계인 DNS 조회부터 확인해야 어느 구간에서 지연이 발생하는지 순서대로 좁혀갈 수 있습니다.',
    },
  ],
  os: [
    {
      question: '운영체제의 핵심 역할이 아닌 것은?',
      choices: ['하드웨어 자원 관리', '프로세스 스케줄링', '웹페이지 렌더링', '메모리 관리'],
      answerIndex: 2,
      explanation: '웹페이지 렌더링은 브라우저의 역할이지 운영체제의 핵심 기능이 아닙니다.',
    },
    {
      question: '프로세스와 스레드의 차이로 올바른 것은?',
      choices: [
        '스레드는 프로세스와 독립된 메모리 공간을 가진다',
        '한 프로세스 내의 스레드들은 코드·데이터·힙 영역을 공유한다',
        '프로세스는 반드시 하나의 스레드만 가질 수 있다',
        '스레드 전환이 프로세스 전환보다 항상 느리다',
      ],
      answerIndex: 1,
      explanation:
        '같은 프로세스에 속한 스레드들은 코드/데이터/힙을 공유하고 스택만 별도로 가지며, 그래서 컨텍스트 스위칭 비용도 더 적습니다.',
    },
    {
      question: 'CPU 스케줄링에서 기아(starvation) 문제를 완화하는 기법은?',
      choices: [
        '우선순위를 절대 바꾸지 않는다',
        'Aging — 오래 기다린 프로세스의 우선순위를 점차 높인다',
        '스케줄링 자체를 하지 않는다',
        '무조건 FIFO만 사용한다',
      ],
      answerIndex: 1,
      explanation:
        'Aging은 대기 시간이 길어질수록 우선순위를 점진적으로 높여, 낮은 우선순위 프로세스가 영원히 실행되지 못하는 상황을 막습니다.',
    },
    {
      question: '데드락(교착상태) 발생의 4가지 조건에 해당하지 않는 것은?',
      choices: ['상호 배제', '점유와 대기', '선점 가능(Preemption)', '순환 대기'],
      answerIndex: 2,
      explanation:
        '데드락의 조건은 "선점 불가능(비선점)"입니다. 자원을 강제로 뺏을 수 있다면(선점 가능) 데드락을 깰 수 있으므로 이는 데드락 조건이 아닙니다.',
    },
    {
      question: '가상 메모리를 사용하는 주된 이유는?',
      choices: [
        '물리 메모리보다 큰 프로그램 실행과 프로세스 간 메모리 격리를 위해',
        'CPU 클럭 속도를 높이기 위해',
        '디스크 용량 자체를 늘리기 위해',
        '네트워크 속도를 개선하기 위해',
      ],
      answerIndex: 0,
      explanation:
        '가상 메모리는 각 프로세스에 독립된 주소 공간을 주어 격리를 보장하고, 물리 메모리보다 큰 프로그램도 실행할 수 있게 해줍니다.',
    },
    {
      question: 'Thrashing(스래싱)이 발생하는 상황은?',
      choices: [
        '캐시 적중률이 100%일 때',
        '페이지 교체가 너무 잦아 CPU가 실제 작업보다 페이징에 더 많은 시간을 쓸 때',
        '메모리가 충분히 남아돌 때',
        '프로세스가 하나만 실행 중일 때',
      ],
      answerIndex: 1,
      explanation:
        '스래싱은 물리 메모리 부족으로 페이지 교체가 지나치게 자주 일어나 전체 시스템 처리량이 급격히 떨어지는 현상입니다.',
    },
    {
      question: 'inode에 대한 설명으로 올바른 것은?',
      choices: [
        '파일의 실제 데이터를 담고 있다',
        '파일의 메타데이터(권한, 크기, 데이터 블록 위치 등)를 담고 있다',
        '파일 이름 자체를 저장한다',
        '디렉토리에서만 사용되고 일반 파일에는 없다',
      ],
      answerIndex: 1,
      explanation:
        'inode는 파일의 실제 내용이 아니라 권한, 소유자, 크기, 데이터 블록 위치 같은 메타데이터를 저장하는 구조체입니다.',
    },
    {
      question: 'DMA(Direct Memory Access)를 사용하는 이유는?',
      choices: [
        'CPU 개입 없이 입출력 장치가 메모리에 직접 접근해 CPU 부담을 줄이기 위해',
        '메모리 용량 자체를 늘리기 위해',
        '인터럽트를 항상 비활성화하기 위해',
        '디스크를 포맷하기 위해',
      ],
      answerIndex: 0,
      explanation:
        'DMA 컨트롤러가 데이터 전송을 대신 처리해, CPU는 그동안 다른 작업을 수행할 수 있어 효율이 높아집니다.',
    },
    {
      question: '컨테이너가 가상머신(VM)보다 가벼운 이유는?',
      choices: [
        '컨테이너는 호스트 커널을 공유하고 네임스페이스·cgroup으로 격리하기 때문',
        '컨테이너는 자체 커널을 포함하기 때문',
        'VM은 커널을 공유하기 때문',
        '차이가 전혀 없다',
      ],
      answerIndex: 0,
      explanation:
        '컨테이너는 별도의 게스트 OS 없이 호스트 커널을 공유하며 네임스페이스와 cgroup으로 격리된 프로세스이기 때문에 VM보다 훨씬 가볍습니다.',
    },
    {
      question: '시스템 장애를 진단할 때 가장 합리적인 접근은?',
      choices: [
        '증상과 무관하게 무작위로 지표를 확인한다',
        '느림·에러 등 증상에 따라 관련 지표(CPU, I/O 등)부터 좁혀가며 확인한다',
        '항상 디스크 지표만 확인한다',
        '로그는 절대 보지 않는다',
      ],
      answerIndex: 1,
      explanation:
        '증상에 맞춰 의심되는 자원(부하 시 CPU, 응답 지연 시 I/O 등)부터 단계적으로 좁혀가는 접근이 효율적인 진단 방법입니다.',
    },
  ],
  k8s: [
    {
      question: '쿠버네티스 클러스터에서 파드 스케줄링을 결정하는 컴포넌트는?',
      choices: ['kubelet', 'kube-scheduler', 'etcd', 'kube-proxy'],
      answerIndex: 1,
      explanation: 'kube-scheduler가 새로 생성된 파드를 어느 노드에 배치할지 결정합니다.',
    },
    {
      question: 'Deployment와 DaemonSet의 차이는?',
      choices: [
        'Deployment는 지정된 개수의 파드를 유지하고, DaemonSet은 (선택된) 모든 노드마다 파드를 1개씩 실행한다',
        '완전히 동일한 리소스다',
        'DaemonSet은 재시작이 불가능하다',
        'Deployment만 롤링 업데이트를 지원한다',
      ],
      answerIndex: 0,
      explanation:
        'DaemonSet은 로그 수집기나 노드 모니터링 에이전트처럼 모든 노드에 하나씩 떠 있어야 하는 워크로드에 사용됩니다.',
    },
    {
      question: '같은 Pod 안 컨테이너들이 네트워크를 공유하는 방식은?',
      choices: [
        '각 컨테이너가 별도의 네트워크 네임스페이스를 가진다',
        '하나의 네트워크 네임스페이스(및 IP)를 함께 공유한다',
        '항상 서로 다른 IP를 가진다',
        'NAT을 통해서만 서로 통신한다',
      ],
      answerIndex: 1,
      explanation:
        '같은 Pod 안의 컨테이너들은 네트워크 네임스페이스를 공유해 localhost로 서로 통신할 수 있고, 외부에서 보는 IP도 하나입니다.',
    },
    {
      question: 'kube-proxy가 Service 트래픽을 실제 Pod로 전달하는 방식(iptables 모드)은?',
      choices: [
        'DNS 라운드로빈만으로 처리한다',
        'DNAT 규칙으로 ClusterIP를 실제 Pod IP로 변환한다',
        '애플리케이션 코드를 직접 수정한다',
        '항상 수동으로 라우팅 테이블을 설정해야 한다',
      ],
      answerIndex: 1,
      explanation:
        'kube-proxy는 Endpoints 정보를 바탕으로 iptables(또는 IPVS) DNAT 규칙을 만들어 ClusterIP로 온 트래픽을 실제 Pod IP로 변환합니다.',
    },
    {
      question: 'EndpointSlice가 해결하는 기존 Endpoints의 문제는?',
      choices: [
        '보안 취약점',
        '대규모 Pod 집합에서 하나의 오브젝트가 너무 커져 갱신 비용이 커지는 확장성 문제',
        '이름 충돌 문제',
        '이미지 저장 공간 문제',
      ],
      answerIndex: 1,
      explanation:
        '기존 Endpoints는 Service당 하나의 오브젝트에 모든 Pod IP를 담아, Pod 하나만 바뀌어도 전체를 재전파해야 했습니다. EndpointSlice는 이를 여러 조각으로 나눠 갱신 범위를 줄입니다.',
    },
    {
      question: 'CoreDNS의 역할은?',
      choices: [
        '파드에 IP 주소를 할당한다',
        '클러스터 내부에서 서비스 이름을 IP로 변환(이름 해석)한다',
        '노드 스케줄링을 담당한다',
        '볼륨을 마운트한다',
      ],
      answerIndex: 1,
      explanation: 'CoreDNS는 클러스터 내부 DNS 서버로, 서비스/파드 이름을 IP로 해석해줍니다.',
    },
    {
      question: 'Ingress가 정상 동작하려면 추가로 필요한 것은?',
      choices: [
        '아무것도 필요하지 않다',
        'Ingress Controller(nginx-ingress 등)가 클러스터에 설치되어 있어야 한다',
        'DaemonSet만 있으면 충분하다',
        'NetworkPolicy가 반드시 필요하다',
      ],
      answerIndex: 1,
      explanation:
        'Ingress 리소스 자체는 라우팅 "규칙"일 뿐이고, 이를 실제로 처리하는 Ingress Controller가 클러스터에 배포되어 있어야 동작합니다.',
    },
    {
      question: 'Gateway API가 기존 Ingress와 비교해 갖는 특징은?',
      choices: [
        '기능이 Ingress보다 더 제한적이다',
        '역할(Role) 기반으로 리소스를 나누고 더 표현력 있는 라우팅 규칙을 지원한다',
        'HTTP만 지원하고 다른 프로토콜은 지원하지 않는다',
        'Ingress를 대체할 수 없다',
      ],
      answerIndex: 1,
      explanation:
        'Gateway API는 인프라 관리자와 애플리케이션 개발자의 역할을 분리한 리소스 구조와 더 풍부한 라우팅 표현력을 제공합니다.',
    },
    {
      question: 'NetworkPolicy가 하나도 설정되지 않은 네임스페이스의 기본 동작은?',
      choices: [
        '기본적으로 모든 트래픽이 차단된다',
        '기본적으로 같은 네임스페이스 내 모든 파드 간 통신이 허용된다',
        '클러스터에 항상 기본 정책이 미리 설정되어 있다',
        'Pod 간 통신이 항상 차단된다',
      ],
      answerIndex: 1,
      explanation:
        '쿠버네티스는 기본적으로 "허용" 모델이라, NetworkPolicy를 명시적으로 만들지 않으면 파드 간 통신이 자유롭게 허용됩니다.',
    },
    {
      question: '쿠버네티스 네트워크 문제를 진단할 때 합리적인 접근은?',
      choices: [
        'Pod → Service → Endpoint → DNS 순서로 계층적으로 좁혀가며 확인한다',
        '무조건 클러스터를 재설치한다',
        '로그를 보지 않고 재시작만 반복한다',
        '문제와 관련 없는 리소스부터 확인한다',
      ],
      answerIndex: 0,
      explanation:
        '파드 상태 → 서비스/엔드포인트 연결 → DNS 해석 순서로 계층을 좁혀가며 확인하는 것이 효율적인 트러블슈팅 방식입니다.',
    },
  ],
  linux: [
    {
      question: '리눅스에서 모든 경로가 시작되는 지점은?',
      choices: ['C:\\', '/ (루트)', 'home', '디스크마다 다른 드라이브 문자'],
      answerIndex: 1,
      explanation:
        '리눅스는 윈도우와 달리 드라이브 문자 개념이 없고, 모든 것이 / (루트)라는 하나의 트리 구조로 이어집니다.',
    },
    {
      question: '권한 표기 `rwxr-xr--`에서 그룹(group)의 권한은?',
      choices: ['rwx', 'r-x', 'r--', '없음'],
      answerIndex: 1,
      explanation: '소유자(rwx) · 그룹(r-x) · 기타(r--) 순서로 3자리씩 나뉘어 표기됩니다.',
    },
    {
      question: '실행 중인 프로세스를 강제로 종료하는 시그널은?',
      choices: ['SIGSTOP', 'SIGKILL', 'SIGCONT', 'SIGHUP'],
      answerIndex: 1,
      explanation: 'SIGKILL(kill -9)은 프로세스가 무시할 수 없는 강제 종료 시그널입니다.',
    },
    {
      question: '파이프(`|`)의 역할은?',
      choices: [
        '파일을 삭제한다',
        '한 명령어의 출력을 다른 명령어의 입력으로 연결한다',
        '백그라운드 실행을 의미한다',
        '파일 권한을 바꾼다',
      ],
      answerIndex: 1,
      explanation: '파이프는 왼쪽 명령의 표준 출력을 오른쪽 명령의 표준 입력으로 이어줍니다.',
    },
    {
      question: '데비안 계열 리눅스에서 패키지를 설치하는 명령어는?',
      choices: ['yum install', 'apt install', 'brew install', 'pacman -S'],
      answerIndex: 1,
      explanation: 'Debian/Ubuntu 계열은 apt(또는 apt-get)를 패키지 관리자로 사용합니다.',
    },
    {
      question: 'sudo와 su의 차이는?',
      choices: [
        '완전히 동일하다',
        'sudo는 특정 명령을 관리자 권한으로 일시 실행, su는 다른 사용자(주로 root)로 아예 전환한다',
        'su만 로그가 남는다',
        'sudo는 리눅스에서 지원하지 않는다',
      ],
      answerIndex: 1,
      explanation:
        'sudo는 "이 명령 하나만" 권한을 상승시켜 실행하고, su는 셸 자체를 다른 사용자로 전환합니다.',
    },
    {
      question: '어떤 장치가 어디에 마운트되어 있는지 확인하는 명령어는?',
      choices: ['chmod', 'df -h 또는 lsblk', 'rm', 'grep'],
      answerIndex: 1,
      explanation: 'df -h나 lsblk로 현재 마운트된 디스크/파티션 정보를 확인할 수 있습니다.',
    },
    {
      question: '리눅스 부팅 과정에서 커널 로드 후 전통적으로 가장 먼저 실행되는 프로세스는?',
      choices: ['bash', 'init(또는 systemd)', 'sshd', 'cron'],
      answerIndex: 1,
      explanation: 'PID 1번 프로세스인 init(또는 최신 배포판의 systemd)이 부팅 후 가장 먼저 실행됩니다.',
    },
    {
      question: '셸 스크립트에서 변수를 자식 프로세스에도 전달하려면 사용하는 명령은?',
      choices: ['set', 'export', 'unset', 'alias'],
      answerIndex: 1,
      explanation: 'export로 지정한 환경변수만 자식 프로세스에 상속됩니다.',
    },
    {
      question: 'systemd 계열에서 시스템 로그를 실시간으로 스트리밍해서 보는 명령어는?',
      choices: ['cat /var/log', 'journalctl -f', 'crontab -l', 'ps aux'],
      answerIndex: 1,
      explanation: 'journalctl -f는 systemd 저널 로그를 tail -f처럼 실시간으로 보여줍니다.',
    },
  ],
  docker: [
    {
      question: '컨테이너가 가상머신(VM)과 다른 점은?',
      choices: [
        '컨테이너는 각자 별도의 게스트 OS 커널을 포함한다',
        '컨테이너는 호스트 커널을 공유하는 격리된 프로세스다',
        'VM보다 항상 더 무겁다',
        '네트워크를 사용할 수 없다',
      ],
      answerIndex: 1,
      explanation:
        '컨테이너는 별도 커널 없이 호스트 커널을 공유하며 네임스페이스로 격리된 프로세스라 VM보다 훨씬 가볍습니다.',
    },
    {
      question: '레지스트리와 리포지토리의 관계는?',
      choices: [
        '완전히 같은 의미다',
        '레지스트리는 이미지를 저장하는 중앙 위치 전체, 리포지토리는 그 안의 관련 이미지 묶음이다',
        '리포지토리가 레지스트리를 포함하는 상위 개념이다',
        '로컬 환경에서만 존재하는 개념이다',
      ],
      answerIndex: 1,
      explanation: '레지스트리(예: Docker Hub) 안에 여러 리포지토리(프로젝트별 이미지 묶음)가 존재합니다.',
    },
    {
      question: 'Docker 이미지의 특징으로 올바른 것은?',
      choices: [
        '한 번 만든 이미지는 수정할 수 없고, 새로 만들거나 레이어를 쌓아야 한다',
        '이미지는 실행 중에 자유롭게 수정된다',
        '레이어라는 개념이 없다',
        '항상 하나의 레이어로만 구성된다',
      ],
      answerIndex: 0,
      explanation: '이미지는 불변(immutable)이며, 변경 사항은 새 레이어를 쌓아 새 이미지를 만드는 방식으로 반영됩니다.',
    },
    {
      question: 'Dockerfile에서 COPY와 ADD의 차이로 알려진 것은?',
      choices: [
        '완전히 동일하다',
        'ADD는 URL 다운로드나 압축 해제 같은 추가 기능이 있고, COPY는 단순 복사만 한다',
        'COPY만 원격 URL을 지원한다',
        'ADD는 사용이 금지되어 있다',
      ],
      answerIndex: 1,
      explanation: 'ADD는 COPY의 기능에 더해 원격 URL 다운로드나 tar 압축 해제 같은 부가 기능을 제공합니다.',
    },
    {
      question: '빌드 캐시를 잘 활용하기 위한 좋은 습관은?',
      choices: [
        '자주 바뀌는 소스코드를 Dockerfile 맨 위에서 먼저 COPY한다',
        '자주 바뀌지 않는 의존성 설치를 먼저, 자주 바뀌는 소스 복사를 나중에 배치한다',
        '캐시는 신경 쓸 필요가 없다',
        '매번 --no-cache로 빌드한다',
      ],
      answerIndex: 1,
      explanation:
        '변경 빈도가 낮은 단계를 먼저 배치해야 그 아래 레이어들의 캐시가 최대한 재사용됩니다.',
    },
    {
      question: '멀티스테이지 빌드의 주된 목적은?',
      choices: [
        '빌드 시간을 늘리기 위해',
        '빌드에 필요한 도구·의존성을 최종 이미지에서 제외해 이미지 크기를 줄이기 위해',
        '여러 프로그래밍 언어를 한 컨테이너에서 섞어 실행하기 위해',
        '빌드 캐시를 항상 무효화하기 위해',
      ],
      answerIndex: 1,
      explanation: '빌드 단계에서만 필요한 컴파일러·도구를 최종 런타임 이미지에서 제외해 이미지를 가볍게 만듭니다.',
    },
    {
      question: '`docker run -p 8080:80`에서 각 숫자의 의미는?',
      choices: ['둘 다 컨테이너 포트다', '호스트 포트:컨테이너 포트', '컨테이너 포트:호스트 포트', '의미 없는 임의의 숫자다'],
      answerIndex: 1,
      explanation: '-p 옵션은 "호스트포트:컨테이너포트" 순서로 포트를 매핑합니다.',
    },
    {
      question: '컨테이너를 삭제해도 데이터를 보존하려면?',
      choices: [
        '아무 설정 없이 그냥 둔다',
        '볼륨(Volume) 또는 바인드 마운트를 사용한다',
        '데이터를 컨테이너 안에만 저장한다',
        '이미지 안에 데이터를 미리 구워 넣는다',
      ],
      answerIndex: 1,
      explanation: '컨테이너의 파일 시스템은 컨테이너 삭제와 함께 사라지므로, 영속성이 필요한 데이터는 볼륨에 저장해야 합니다.',
    },
    {
      question: 'Docker Compose의 역할은?',
      choices: [
        '이미지를 자동으로 최적화해준다',
        '여러 컨테이너로 구성된 애플리케이션을 하나의 YAML 파일로 정의하고 관리한다',
        '커널을 가상화한다',
        '레지스트리를 완전히 대체한다',
      ],
      answerIndex: 1,
      explanation: 'Compose는 여러 서비스(컨테이너)의 구성을 YAML로 선언하고 한 번에 올리고 내릴 수 있게 해줍니다.',
    },
    {
      question: '컨테이너의 리소스(CPU/메모리)를 제한하는 이유로 적절한 것은?',
      choices: [
        '하나의 컨테이너가 호스트 자원을 독점해 다른 서비스에 영향을 주는 것을 막기 위해',
        '이미지 크기를 줄이기 위해',
        '네트워크 속도를 높이기 위해',
        '리소스 제한은 항상 불필요하다',
      ],
      answerIndex: 0,
      explanation: '리소스 제한은 한 컨테이너의 폭주가 같은 호스트의 다른 컨테이너/서비스에 영향을 주지 않도록 격리하는 안전장치입니다.',
    },
  ],
  db: [
    {
      question: 'ACID에서 A(Atomicity, 원자성)가 의미하는 것은?',
      choices: [
        '트랜잭션 내 작업은 전부 성공하거나 전부 실패한다',
        '데이터가 항상 암호화되어 저장된다',
        '여러 트랜잭션이 절대 동시에 실행될 수 없다',
        '디스크에 항상 즉시 기록된다',
      ],
      answerIndex: 0,
      explanation: '원자성은 트랜잭션의 모든 연산이 전부 반영되거나 전부 반영되지 않아야 한다는 성질입니다.',
    },
    {
      question: '정규화(Normalization)의 목적은?',
      choices: [
        '데이터 중복을 줄이고 삽입·갱신·삭제 이상현상을 방지하기 위해',
        '쿼리 속도를 항상 더 빠르게 만들기 위해',
        '테이블 개수를 무조건 줄이기 위해',
        '인덱스를 없애기 위해',
      ],
      answerIndex: 0,
      explanation: '정규화는 데이터 중복과 그로 인한 이상현상을 줄여 데이터 무결성을 지키는 것이 목적입니다.',
    },
    {
      question: '데이터 모델링 3단계의 올바른 순서는?',
      choices: ['물리 → 논리 → 개념', '개념 → 논리 → 물리', '논리 → 개념 → 물리', '순서는 상관없다'],
      answerIndex: 1,
      explanation: '개념적 설계(전체 그림) → 논리적 설계(테이블/속성) → 물리적 설계(실제 DB 구현) 순서로 진행합니다.',
    },
    {
      question: 'DDL(데이터 정의어)에 해당하는 명령어는?',
      choices: ['SELECT', 'INSERT', 'CREATE TABLE', 'UPDATE'],
      answerIndex: 2,
      explanation: 'CREATE, ALTER, DROP처럼 스키마 구조를 정의하는 명령이 DDL이고, 나머지는 DML입니다.',
    },
    {
      question: '윈도우 함수(Window Function)의 특징은?',
      choices: [
        'GROUP BY처럼 여러 행을 하나로 합쳐버린다',
        '행을 유지한 채로 그룹별 집계·순위 등을 계산할 수 있다',
        '서브쿼리와 함께 사용할 수 없다',
        '사용하면 인덱스가 자동으로 생성된다',
      ],
      answerIndex: 1,
      explanation: '윈도우 함수는 원본 행을 그대로 유지하면서 각 행에 대해 그룹 기준의 집계·순위 값을 함께 보여줄 수 있습니다.',
    },
    {
      question: '인덱스를 무분별하게 많이 만들 때의 단점은?',
      choices: [
        '조회 속도가 항상 더 빨라진다',
        'INSERT·UPDATE·DELETE 시 인덱스도 함께 갱신해야 해서 쓰기 성능이 저하될 수 있다',
        '저장 공간을 전혀 차지하지 않는다',
        '단점이 전혀 없다',
      ],
      answerIndex: 1,
      explanation: '인덱스는 조회를 빠르게 하지만, 쓰기 작업마다 함께 갱신되어야 하므로 무분별하게 늘리면 쓰기 성능이 떨어집니다.',
    },
    {
      question: 'MVCC(다중 버전 동시성 제어)의 핵심 아이디어는?',
      choices: [
        '읽기 작업에도 항상 락을 건다',
        '데이터의 여러 버전을 유지해 읽기와 쓰기가 서로 블로킹하지 않게 한다',
        '트랜잭션을 하나씩만 순차적으로 실행한다',
        '데드락을 원천적으로 없애준다',
      ],
      answerIndex: 1,
      explanation: 'MVCC는 데이터의 스냅샷(버전)을 유지해, 읽기가 쓰기를 막거나 쓰기가 읽기를 막지 않도록 동시성을 높입니다.',
    },
    {
      question: '데드락(교착상태)이 발생하는 전형적인 상황은?',
      choices: [
        '트랜잭션 A가 X를 잠그고 Y를 기다리는 동안, 트랜잭션 B는 Y를 잠그고 X를 기다리는 경우',
        '트랜잭션이 하나만 실행 중일 때',
        '인덱스가 없을 때만 발생한다',
        '읽기 전용 쿼리에서만 발생한다',
      ],
      answerIndex: 0,
      explanation: '서로 다른 트랜잭션이 상대가 가진 자원을 순환적으로 기다릴 때 데드락이 발생합니다.',
    },
    {
      question: '최근 클라우드 DB 트렌드로 언급되는 것은?',
      choices: [
        '온프레미스로의 완전한 회귀',
        '서버리스·매니지드 DB, Aurora·Spanner 같은 분산 DB의 확산',
        '관계형 DB의 완전한 소멸',
        '파일 기반 저장 방식의 부활',
      ],
      answerIndex: 1,
      explanation: '운영 부담을 줄인 매니지드/서버리스 DB와, 글로벌 확장을 지원하는 분산 DB가 최근 트렌드로 꼽힙니다.',
    },
    {
      question: '백업 전략에서 "증분 백업"의 의미는?',
      choices: [
        '매번 전체 데이터를 백업한다',
        '이전 백업 이후 변경된 데이터만 백업한다',
        '백업을 아예 수행하지 않는다',
        '백업 파일을 압축하지 않는다',
      ],
      answerIndex: 1,
      explanation: '증분 백업은 직전 백업 이후 변경분만 저장해 시간과 저장 공간을 절약합니다.',
    },
  ],
  dataai: [
    {
      question: '이산형 변수와 연속형 변수의 차이는?',
      choices: [
        '이산형은 셀 수 있는 값(예: 개수), 연속형은 측정하는 값(예: 매출액)이다',
        '완전히 같은 개념이다',
        '연속형만 숫자로 표현된다',
        '이산형은 항상 음수 값을 갖는다',
      ],
      answerIndex: 0,
      explanation: '이산형은 정수 단위로 셀 수 있는 값, 연속형은 소수점까지 측정 가능한 값을 가리킵니다.',
    },
    {
      question: '평균과 중앙값 중 이상치(outlier)의 영향을 덜 받는 지표는?',
      choices: ['평균', '중앙값', '둘 다 영향을 받지 않는다', '둘 다 똑같이 영향을 받는다'],
      answerIndex: 1,
      explanation: '중앙값은 값의 순서(위치)만 사용하기 때문에 극단적으로 큰 값 하나에 크게 흔들리지 않습니다.',
    },
    {
      question: '중심극한정리(CLT)가 말하는 것은?',
      choices: [
        '표본 크기가 커질수록 표본평균의 분포가 정규분포에 가까워진다',
        '모든 데이터는 항상 정규분포를 따른다',
        '표본 크기는 결과에 아무 영향을 주지 않는다',
        '평균은 항상 중앙값과 같아진다',
      ],
      answerIndex: 0,
      explanation: '모집단의 분포 모양과 무관하게, 표본 크기가 충분히 크면 표본평균의 분포는 정규분포에 가까워집니다.',
    },
    {
      question: 'p-value에 대한 올바른 해석은?',
      choices: [
        '귀무가설이 참일 확률이다',
        '귀무가설이 참이라고 가정했을 때 관측된(혹은 더 극단적인) 데이터가 나올 확률이다',
        '대립가설이 참일 확률이다',
        '항상 0.05보다 작아야만 의미가 있다',
      ],
      answerIndex: 1,
      explanation: 'p-value는 귀무가설이 맞다는 전제 하에, 지금 관측한 정도로 극단적인 결과가 나올 확률을 뜻합니다.',
    },
    {
      question: '상관관계가 높다고 해서 보장되지 않는 것은?',
      choices: [
        '두 변수가 함께 움직인다는 것',
        '한 변수가 다른 변수의 원인이라는 것(인과관계)',
        '상관계수를 계산할 수 있다는 것',
        '산점도를 그릴 수 있다는 것',
      ],
      answerIndex: 1,
      explanation: '"상관관계는 인과관계를 의미하지 않는다"는 통계학의 대표적인 원칙입니다.',
    },
    {
      question: '"평균으로의 회귀(Regression to the mean)"가 뜻하는 것은?',
      choices: [
        '극단적으로 높거나 낮은 값을 얻은 대상이 다음 측정에서는 평균에 더 가까워지는 경향',
        '모든 값은 결국 평균이 된다는 절대 법칙',
        '회귀분석은 항상 평균만 예측한다는 의미',
        '표본 크기가 늘어나면 평균이 계속 커진다는 의미',
      ],
      answerIndex: 0,
      explanation: '한 번 극단적인 값을 기록한 대상은 순전히 우연의 영향 때문에 다음 측정에서 평균 쪽으로 되돌아가는 경향을 보입니다.',
    },
    {
      question: '생성형 AI의 "환각(hallucination)" 현상이란?',
      choices: [
        'AI가 항상 정답만 말하는 현상',
        'AI가 그럴듯하지만 사실이 아닌 내용을 자신 있게 생성하는 현상',
        'AI가 작동을 완전히 멈추는 현상',
        '사용자가 AI의 답변을 오해하는 현상',
      ],
      answerIndex: 1,
      explanation: '환각은 모델이 존재하지 않는 사실이나 근거를 그럴듯하게 지어내 답하는 현상을 말합니다.',
    },
    {
      question: '좋은 프롬프트 엔지니어링의 요소로 보기 어려운 것은?',
      choices: ['명확한 목표(Task) 제시', '출력 형식(Format) 지정', '모델의 파라미터 수를 직접 수정', '페르소나·톤(Style) 지정'],
      answerIndex: 2,
      explanation: '모델 파라미터 수정은 모델 자체를 재학습/파인튜닝하는 영역이지 프롬프트 엔지니어링의 요소가 아닙니다.',
    },
    {
      question: '컨텍스트 엔지니어링이 주로 다루는 질문은?',
      choices: ['"무슨 말을 할까"', '"무엇을(어떤 정보를) 모델에 제공할까"', '모델의 학습 알고리즘 설계', 'GPU 하드웨어 배치'],
      answerIndex: 1,
      explanation: '컨텍스트 엔지니어링은 모델에게 어떤 정보(문서, 도구 결과 등)를 어떻게 넣어줄지 설계하는 작업입니다.',
    },
    {
      question: 'Transformer의 핵심 메커니즘으로, 단어들 간의 관계를 계산하는 것은?',
      choices: ['CNN 필터', 'Self-Attention', '순환 신경망(RNN)의 은닉 상태', '결정 트리'],
      answerIndex: 1,
      explanation: 'Self-Attention은 문장 내 모든 단어 쌍의 연관도를 계산해 문맥을 반영하는 Transformer의 핵심 구조입니다.',
    },
  ],
  agilemsa: [
    {
      question: '워터폴과 애자일의 근본적 차이는?',
      choices: [
        '워터폴은 반복적, 애자일은 순차적이다',
        '워터폴은 순차적으로 한 번에 진행, 애자일은 짧은 주기로 반복하며 자주 검증한다',
        '두 방법론은 완전히 동일하다',
        '애자일은 문서를 전혀 작성하지 않는다',
      ],
      answerIndex: 1,
      explanation: '워터폴은 앞 단계로 되돌아가지 않는 순차적 진행을, 애자일은 짧은 반복(스프린트)으로 자주 검증하며 방향을 조정합니다.',
    },
    {
      question: '스크럼에서 스크럼 마스터의 역할은?',
      choices: [
        '팀을 관리·통제하는 관리자',
        '팀이 장애물을 제거하도록 돕는 촉진자(서번트 리더)',
        '요구사항을 최종 결정하는 사람',
        '코드 리뷰만 전담하는 사람',
      ],
      answerIndex: 1,
      explanation: '스크럼 마스터는 팀을 관리하는 자리가 아니라, 장애물을 치우고 프로세스가 잘 돌아가도록 돕는 서번트 리더입니다.',
    },
    {
      question: '좋은 유저스토리의 조건(INVEST)에 포함되지 않는 것은?',
      choices: ['Independent(독립적)', 'Negotiable(협상 가능)', 'Testable(테스트 가능)', 'Timeless(시간 제약 없음)'],
      answerIndex: 3,
      explanation: 'INVEST는 Independent, Negotiable, Valuable, Estimable, Small, Testable의 약자로, Timeless는 포함되지 않습니다.',
    },
    {
      question: '백로그 그루밍(정제)의 목적은?',
      choices: [
        '백로그 항목을 삭제하기 위해',
        '스프린트 시작 전 항목을 다듬고 우선순위를 재조정하기 위해',
        '문서 분량을 늘리기 위해',
        '회고를 대체하기 위해',
      ],
      answerIndex: 1,
      explanation: '그루밍은 백로그 항목을 더 명확하게 다듬고 우선순위를 최신 상황에 맞게 재조정하는 활동입니다.',
    },
    {
      question: '번다운 차트(Burndown Chart)가 보여주는 것은?',
      choices: ['팀원 수의 변화', '스프린트 동안 남은 작업량의 변화', '코드 커밋 횟수', '서버 응답 시간'],
      answerIndex: 1,
      explanation: '번다운 차트는 시간 경과에 따라 스프린트에 남은 작업량이 어떻게 줄어드는지를 보여줍니다.',
    },
    {
      question: '"무늬만 애자일"의 대표적 증상은?',
      choices: [
        'Sprint라는 이름만 쓰고 실제로는 워터폴처럼 일하는 것',
        '매일 스탠드업 미팅을 하는 것',
        '회고(Retrospective)를 진행하는 것',
        'Sprint Board를 사용하는 것',
      ],
      answerIndex: 0,
      explanation: '이벤트·산출물의 이름만 애자일식으로 바꾸고 실제 일하는 방식은 그대로인 경우가 대표적인 안티패턴입니다.',
    },
    {
      question: '마이크로서비스가 모놀리식과 다른 점은?',
      choices: [
        '하나의 코드베이스, 하나의 배포 단위로 묶인다',
        '독립적으로 개발·배포·확장 가능한 작은 서비스 단위로 나뉜다',
        '반드시 하나의 데이터베이스만 공유해야 한다',
        '항상 모놀리식보다 더 단순하다',
      ],
      answerIndex: 1,
      explanation: '마이크로서비스는 각 서비스가 독립적으로 개발·배포·확장될 수 있는 작은 단위로 나뉜다는 점이 모놀리식과 다릅니다.',
    },
    {
      question: 'MSA를 지탱하는 요소로 보기 어려운 것은?',
      choices: ['API 게이트웨이', '서비스 디스커버리', '모든 서비스가 공유하는 단일 거대 데이터베이스', '설정 서버(Config Server)'],
      answerIndex: 2,
      explanation: 'MSA는 보통 서비스별로 데이터베이스를 분리하는 것을 권장하며, 단일 공유 DB는 오히려 결합도를 높이는 안티패턴입니다.',
    },
    {
      question: '동기 통신과 비동기 통신의 차이는?',
      choices: [
        '동기는 응답을 기다리지 않는다',
        '동기는 응답이 올 때까지 기다리고, 비동기는 기다리지 않고 다른 작업을 진행한다',
        '두 방식은 완전히 동일하게 동작한다',
        '비동기는 항상 동기보다 느리다',
      ],
      answerIndex: 1,
      explanation: '동기 통신은 요청 후 응답을 받을 때까지 대기하고, 비동기 통신은 응답을 기다리지 않고 이후 처리를 이어갑니다.',
    },
    {
      question: '모놀리식에서 MSA로 단계적으로 전환할 때 참고할 수 있는 설계 원칙은?',
      choices: ['SOLID 원칙', '항상 처음부터 다시 만들기', '문서화를 생략하기', '테스트를 생략하기'],
      answerIndex: 0,
      explanation: 'SOLID 같은 객체지향 설계 원칙을 지켜 결합도를 낮춰두면 이후 서비스 단위로 분리하기 수월해집니다.',
    },
  ],
  frontend: [
    {
      question: 'React에서 상태(State)의 특징으로 올바른 것은?',
      choices: [
        '값이 바뀌면 자동으로 리렌더링을 트리거한다',
        '일반 변수와 동일하게 동작한다',
        '항상 전역으로 공유된다',
        '컴포넌트 외부에서만 정의할 수 있다',
      ],
      answerIndex: 0,
      explanation: '상태는 값이 바뀌면 프레임워크가 이를 감지해 화면을 다시 그리도록 트리거한다는 점에서 일반 변수와 다릅니다.',
    },
    {
      question: 'SPA(Single Page Application)의 특징은?',
      choices: [
        '페이지 전환마다 서버에서 전체 HTML을 새로 받는다',
        '최초 한 번 로드 후, 이후 전환은 자바스크립트가 필요한 부분만 갱신한다',
        'SEO에 기본적으로 유리하다',
        '항상 SSR과 함께만 사용된다',
      ],
      answerIndex: 1,
      explanation: 'SPA는 최초 HTML을 한 번 로드한 뒤, 라우팅에 따라 필요한 부분만 자바스크립트로 갈아끼웁니다.',
    },
    {
      question: 'Virtual DOM의 진짜 가치는?',
      choices: [
        '실제 DOM 조작보다 항상 빠르다',
        '선언적 UI 작성과 배치 처리를 통해 합리적인 성능과 낮은 개발 복잡도를 제공한다',
        '서버 렌더링을 완전히 대체한다',
        '브라우저 호환성 문제를 전부 해결한다',
      ],
      answerIndex: 1,
      explanation: 'Virtual DOM은 항상 더 빠른 것이 아니라, 선언적으로 UI를 작성하면서도 합리적인 성능을 유지하게 해주는 장치입니다.',
    },
    {
      question: "React의 onChange 기반 단방향 바인딩과 Vue의 v-model 양방향 바인딩의 차이는?",
      choices: [
        'React는 상태 변경 코드가 명시적으로 드러나고, Vue는 프레임워크가 연결 코드를 대신 작성해준다',
        '완전히 동일한 방식으로 동작한다',
        'Vue만 상태를 가질 수 있다',
        'React는 폼을 지원하지 않는다',
      ],
      answerIndex: 0,
      explanation: 'v-model은 내부적으로 value 바인딩과 이벤트 핸들러를 합쳐놓은 문법 설탕으로, React는 이 연결을 개발자가 직접 명시합니다.',
    },
  ],
}

export default quizzes
