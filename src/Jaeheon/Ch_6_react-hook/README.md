# 06장 리액트 훅

## 함수 컴포넌트의 리액트 훅

1.  ### useState

    ```ts
    // getter: 읽기 전용 속성
    // setter: 상태를 변경할 때 사용하는 함수
    // StateType: 상태 데이터의 타입
    // initialValue: 상태의 초기값
    const [getter, setter] = useState<StateType>(initialValue);
    ```

    함수 컴포넌트에서 state(상태)를 이용하기 위해 사용하는 훅

2.  ### useEffect

    ```ts
    // effectCallback: 필수로 작성해야 하는 함수로 내부에 클린업 함수를 리턴 가능
    // depList: 선택적으로 전달하는 의존성 배열
    useEffect(effectCallback, depList);
    effectCallback = () => {
      // 실행할 코드 작성
      // 클린업 함수는 필요하면 작성
      return () => {};
    };
    ```

    클래스 컴포넌트의 componentDidUpdate,componentDidMount, componentWillUnmount 생명주기 메서드 제공

    effectCallback 함수는 컴포넌트가 마운트 되거나 depList 배열에 지정된 값이 변경되면 호출

    clean up 함수는 언마운트 될 때 실행

    depList가 없으면 컴포넌트가 마운트, 업데이트 될 때 콜백함수 실행

    depList가 있고 배열 안에 값이 없으면 마운트 될때 콜백함수 실행

    depList가 있고 배열 안에 값이 있으면 해당 값이 변경되면 콜백함수 실행

    ```ts
    useEffect(() => {
      // ----------
      // 영역 1
      // ----------

      // 클린업 함수
      return () => {
        // ----------
        // 영역 2
        // ----------
      };
    }, depList);
    ```

    - 컴포넌트가 마운트: 영역 1 실행
    - 컴포넌트가 언마운트: 영역 2 실행
    - 컴포넌트가 업데이트:
      - depList가 없으면 영역2, 영역1 순으로 실행
      - depList가 빈 배열이면 영역1, 영역2 모두 실행 X
      - depList에 값이 있으면 해당 값이 변경되면 영역2, 영역1 순으로 실행

3.  ### useRef

    ```ts
    // initialValue: 참조 객체로 주어질 초기값
    const refObject = useRef(initialValue);
    ```

    반환값으로는 참조를 포함하는 객체로 데이터에 접근하려면 current 속성 사용

    다시 렌더링되어도 기존 데이터를 유지하지만 state와는 다르게 참조하는 데이터가 변경되어도 다시 렌더링 되지 않음

    HTML 요소의 ref속성을 이용하여 브라우저 DOM에 접근도 가능

4.  ### useReducer

    ```ts
    // reducer 함수 구조
    (state, action) => {
      // state와 action을 이용해 연산을 수행 후 새로운 상태를 리턴
      return newState;
    };

    // state: 상태
    // dispatch: 상태를 변경하는 메서드
    // reducer: 새로운 상태를 리턴하는 리듀서 함수
    // initialState: 초기 상태로 지정할 객체
    const [state, dispatch] = useReducer(reducer, initialState);
    ```

    리듀서 함수와 초기 상태를 인자로 전달하여 호출하면 상태와 상태 변경을 위한 메시지를 전달하는 dispatch 함수가 리턴

    dispatch 함수가 미리 정의한 형식의 메시지(action.type)를 전달하면 상태를 변경하도록 리듀서 함수를 작성해야함

    reducer 함수 안에서 상태를 변경 할 때는 불변성을 위해 state와 action 자체를 변경하면 안되고 새로운 상태를 만들어서 반환해야 함

5.  ### useMemo

    ```ts
    // factory: 캐싱할 값을 만들어내는 함수
    // depList: 의존성 배열로 배열안의 값이 바뀌기 전까지는 캐싱된 값을 유지
    // 캐싱 할 값의 타입은 제네릭 T로 지정
    const memoizedValue = useMemo<T>(factory: () => T, depList);
    ```

    함수가 호출되고 반환된 값을 캐싱하여 재사용 하는 훅으로
    의존성 배열로 배열안의 값이 바뀌기 전까지는 캐싱된 값을 유지

    최적화가 필요할 때 사용하는 메모이제이션 훅

6.  ### useCallback

    ```ts
    // callback: 캐싱할 함수
    // depList: 의존성 배열로 배열안의 값이 바뀌기 전까지는 함수를 새로 만들지 않음
    const memoizedCallback = useCallback(callback, depList);
    ```

    컴포넌트 내부의 함수를 캐싱하여 렌더링할 때마다 함수가 재생성 되지 않게 재사용 하는 훅

    의존성 배열로 배열안의 값이 바뀌기 전까지는 캐싱된 값을 유지

    최적화가 필요할 때 사용하는 메모이제이션 훅

7.  ### 사용자 정의 훅

    개발자가 직접 작성하는 리액트 훅으로 기본으로 제공되는 훅들을 이용해 필요한 기능을 새로 만들어서 여러 컴포넌트에서 재사용 가능

    일반적으로 use~ 로 시작하도록 지정

<hr/>

## App1(간단한 디지털 시계)

- useEffect의 생명주기 기능을 활용한 디지털 시계
- 시계가 mount되면 setInterval이 호출
- 시계가 unmount되면 클린업 함수에서 setInterval 해제

## App2(간단한 todoList)

- useState 대신 useReducer를 사용한 간단한 todoList
- TodoReducer.ts에서 reducer, action(dispatch) 설정
- todoList 상태를 useState가 아닌 useReducer로 관리
- todoList 상태를 변경하고 싶으면 dispatchTodoList 호출
- 빈 문자열을 추가 시도하면 useRef를 이용하여 input 요소 focus
- useCallback을 사용한 최적화(addTodo, deleteTodo 함수가 재생성 X)
- React.memo를 사용한 최적화(TodoListItem 컴포넌트의 불필요한 렌더링 방지)

## App3(state와 ref)

- state와 ref의 렌더링 차이를 나타낸 앱
- state의 경우 값이 변경되면 다시 렌더링
- ref의 경우 값이 바뀌어도 렌더링 X, state가 변경되면 다시 렌더링

## App4(간단한 TodoList)

- useState를 사용한 간단한 todoList
- 빈 문자열을 추가 시도하면 useRef를 이용하여 input 요소 focus
- useMemo을 사용한 최적화(todoList가 변경되기 전까지는 getTodoListCount함수의 반환값을 캐싱)
- useCallback을 사용한 최적화(addTodo, deleteTodo 함수가 재생성 X)
- React.memo를 사용한 최적화(TodoListItem 컴포넌트의 불필요한 렌더링 방지)

## App5(현재 시각)

- 사용자 정의 훅을 사용하여 현재 시각을 보여주는 앱
- App1에서 사용한 일부 코드를 useClockTime이라는 새로운 훅으로 정의
