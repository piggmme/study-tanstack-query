# 쿼리 기본 개념

https://tanstack.com/query/latest/docs/react/guides/queries

쿼리는 **고유 키**에 연결된 비동기 데이터 원본에 대한 **선언적 종속성**이다.
쿼리는 서버에서 데이터를 가져오는 모든 Promise 기반 메서드(GET, POST ...)와 함께 사용할 수 있다.
메서드가 서버의 데이터를 수정하는 경우엔 [`Mutations`](https://tanstack.com/query/latest/docs/react/guides/mutations) 를 사용하자.

컴포넌트나 커스텀 훅에서 쿼리를 구독하기 위해선 `useQuery`훅을 사용하자.

`useQuery`훅을 위해선 다음을 주의해야 한다.

- 쿼리에 고유한 키
- 프로미스(데이터를 resovle 하거나 에러를 던지는)를 반환하는 함수

```ts
import { useQuery } from "@tanstack/react-query";

function App() {
  const info = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
}
```

### Unique Key

고유한 키는 **refetching, caching, query를 프로그램 내에서 공유할 때** 사용된다.

`useQuery` 가 반환한 쿼리 결과에는 템플릿 작성에 필요한 쿼리와 기타 데이터 사용에 대한 모든 정보가 포함된다.

```ts
const result = useQuery({ queryKey: ["todos"], queryFn: fetchTodoList });
const { status, isLoading, isError, isSuccess, error, data } = result;
```

`result` 객체는 생산성을 위해 알아야하는 중요한 상태들을 포함하고 있다.

- `isLoading` 또는 `status === 'loading'`
  - 쿼리가 데이터를 아직 가지지 못함
- `isError` 또는 `status === 'error'`
  - 쿼리가 에러를 가짐
- `isSuccess` 또는 `status === 'success'`
  - 쿼리가 성공적으로 사용 가능한 데이터를 가짐
- `error`
  - `isError` 상태일 때 에러 값
- `data`
  - `isSuccess` 상태일 때 사용 가능한 `data` 값

```tsx
function Todos() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodoList,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### FetchStatus

추가적으로 `fetchStatus` 는 다음 옵션을 나타낸다.

- `fetchStatus === 'fetching'`
  - fetching 중임
- `fetchStatus === 'paused'`
  - 쿼리는 fetch 동작을 수행하려 했지만 중지된 상태
- `fetchStatus === 'idle'`
  - 쿼리가 아무것도 하지 않는 순간
