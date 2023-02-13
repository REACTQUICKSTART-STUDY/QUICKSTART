import { useNavigate } from "react-router-dom";
import { CallbacksType, TodoItemType } from "../AppContainer";

type TodoItemPropsType = { todoItem: TodoItemType; callbacks: CallbacksType };

const TodoItem = ({ todoItem, callbacks }: TodoItemPropsType) => {
  const navigate = useNavigate();
  let itemClassName =
    "list-group-item d-flex align-items-center justify-content-between pointer";
  if (todoItem.done) itemClassName += " list-group-item-success";

  return (
    <li
      className={itemClassName}
      onClick={() => {
        navigate(`/todos/${todoItem.id}`);
      }}
    >
      <div>
        <div
          className="d-flex align-items-center gap-2 pointer"
          onClick={(e) => {
            e.stopPropagation();
            callbacks.toggleDone(todoItem.id);
          }}
        >
          <input
            // id={todoItem.id.toString()}
            type="checkbox"
            checked={todoItem.done}
            onChange={() => {
              callbacks.toggleDone(todoItem.id);
            }}
          />
          <label
            className={
              todoItem.done
                ? "text-decoration-line-through text-break"
                : "text-break"
            }
            // htmlFor={todoItem.id.toString()}
          >
            {todoItem.todo}
          </label>
        </div>
      </div>
      <div className="d-flex flex-shrink-0">
        <button
          className="btn btn-secondary ms-3"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/todos/edit/" + todoItem.id);
          }}
        >
          수정
        </button>
        <button
          className="btn btn-danger ms-3"
          onClick={(e) => {
            e.stopPropagation();
            callbacks.deleteTodo(todoItem.id);
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
