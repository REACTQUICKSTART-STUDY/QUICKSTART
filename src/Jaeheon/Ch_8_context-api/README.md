# 8장 Context API

## Context-API

    Context-API는 컴포넌트 트리에서 속성을 전달하지 않고 필요한 데이터를 컴포넌트에 전달하는 방법을 제공하는 API

    기존에 만들던 앱들의 상태 관리 방법은 부모 컴포넌트에서 상태와 상태를 변경하는 함수를 만들고 속성으로 자식 컴포넌트에게 전달했지만 컴포넌트 트리가 복잡해지면 끝단의 컴포넌트가 필요한 데이터를 부모에서부터 끝까지 내려주는 것이 불편

    Context-API는 Provider를 이용해 공유하는 데이터(value)를 제공하고 데이터를 필요로 하는 컴포넌트는 useContext 훅을 이용해 데이터에 접근 가능 (속성을 이용한 전달을 반복하지 않아도 됨)

<br/>

## Context-API 사용 단계

1.  Context 객체가 관리할 데이터(value) 타입 정의

    ```ts
    export type TodoListContextValueType = {
      state: {
        // 상태 타입 정의
      };
      actions: {
        // 상태 변경 함수 타입 정의
      };
    };
    ```

    ```
    데이터의 타입을 정의할 때는 상태뿐만 아니라 상태를 변경하는 함수까지 포함

    정의한 타입은 useContext 훅을 이용해 자식 컴포넌트가 데이터에 접근할 때도 사용하므로 export 해두어야 함
    ```

2.  React.createContext() 함수를 이용해 Context 객체를 생성

    ```ts
    const TodoContext = React.createContext<TodoListContextValueType | null>(
      null
    );
    // or
    const TodoContext = React.createContext<TodoListContextValueType>(
      {} as TodoListContextValueType
    );
    ```

    ```
    미리 정의한 데이터(value)의 타입 또는 null을 허용하도록 제네릭으로 지정하여 createContext 함수를 호출하고 Context 객체를 생성

    null을 하용하는 이유는 Context를 생성할 때 null로 초기화하기 때문

    혹은 null을 사용하지 않고 두 번째 처럼도 가능
    ```

3.  상태와 상태 변경 함수를 관리할 Provider 컴포넌트를 작성

    ```ts
    type Props = {
      children: JSX.Element | JSX.Element[];
    };

    export const TodoProvider = ({ children }: Props) => {
      // 상태와 상태 변경 함수 작성

      const value: TodoListContextValueType = {
        state: {
          // 상태
        },
        actions: {
          // 상태 변경 함수
        },
      };
      return (
        <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
      );
    };
    ```

    ```
    상태와 상태 변경 함수를 작성하기 위해 앱에서 사용할 Provider 컴포넌트를 하나 작성

    Provider 컴포넌트에는 상태와 상태 변경 함수를 1.에서 정의한 데이터의 타입에 맞게 객체로 구성한 뒤, Context 객체의 Provider로 렌더링하도록 작성

    Context 객체의 Provider에 데이터(value)를 value 속성으로 전달
    ```

4.  데이터(value)를 필요로 하는 컴포넌트에서 사용하기 위해 Provider 컴포넌트로 감씨줌

    ```ts
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <TodoProvider>
        <App />
      </TodoProvider>
    );
    ```

    ```
    이렇게 해주면 <App />과 <App />의 하위 컴포넌트에서 useContext 훅을 이용해 데이터(value) 사용 가능

    3.에서 {children}은 TodoProvider를 위 코드처럼 렌더링할 때 <App /> 컴포넌트와 같은 자식 컴포넌트에 해당
    ```

5.  자식 컴포넌트에서는 useContext 훅을 이용해 데이터 객체(value)를 받아서 상태와 상태 변경 함수를 이용

    ```ts
    const value = useContext(TodoContext);
    // or
    const { state, actions } = useContext(TodoContext);
    ```

    ```
    2.에서 null을 허용하는 첫 번째 방법으로 Context 객체를 생성헀으면 위 코드에서 첫 번째 방법을 사용(두 번째는 사용불가)

    2.에서 두번 째 방법으로 Context 객체를 생성헀으면 위 코드에서 첫 번째 방법도 가능하지만 두번 째 방법처럼 객체의 구조분해할당을 이용해 바로 속성 사용 가능
    ```

    <hr />

## App1(간단한 BucketList)

- Context API를 적용한 BucketList-App
- 위에 있는 Context-API 사용 단계처럼 데이터의 타입과 Context 객체, 상태와 상태 변경 함수를 포함하는 BucketProvider 컴포넌트를 BucketContext.tsx에 작성
- main.tsx에서 BucketProvider 컴포넌트로 App 컴포넌트를 감싸 자식으로 포함하여 App 컴포넌트와 그 하위 컴포넌트에서 데이터를 사용 가능하게 함
- 데이터가 필요한 컴포넌트에서는 useContext 훅을 이용해 사용
- 완료 토글, 수정, 필터 기능 추가
