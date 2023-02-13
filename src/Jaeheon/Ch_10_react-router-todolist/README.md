# 10장 리액트 라우터를 이용한 TodoList App

## AppContainer

```tsx

const AppContainer = () => {
  // 상태와 상태를 변경하는 로직을 담당하는 함수 작성
  .....
  const callbacks: CallbacksType = {
    addTodo,
    deleteTodo,
    updateTodo,
    toggleDone,
    filterTodoList,
    sortTodoList,
  };
  const states: StatesType = { todoList };

  return <App callbacks={callbacks} states={states} />;
};
```

상태와 상태를 변경하는 로직을 담당하는 함수가 있는 컴포넌트로 상태는 states, 상태 변경 로직은 callbacks 객체로 묶어서 App컴포넌트로 전달한다.

## App

```tsx
// 전달하는 속성은 생략
<Router>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="todos" element={<TodoList />} />
      <Route path="todos/:id" element={<TodoDetail />} />
      <Route path="todos/add" element={<AddTodo />} />
      <Route path="todos/edit/:id" element={<EditTodo />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</Router>
```

라우트 정보를 설정하는 컴포넌트

## Layout

- Header 컴포넌트와 Outlet 컴포넌트를 가지고 있는 컴포넌트

## Home, About

- 아무런 기능이 없는 더미 컴포넌트
- 경로: "/", "/about"

## TodoList

- TodoList를 보여주는 컴포넌트
- 경로: "/todos"

## TodoDetail

- TodoItem의 상세 정보를 보여주는 컴포넌트
- 경로: "/todos/:id"

## AddTodo

- TodoItem을 추가하는 컴포넌트
- 경로: "/todos/add"

## EditTodo

- TodoItem의 상세 정보를 수정하는 컴포넌트
- 경로: "/todos/edit/:id"

## NotFound

- 존재하지 않는 경로로 이동 시 보여주는 컴포넌트
