## Parallel Queries

https://tanstack.com/query/latest/docs/react/guides/parallel-queries

병렬 쿼리(Parallel queries)는 병렬로 실행되거나 동시에 병렬로 실행되는 쿼리이다.

## Manual Parallel Queries

병렬 쿼리의 수가 변경되지 않는다면 병렬 쿼리를 사용할 필요가 없다. 그냥 `useQuery`와 `useInfiniteQuery`를 사용하자.

```tsx
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

## Dynamic Parallel Queries with `useQueries`

실행해야 하는 쿼리의 수가 변경되는 경우에는 `useQueries`를 사용해라.

```tsx
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => {
      return {
        queryKey: ["user", user.id],
        queryFn: () => fetchUserById(user.id),
      };
    }),
  });
}
```
