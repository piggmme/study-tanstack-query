# TanStack Query

## 동기

기존 상태 관리 라이브러리는 클라이언트 상태를 관리하는데 적합합지만, 비동기 또는 서버 상태를 관리하는데엔 적합하지 않다.

### 서버 상태

- 사용자가 제어하거나 소유하지 않는 위치에서 원격으로 유지됨
- 가져오기 및 업데이트에 비동기 API 필요
- 공유 소유권을 의미하며 사용자 몰래 다른 사용자가 변경할 수 있음
- 주의하지 않으면 잠재적으로 애플리케이션에서 "오래된" 상태가 될 수 있음

어플리케이션에서 서버 상태 특성을 파악하면 다음과 같은 문제들을 직면할 수 있다.

- 캐싱 중... (프로그래밍에서 가장 어려운 작업임을 알 수 있음)
- 동일한 데이터에 대한 여러 요청을 단일 요청으로 중복 제거
- 백그라운드에서 "오래된" 데이터 업데이트
- 데이터가 "최신 버전이 아닌" 시기 파악
- 가능한 한 빨리 데이터 업데이트 반영
- 페이지네이션 및 느린 로드 데이터와 같은 성능 최적화
- 서버 상태의 메모리 및 가비지 컬렉션 관리
- 구조 공유를 사용하여 쿼리 결과 메모화

> TanStack Query는 서버 상태를 관리하는데 가장 적합한 라이브러리이다. 웹 응용 프로그램의 서버 상태 가져오기, 캐싱, 동기화 및 업데이트를 쉽게 수행할 수 있다.

TanStack Query는 다음과 같은 기능을 제공한다.

- 응용프로그램에서 복잡하고 잘못 이해된 코드의 많은 줄을 제거하고 몇 줄의 응답 쿼리 논리로 대체할 수 있습니다.
- 새로운 서버 상태 데이터 소스를 연결할 필요 없이 애플리케이션을 보다 안정적이고 쉽게 새로운 기능을 구축할 수 있습니다
- 애플리케이션이 그 어느 때보다 빠르고 응답성이 향상되어 최종 사용자에게 직접적인 영향을 미칩니다.
- 대역폭을 절약하고 메모리 성능을 향상시킬 수 있습니다

## 설치

```bash
$ npm i @tanstack/react-query
# or
$ pnpm add @tanstack/react-query
```

```bash
$ npm i @tanstack/react-query-devtools
# or
$ pnpm add @tanstack/react-query-devtools
```

## 중요한 기본값

> `useQuery`나 `useInfiniteQuery` 의 쿼리 인스턴스는 캐쉬된 데이터를 오래된(stale)데이터로 간주한다.

`staleTime` 옵션을 사용해서 전역적으로 쿼리 구성 값을 변경할 수 있다. `staleTime`가 길수록 데이터를 자주 갱신하지 않는다는 의미이다.

오래된(stale) 쿼리는 백그라운드에서 다음과 같은 상황에 자동적으로 새롭게 불러온다.

- 쿼리 마운트의 새 인스턴스
- 브라우저가 다시 포커스될 때
- 네트워크가 다시 연결될 때
- 쿼리는 refetch 주기를 가지고 새롭게 불러옴

만약 프로그래밍 방식으로 refetch 하고싶다면 `refetchOnMount`, `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchInterval`을 사용할 수도 있다.

- `useQuery`, `useInfiniteQuery`로 생성된 인스턴스가 활성화되지 않는 쿼리와 쿼리 옵저버가 `inactive` 레이블로 지정되고 캐시에 남은 쿼리는 나중에 다시 사용된다.

- `inactive` 쿼리는 가비지 컬렉터에 의해 5분뒤에 수거된다. 이 값을 수정하고 싶다면 `cacheTime` 값을 변경하면 된다.

- 실패한 쿼리는 3번 재시도되며 UI에 오류를 표시하기 전에 backoff delay가 발생한다. 이를 변경하고 싶다면 `retry`와 `retryDelay`의 기본 값을 수정할 수 있다.

- 쿼리 결과는 기본적으로 **구조적으로 공유되어 데이터가 실제로 변경되었는지 여부를 감지**하며, 만약 변경되지 않은 경우 `useMemo`, `useCallback`과 관련된 **값 안정화**에 더 도움이 되도록 데이터 참조는 변경되지 않는다. 이런 구조 공유는 JSON 호환 값에서만 작동하고 다른 값 유형은 항상 변경된 것으로 간주된다. `config.structureSharing` 으로 해당 기능을 변경할 수도 있다. `config.isDataEqual`로 데이터 비교 함수를 정의할 수도 있다.

## TanStack Query 개념 정리

> 1. [Queries](/docs/1_queries.md)
> 2. [Query Keys](/docs/2_query_keys.md)
> 3. [Query Functions](/docs/3_query_functions.md)
> 4. [Network Mode](/docs/4_network_mode.md)
