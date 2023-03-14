# Background Fetching Indicators

https://tanstack.com/query/latest/docs/react/guides/background-fetching-indicators

`status === 'loading'` 상태는 초기 하드로딩 상태를 표시하기에 충분하지만, 쿼리가 백그라운드에서 refetch 중임을 나타내는 추가 정보를 표시할 수도 있다. 이를 위해 쿼리는 상태 변수의 상태에 관계없이 가져오기 상태임을 표시하는 데 사용할 수 있는 `isFetching`를 제공한다.

```tsx
function Todos() {
  const {
    status,
    data: todos,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return status === "loading" ? (
    <span>Loading...</span>
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  );
}
```

## Displaying Global Background Fetching Loading State

개별 쿼리 로드 상태 외에도, 쿼리를 가져오는 모든 경우(백그라운드 포함) 전역 로딩 스피너를 표시하려면 `useIsFetching`를 사용할 수 있다.

```tsx
import { useIsFetching } from "@tanstack/react-query";

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div>Queries are fetching in the background...</div>
  ) : null;
}
```
