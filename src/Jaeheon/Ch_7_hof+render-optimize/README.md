# 07장 고차 함수와 렌더링 최적화

## 고차 함수

```ts
// TargetComponent : 인자로 전달 받는 컴포넌트로 속성추가 후 반환되는 컴포넌트
// props : 기존 컴포넌트가 사용하는 속성
// newProp : 새롭게 추가할 속성
const higherOrderFunction = (TargetComponent) => {
  return (props: any) => {
    return <TargetComponent {...props} newProp={newProp} />;
  };
};
```

                Component  --> HOF() --> New Component

    다른 함수와 컴포넌트를 인자로 전달받거나 반환하는 함수
    대부분의 컴포넌트에서 공통으로 필요한 기능(ex: 로그인 여부, 권한 상태 확인) 같은 경우 고차 함수를 만들어서 적용하면 편리
    에러 처리, 로깅 등의 기능에서도 사용

    함수형 컴포넌트에서는 고차 함수를 권장 X
    - 한 컴포넌트에 여러 고차 함수 적용 시 동일한 이름의 속성을 사용하고 있다면 충돌이 남
    - 인자로 전달되는 컴포넌트의 속성을 알 수 없어 암묵적으로 any 타입을 사용해야 해서 타입스크립트 적용이 어려움

<hr/>

## 렌더링 최적화

1.  React.memo 고차 함수

    ```ts
    const Component = (....) => {
        ....
    }

    export default React.memo(Component)
    ```

        리액트 라이브러리로 기본 제공되는 고차 함수로 컴포넌트가 동일한 상태나 속성을 가지고 있다면 얕은 비교를 수행하여 불필요한 렌더링을 방지

        불변성을 가진 상태의 변경이 필수!!

        속성으로 함수를 전달 받는 경우는 React.memo만으로는 부족하고 useCallback과 같이 사용해야 함

2.  useCallback

    ```ts
    // callback: 캐싱할 함수
    // depList: 의존성 배열로 배열안의 값이 바뀌기 전까지는 함수를 새로 만들지 않음
    const memoizedCallback = useCallback(callback, depList);
    ```

        컴포넌트 내부의 함수를 캐싱하여 렌더링할 때마다 함수가 재생성 되지 않게 재사용 하는 훅

        의존성 배열로 배열안의 값이 바뀌기 전까지는 캐싱된 값을 유지

        최적화가 필요할 때 사용하는 메모이제이션 훅

3.  추가적인 컴포넌트 분할

        하나의 컴포넌트 영역에서 자주 바뀌는 속성을 전달받을 영역과 그렇지 않은 영역으로 컴포넌트를 분할하면 더 나은 렌더링 가능

<hr/>

## App1 (현재 시각 + 마우스 커서 위치)

- 고차 함수를 사용하여 현재 시각, 마우스 커서의 위치를 보여주는 앱
- Child 컴포넌트에 2개의 고차 함수 적용
- 먼저 connectClockTime 고차 함수로 currentTime 속성을 추가한 컴포넌트 반환
- 그 후 connectMousePos 고차 함수로 position 속성을 추가한 컴포넌트 반환
- 결과적으로 currentTime, position 2개의 속성을 가지는 Child 컴포넌트 완성
- Child --> connectClockTime() --> Child + clockTime --> connectMousePos() --> Child + clockTime + mousePos

## App2(간단한 todoList)

- useState를 사용한 간단한 todoList
- 빈 문자열을 추가 시도하면 useRef를 이용하여 input 요소 focus
- useMemo을 사용한 최적화(todoList가 변경되기 전까지는 getTodoListCount함수의 반환값을 캐싱)
- useCallback을 사용한 최적화(addTodo, deleteTodo 함수가 재생성 X)
- React.memo를 사용한 최적화(TodoListItem 컴포넌트의 불필요한 렌더링 방지)

### 💡💡💡

```ts
const [todoList, setTodoList] = useState([]);

// 책
const addTodo = useCallback(
  (todo: string) => {
    const newTodoList = [...todoList, { id: new Date(), todo: todo }];
    setTodoList(newTodoList);
  },
  [todoList]
);

// 해결
const addTodo = useCallback((todo: string) => {
  const newTodo = { id: new Date(), todo: todo };
  setTodoList((prevState) => [...prevState, newTodo]);
}, []);
```

- 책에서는 useCallback의 의존성 배열에 todoList state를 넣었지만 그러면 결국 todoList의 상태가 변경되는 추가, 삭제 작업을 하면 모든 todoListItem들이 다시 렌더링 됨
- 의존성 배열을 빈 배열로 하여 최초 한번 함수를 생성하고 setState 메서드에 인수로 새로운 상태값이 아닌 콜백함수를 전달하는 방식인 함수형 업데이트를 사용하면 해결
- setState에 콜백함수로 전달된 함수는 어떤 상황이든 항상 매개변수로 최신의 State를 제공받음
- 그러므로 addTodo, deleteTodo 함수내부에서 호출한 setState 일지라도 함수형 업데이트를 사용하면 useCallback으로 addTodo, deleteTodo 함수가 재생성되지 않아도 최신의 상태값을 참조할 수 있음.
