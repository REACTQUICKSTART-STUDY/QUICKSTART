import { Link } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { CallbacksType, StatesType } from "../AppContainer";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useState } from "react";

type TodoListPropsType = { states: StatesType; callbacks: CallbacksType };

const TodoList = ({ states, callbacks }: TodoListPropsType) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSelection, setFilterSelection] = useState<string>("모두");

  const [sortStatus, setSortStatus] = useState<string>("oldest");
  const [sortSelection, setSortSelection] = useState<string>("오래된 순");

  let todoItems: JSX.Element[] | JSX.Element = callbacks
    .sortTodoList(callbacks.filterTodoList(filterStatus), sortStatus)
    .map((item) => {
      return <TodoItem key={item.id} todoItem={item} callbacks={callbacks} />;
    });

  if (todoItems.length <= 0) {
    if (filterStatus === "all")
      todoItems = <h5 className="text-center mt-5">할일을 추가해보세요</h5>;
    else if (filterStatus === "done")
      todoItems = <h5 className="text-center mt-5">완료한 일이 없어요</h5>;
    else todoItems = <h5 className="text-center mt-5">해야할 일이 없어요</h5>;
  }

  const selectFilter = (eventKey: string | null, e: any) => {
    if (eventKey) {
      setFilterStatus(eventKey);
      setFilterSelection(e.target.innerText);
    }
  };

  const selectSort = (eventKey: string | null, e: any) => {
    if (eventKey) {
      setSortStatus(eventKey);
      setSortSelection(e.target.innerText);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col p-3 d-flex gap-3">
          <Link className="btn btn-primary" to="/todos/add">
            할일 추가
          </Link>
          <DropdownButton
            id="dropdown-item-button"
            title={filterSelection}
            onSelect={selectFilter}
          >
            <Dropdown.Item as="button" eventKey="all">
              모두
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="done">
              완료
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="not-done">
              아직...
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="dropdown-item-button"
            title={sortSelection}
            onSelect={selectSort}
          >
            <Dropdown.Item as="button" eventKey="oldest">
              오래된 순
            </Dropdown.Item>
            <Dropdown.Item as="button" eventKey="latest">
              최신 순
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group border-top-0">{todoItems}</ul>
        </div>
      </div>
    </>
  );
};

export default TodoList;
