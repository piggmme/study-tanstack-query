# Query Keys

https://tanstack.com/query/latest/docs/react/guides/query-keys

TanStack Query는 쿼리 키를 기반으로 쿼리 캐싱을 관리한다. 쿼리 키는 **단일 문자열이 있는 배열**이거나, **많은 문자열과 중첩된 객체처럼 복잡한 배열**이다. 쿼리 키가 직렬화 가능하고 특정 쿼리 데이터에 고유하다면 사용할 수 있다.

## Simple Query Keys

가장 간단한 키 형태는 상수 값을 가진 배열이다. 이런 형태는 다음에 유용하다.

- 일반 목록/인덱스 리소스
- 비계층 리소스

```ts
// A list of todos
useQuery({ queryKey: ['todos'], ... })

// Something else, whatever!
useQuery({ queryKey: ['something', 'special'], ... })
```

## Array Keys with variables

쿼리에서 고유한 데이터를 설명하기 위해 추가 정보가 필요한 경우 문자열과 직렬화 가능한 객체가 포함된 배열을 사용해 데이터를 설명할 수 있다. 이 기능은 다음에 유용하다.

- 계층 또는 중첩된 리소스
  - 항목을 고유하게 식별하기 위해 ID, 인덱스 또는 기타 기본값을 작성하는 것이 일반적이다.
- 추가 매개 변수가 있는 쿼리
  - 추가 옵션의 개체를 전달하는 것은 일반적입니다.

```ts
// An individual todo
useQuery({ queryKey: ['todo', 5], ... })

// An individual todo in a "preview" format
useQuery({ queryKey: ['todo', 5, { preview: true }], ...})

// A list of todos that are "done"
useQuery({ queryKey: ['todos', { type: 'done' }], ... })
```

## Query Keys are hashed deterministically!

쿼리 키는 deterministic hashing이라서 **객체에서 순서가 어떻게 되든 아래의 쿼리는 동일한 것으로 판단**된다.

```ts
useQuery({ queryKey: ['todos', { status, page }], ... })
useQuery({ queryKey: ['todos', { page, status }], ...})
useQuery({ queryKey: ['todos', { page, status, other: undefined }], ... })
```

하지만 다음 처럼 **배열의 경우엔 순서가 중요하기** 때문에 동일한 쿼리로 보지 않는다.

```ts
useQuery({ queryKey: ['todos', status, page], ... })
useQuery({ queryKey: ['todos', page, status], ...})
useQuery({ queryKey: ['todos', undefined, page, status], ...})
```

## 함수가 변수에 의존적이라면, 쿼리 키에 변수를 추가해라

쿼리 키는 가져오는 데이터에 대한 정보를 고유한 값으로 표현하기 때문에, **변경되는 쿼리 함수에는 변수를 포함**해야 한다.

```tsx
function Todos({ todoId }) {
  const result = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchTodoById(todoId),
  });
}
```
