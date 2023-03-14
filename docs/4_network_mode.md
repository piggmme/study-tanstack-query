# Network Mode

https://tanstack.com/query/latest/docs/react/guides/network-mode#network-mode-always

TanStack Query는 네트워크에 연결되어 있지 않은 경우 Query와 Mutation이 어떻게 동작하는지를 구별하기 위해 **세 가지 다른 네트워크 모드**를 제공한다.
이 모드는 각 Query, Mutation에 대해 개별적으로 설정하거나 Query, Mutation 기본값을 통해 전체적으로 설정할 수 있다.

기본 네트워크 모드는 "온라인"이다.

## Network Mode: online

온라인 모드는 기본 모드이며 해당 모드에선 네트워크에 연결되어 있지 않으면 Query, Mutation가 실행되지 않는다.

만약 데이터 fetch 가 시작되면 `state`(`loading`, `error`, `success`)상태가 유지된다. 이는 네트워크 연결이 없어서 데이터 fetch가 가져올 수 없는 경우에도 포함된다.
하지만 fetchStatus는 추가로 제공된다.

- `fetching` : `queryFn` 이 실제로 실행됨 - 요청이 진행중
- `paused` : 쿼리가 실행되고 있지 않음 - 다시 연결될 때 까지 중지 상태
- `idle` : 쿼리를 가져오지 않고 중지되어있지도 않음

`isFetching`, `isPaused` 플래그는 편의를 위해 이로부터 파생된 상태이다.

> 로딩 스피너를 노출하기에 `loading` 상태만 확인하는 것 만으론 충분하지 않을 수 있다. `state: 'loading'` 이지만 `fetchStatus: 'paused'` 인 경우가 존재하기 때문이다.

사용자가 온라인 상태에서 fetch가 실행되어 데이터를 가져오는 동안 오프라인 상태가 되면 쿼리도 재시도 매커니즘을 일시 중지한다. 네트워크가 다시 연결되면 일시 중지된 쿼리가 계속 실행된다.
이는 refetch가 아니라 continue이기 때문에 refetchOnReconnect(기본값 true)와는 독립적이다. 만약 오프라인동안 쿼리가 취소되었다면 다시 연결이 되더라도 fetch를 계속하지 않는다.

## Network Mode: always

always모드에서는 온라인 / 오프라인 상태를 무시하고 항상 fetch를 한다. 이 모드는 쿼리가 작동하는데 활성 네트워크 연결이 필요하지 않은 환경에서 쿼리를 사용하는 경우(예: AsyncStorage 에서 읽어오는 경우)거나 `Promise.resolve(5)` 를 반환 해버리는 경우가 해당된다.

- 네트워크에 연결되어 있지 않기 때문에 쿼리가 일시 중지(`paused`)되지 않는다.
- 재시도는 일시 중지되지 않는다. 쿼리가 실패하면 오류(`error`) 상태가 된다.
- `refetchOnReconnect`는 이 모드에서 기본적으로 `false`로 설정된다. 네트워크에 다시 연결하는 것은 오래된 쿼리를 다시 가져와야 한다는 좋은 표시가 더 이상 아니기 때문이다. 원한다면 그것을 킬 수 있다.

## Network Mode: offlineFirst

offlineFirst 모드는 online과 always 옵션의 중간 모드이다.
이 모드에선 TanStack Query는 queryFn를 한 번 실행한 다음 재시도를 중지한다.
[오프라인 우선 PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers)에서와 같이 캐싱 요청을 가로채는 serviceWorker가 있거나 Cache-Control 헤더를 통해 HTTP 캐싱을 사용하는 경우 매우 유용하다.

## Devtools

TanStack Query Devtools는 쿼리를 가져오지만 네트워크 연결이 없는 경우 일시 중지 상태로 쿼리를 표시한다. 오프라인 동작을 모의 실행하는 전환 버튼도 있다. 이 단추는 실제로 네트워크 연결을 방해하지는 않지만(브라우저 개발 도구에서 할 수 있음) 온라인 관리자를 오프라인 상태로 설정한다.
