# Query Functions

https://tanstack.com/query/latest/docs/react/guides/query-functions

쿼리 함수는 프로미스를 반환하는 어떤 함수든 될 수 있다. 프로미스는 데이터를 resolve 하거나 에러를 발생시켜야 한다.

다음은 모두 유효한 쿼리 함수 구성이다.

```tsx
useQuery({ queryKey: ["todos"], queryFn: fetchAllTodos });
useQuery({ queryKey: ["todos", todoId], queryFn: () => fetchTodoById(todoId) });
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const data = await fetchTodoById(todoId);
    return data;
  },
});
useQuery({
  queryKey: ["todos", todoId],
  queryFn: ({ queryKey }) => fetchTodoById(queryKey[1]),
});
```

## Handling and Throwing Errors

쿼리에서 오류가 발생했는지 알기 위해서는 쿼리 함수가 `rejected Promise`를 반환해야 한다.
쿼리 함수에서 반환된 에러는 쿼리의 `error` 상태에 지속된다.

```tsx
const { error } = useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    if (somethingGoesWrong) {
      throw new Error("Oh no!");
    }
    if (somethingElseGoesWrong) {
      return Promise.reject(new Error("Oh no!"));
    }

    return data;
  },
});
```

## Usage with `fetch` and other clients that do not throw by default

`axios`나 `graphql-request` 와 같은 유틸리티들은 성공적이지 못한 HTTP 호출에서 자동으로 에러를 발생시키지만, `fetch` 와 같은 유틸리티는 에러를 발생하지 않는다. 이런 경우엔 직접 에러를 던지도록 작업해야 한다.

```tsx
useQuery({
  queryKey: ["todos", todoId],
  queryFn: async () => {
    const response = await fetch("/todos/" + todoId);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  },
});
```

## Query Function Variables

쿼리 키는 QueryFunctionContext의 일부로서 쿼리 함수에 전달되어 편리하게 사용할 수 있다. 항상 필요한건 아니지만 필요한 경우에 쿼리 함수를 추출할 수도 있다.

```tsx
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ["todos", { status, page }],
    queryFn: fetchTodoList,
  });
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey;
  return new Promise();
}
```

### QueryFunctionContext

QueryFunctionContext는 붜리 함수에게 전달되는 객체이다.

```tsx
const { queryKey, pageParam, signal, meta } = QueryFunctionContext;
```

- queryKey
  - [query keys](/docs/2_query_keys.md)
- pageParam
  - `Infinite Queries` 에서만 사용됨
  - 현재 페이지를 불러오는데 사용하는 페이지 파라미터
- signal
  - Query Cancellation에서 사용됨
- meta
  - 쿼리에 대한 추가적인 정보
