# WHERE 절 빼먹고 식은땀 흘려본 사람 모여라 — SQL 기초 DDL·DML

`DELETE FROM users;`를 실행하고 나서야 `WHERE`를 빼먹은 걸 깨달은 경험, 신입 시절 한 번쯤은 있을 것이다. 지난 편까지 테이블을 어떻게 설계할지 다뤘다면, 이번엔 그 설계를 실제 SQL로 만들고 데이터를 다루는 기본기를 짚는다. 그릇을 만드는 DDL과 내용물을 다루는 DML, 이 둘의 차이부터 시작하자.

## DDL: 그릇을 만든다

DDL(Data Definition Language)은 데이터베이스와 테이블이라는 "그릇"을 정의하는 언어다. `CREATE TABLE`로 테이블을 만들 때 데이터 타입뿐 아니라 무결성을 지키는 제약조건을 함께 지정하는 게 핵심이다.

```sql
CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  attrs JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

여기 쓰인 네 가지가 실무에서 가장 자주 쓰는 제약조건이다. 값이 비면 안 된다는 `NOT NULL`, 값이 없을 때 기본값을 채우는 `DEFAULT`, 조건을 만족해야 한다는 `CHECK`(가격은 0 이상), 그리고 다른 테이블을 참조하는 `FOREIGN KEY`다.

데이터 타입을 고를 때 신입이 가장 많이 하는 실수는 금액을 `FLOAT`으로 잡는 것이다. 부동소수점은 근사값을 저장하기 때문에 `0.1 + 0.2`가 `0.3`이 안 나오는 그 유명한 오차가 금액 계산에도 그대로 생긴다. 금액은 반드시 `NUMERIC`/`DECIMAL`로 정확한 자릿수를 보장해야 한다. 문자열도 벤더마다 `VARCHAR`/`TEXT` 제한이 달라서, 프로젝트 초기에 정책을 통일해두는 게 나중에 골치 아플 일을 줄인다.

테이블을 만든 뒤에는 `ALTER TABLE`로 컬럼을 고칠 수 있지만, 이미 데이터가 많이 쌓인 운영 테이블의 컬럼 타입을 바꾸면 테이블 전체를 다시 써야 하는 부담이 생길 수 있다. 운영 중인 서비스라면 컬럼 추가 정도는 비교적 안전하지만, 타입 변경이나 `NOT NULL` 추가는 반드시 영향도를 확인하고 진행하자.

## DML: 데이터를 채우고 꺼낸다

DML(Data Manipulation Language)은 실제 데이터를 다루는 언어로 `INSERT`·`UPDATE`·`DELETE`·`SELECT` 네 가지가 핵심이다. 처음 얘기한 사고 사례처럼 `UPDATE`와 `DELETE`는 `WHERE`를 빼먹으면 테이블 전체가 바뀌거나 사라진다. 실행 전에 같은 조건으로 `SELECT`를 먼저 돌려보는 습관을 들이면 이런 사고를 크게 줄일 수 있다.

```sql
-- 실행 전 먼저 확인
SELECT * FROM students WHERE enrolled = FALSE;
-- 확인 후 실행
DELETE FROM enrollments
WHERE student_id IN (SELECT id FROM students WHERE enrolled = FALSE);
```

`SELECT` 문을 작성할 때 알아두면 유용한 점은, 우리가 쓰는 순서(`SELECT → FROM → WHERE`)와 실제로 DB가 처리하는 순서가 다르다는 것이다.

```
FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

그래서 `WHERE` 절에서는 `SELECT` 절에서 붙인 별칭(alias)을 쓸 수 없다. `SELECT`가 `WHERE`보다 늦게 처리되기 때문이다.

## NULL, 제대로 다루기

NULL을 다룰 때 가장 흔한 실수가 `= NULL`로 비교하는 것이다. NULL은 "값이 없다"는 의미라 "같다/다르다"를 판단할 수 없고, `=`로 비교하면 결과가 항상 거짓(정확히는 UNKNOWN)으로 취급돼 조건절에서 아예 걸러지지 않는다. 반드시 `IS NULL` / `IS NOT NULL`을 써야 한다. 빈 값을 다른 값으로 대체하고 싶다면 표준 함수인 `COALESCE()`가 정답이다. Oracle의 `NVL()`, SQL Server의 `ISNULL()`도 같은 역할을 하지만 벤더 전용 함수라서, 여러 DB를 오가는 코드라면 `COALESCE()`로 통일해두는 게 낫다.

```sql
SELECT name, COALESCE(phone, '미등록') AS phone_display
FROM students
WHERE major_id IS NOT NULL;
```

**오늘의 한 줄 요약**: DDL은 그릇(구조)을, DML은 내용물(데이터)을 다룬다. `WHERE` 확인은 습관으로 만들고, NULL은 `IS NULL`로만 비교하자. 다음 편에서는 이 기본기를 바탕으로 여러 테이블을 엮고 통계를 뽑아내는 JOIN·서브쿼리·윈도우 함수를 다룬다. SQL이 진짜 재밌어지는 구간이다.
