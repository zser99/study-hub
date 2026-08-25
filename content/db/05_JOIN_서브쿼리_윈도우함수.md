# SQL이 진짜 재밌어지는 순간 — JOIN·서브쿼리·윈도우 함수

혼자 있는 테이블에 `SELECT * FROM users`만 날리던 시절을 지나, 여러 테이블을 엮어 "고객별 최근 3개월 주문 통계" 같은 걸 뽑아내야 하는 순간이 온다. 이때부터 SQL은 단순 조회 도구가 아니라 분석 도구가 된다. 오늘은 그 핵심인 JOIN, 서브쿼리, 윈도우 함수를 실무 감각 위주로 정리한다.

## JOIN — 여러 테이블을 엮는 네 가지 방법

두 테이블을 조건에 맞춰 연결하는 JOIN은 크게 네 가지다. 양쪽에 모두 있는 데이터만 가져오는 `INNER JOIN`, 왼쪽 테이블은 다 보존하고 오른쪽에 없으면 NULL로 채우는 `LEFT JOIN`(반대는 `RIGHT JOIN`), 양쪽을 모두 보존하는 `FULL OUTER JOIN`이다. MySQL은 `FULL OUTER JOIN`을 직접 지원하지 않아 `UNION`으로 우회해야 한다는 것도 기억해두자.

실무에서 진짜 자주 하는 실수 두 가지가 있다.

**첫째, JOIN 조건을 빠뜨리면 카르테시안 곱이 터진다.** `ON` 절 없이 `FROM a, b`처럼 쓰면 두 테이블의 모든 조합이 곱해져 결과가 폭발한다.

**둘째, `LEFT JOIN` 뒤에 `WHERE`로 오른쪽 테이블 컬럼을 걸면 사실상 `INNER JOIN`이 된다.**

```sql
-- 잘못된 예: LEFT JOIN 효과가 사라짐
SELECT s.name, e.score
FROM students s LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.course_id = 1;  -- 수강 없는 학생이 통째로 제외됨!

-- 올바른 예: 조건을 ON 절로
SELECT s.name, e.score
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id AND e.course_id = 1;
```

"한 번도 주문하지 않은 고객" 같은 걸 찾을 땐 `NOT IN`보다 `NOT EXISTS`를 쓰자. `NOT IN`은 비교 대상 목록에 NULL이 하나라도 섞이면 전체 결과가 빈 값으로 나와버리는 함정이 있다.

```sql
-- 위험: enrollments.student_id에 NULL이 하나라도 있으면 결과가 항상 빈 값
WHERE s.id NOT IN (SELECT student_id FROM enrollments)

-- 안전: NULL과 무관하게 정확히 동작
WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id)
```

참고로 데이터베이스는 이 JOIN을 실제로 처리할 때 내부적으로 Nested Loop, Hash Join, Sort-Merge Join 중 하나를 고른다. 어떤 걸 고를지는 데이터 양과 인덱스 유무에 달려 있고, 다음 편에서 다룰 실행계획으로 직접 확인할 수 있다.

## 서브쿼리와 CTE, 언제 뭘 쓸까

하나의 SQL 안에 또 다른 SQL을 넣는 서브쿼리는 위치에 따라 성격이 다르다. 바깥 쿼리의 값을 참조하며 행마다 반복 실행되는 상관 서브쿼리는 직관적이지만, 행 수만큼 반복돼서 느려지기 쉽다.

```sql
-- 느림: 부서마다 반복 실행되는 상관 서브쿼리
SELECT e.emp_name, e.salary FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);

-- 빠름: CTE로 한 번만 집계 후 조인
WITH dept_avg AS (
  SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id
)
SELECT e.emp_name, e.salary FROM employees e
JOIN dept_avg d ON d.dept_id = e.dept_id WHERE e.salary > d.avg_sal;
```

`WITH` 구문으로 시작하는 CTE(Common Table Expression)는 복잡한 쿼리를 여러 단계로 나눠 이름을 붙이는 방법이다. 가독성이 좋아지고 같은 계산을 재사용할 수 있다. 조직도나 카테고리 트리처럼 계층 구조를 탐색할 땐 자기 자신을 참조하는 재귀 CTE(`WITH RECURSIVE`)가 유용하다.

## 윈도우 함수 — 행을 유지하면서 집계하기

`GROUP BY`는 집계와 동시에 행이 줄어드는 반면, 윈도우 함수는 각 행을 그대로 유지하면서 순위나 누적값을 함께 보여준다. 이게 가장 큰 차이다.

```sql
SELECT region, month, revenue,
  ROW_NUMBER() OVER (PARTITION BY region ORDER BY revenue DESC) AS rn,
  LAG(revenue) OVER (PARTITION BY region ORDER BY month) AS prev_month,
  SUM(revenue) OVER (PARTITION BY region ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative
FROM sales;
```

동점자를 처리할 때 `ROW_NUMBER()`(무조건 고유 번호), `RANK()`(동점자는 같은 순위, 다음은 건너뜀), `DENSE_RANK()`(동점자는 같은 순위, 다음도 연속)를 구분해서 쓰면 된다. 전월 대비 증감률처럼 이전·다음 행 값이 필요할 땐 `LAG()`/`LEAD()`가, 누적 합계나 이동 평균에는 `ROWS BETWEEN ...` 프레임이 정답이다. "부서별 상위 3명"처럼 그룹별 상위 N개를 뽑는 작업은 상관 서브쿼리보다 `ROW_NUMBER()`로 매기고 필터링하는 방식이 훨씬 빠르고 읽기 쉽다.

**오늘의 한 줄 요약**: JOIN은 `ON`과 `WHERE`를 헷갈리지 않는 게 핵심, NULL이 섞인 목록엔 `NOT EXISTS`, 반복 집계가 필요하면 CTE나 윈도우 함수를 우선 고려하자. 다음 편에서는 이렇게 짠 쿼리가 실제로 왜 느린지, 인덱스와 실행계획으로 눈으로 확인하는 법을 다룬다.
