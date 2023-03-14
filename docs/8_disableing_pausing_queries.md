# Disabling/Pausing Queries

https://tanstack.com/query/latest/docs/react/guides/disabling-queries

쿼리가 자동으로 실행되지 않도록 하려면 `enabled = false` 옵션을 사용할 수 있습니다.

`enabled = false` 이면 다음과 같다.

- 쿼리가 데이터를 캐시한 경우 쿼리는 `status === 'success'` 또는 `isSuccess` 상태로 초기화됩니다.
- 쿼리에 캐시된 데이터가 없는 경우 쿼리는 `status === 'loading'` 및 `fetchStatus === 'loading'` 상태로 초기화됩니다.
- 쿼리가 마운트 시 자동으로 가져오지 않습니다.
- 쿼리는 백그라운드에서 자동으로 refetch되지 않습니다.
- 쿼리는 일반적으로 쿼리 refetch를 수행하는 쿼리 클라이언트의 `invalidateQueries` 및 `refetchQueries` 호출을 무시합니다.
- `useQuery`에서 반환된 `refetch`를 사용하여 쿼리를 수동으로 트리거하여 가져올 수 있습니다.

```tsx
function Todos() {
  const { isInitialLoading, isError, data, error, refetch, isFetching } =
    useQuery({
      queryKey: ["todos"],
      queryFn: fetchTodoList,
      enabled: false,
    });

  return (
    <div>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {data ? (
        <>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : isInitialLoading ? (
        <span>Loading...</span>
      ) : (
        <span>Not ready ...</span>
      )}

      <div>{isFetching ? "Fetching..." : null}</div>
    </div>
  );
}
```

## Lazy Queries

`enabled` 옵션은 쿼리를 영구적으로 비활성화할 뿐만 아니라 나중에 활성화/비활성화할 때도 사용할 수 있습니다. 좋은 예는 사용자가 필터 값을 입력한 후에만 첫 번째 요청을 실행하려는 필터 양식입니다:

```tsx
function Todos() {
  const [filter, setFilter] = React.useState('')

  const { data } = useQuery({
      queryKey: ['todos', filter],
      queryFn: () => fetchTodos(filter),
      // ⬇️ disabled as long as the filter is empty
      enabled: !!filter
  })

  return (
      <div>
       {/* 🚀 applying the filter will enable and execute the query */}
        <FiltersForm onApply={setFilter} />
        {data && <TodosTable data={data}} />
      </div>
  )
}
```

## isInitialLoading

Lazy Queries는 시작부터 'loading' 상태가 됩니다. 로딩은 아직 데이터가 없다는 것을 의미하기 때문입니다. 그러나 기술적으로는 현재 데이터를 가져오지 않기 때문에(쿼리가 활성화되지 않았기 때문에) 이 플래그를 사용하여 로딩 스피너를 표시할 수 없음을 의미하기도 합니다.

이런 경우 `isInitialLoading`를 대신 사용해서 로딩 스피너를 표시할 수 있다. 따라서 쿼리가 현재 처음으로 fetch하는 경우에만 `true` 입니다.

```
isInitialLoading === isLoading && isFetching
```
