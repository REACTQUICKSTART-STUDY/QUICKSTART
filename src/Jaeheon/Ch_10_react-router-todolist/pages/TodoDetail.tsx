import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { StatesType, TodoItemType } from "../AppContainer";
import DateAndTime from "date-and-time";

type TodoDetailPropsType = {
  states: StatesType;
};

type TodoParam = { id?: string };

const TodoDetail = ({ states }: TodoDetailPropsType) => {
  const navigate = useNavigate();
  const { id } = useParams<TodoParam>();
  const todoItem = states.todoList.find(
    (item) => item.id === parseInt(id ? id : "0")
  );

  if (!todoItem) {
    alert("해당 할일이 없습니다.");
    return <Navigate to="/todos" />;
  }

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할일</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="todo">할일:</label>
            <input
              type="text"
              className="form-control"
              id="todo"
              value={todoItem.todo}
              disabled={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">설명:</label>
            <textarea
              className="form-control"
              rows={3}
              id="desc"
              value={todoItem.desc}
              disabled={true}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="done">만든 날짜 : {} </label>{" "}
            <span>
              {DateAndTime.format(
                new Date(todoItem.date),
                "YYYY년 M월 D일 HH시 mm분"
              )}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="done">완료여부 : </label>{" "}
            <span>{todoItem.done ? "✔" : "X"}</span>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-light border m-1 "
              onClick={() => navigate("/todos")}
            >
              뒤로
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
