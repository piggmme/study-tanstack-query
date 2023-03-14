# Dependent Queries

https://tanstack.com/query/latest/docs/react/guides/dependent-queries

종속(또는 직렬) 쿼리는 실행하기 전에 완료해야 하는 이전 쿼리에 의존한다. `enabled` 옵션을 사용하여 실행 준비가 되었을 때를 알려주면 된다.

```tsx
// Get the user
const { data: user } = useQuery({
  queryKey: ["user", email],
  queryFn: getUserByEmail,
});

const userId = user?.id;

// Then get the user's projects
const {
  status,
  fetchStatus,
  data: projects,
} = useQuery({
  queryKey: ["projects", userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
});
```

`projects` 쿼리의 초기 상태는 다음과 같다.

```tsx
status: "loading";
fetchStatus: "idle";
```

`user`가 사용 가능해지면, `projects` 쿼리는 `enabled` 해져서 다음 상태로 변경된다.

```tsx
status: "loading";
fetchStatus: "fetching";
```

`projects`를 성공적으로 받아오고 최종 상태는 다음과 같다.

```tsx
status: "success";
fetchStatus: "idle";
```
