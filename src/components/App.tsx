import InputTodo from "./InputTodo";
import TodoList from "./TodoList";

function App() {
  return (
    <div className="Container">
      <div className="card card-body bg-light">
        <div className="title">:: TodoList App</div>
      </div>
      <div className="card card-default card-borderless">
        <div className="card-body">
          <InputTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
