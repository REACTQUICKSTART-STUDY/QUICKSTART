import React from "react";

type Props = {
  id: number;
  deleteTodo: (id: number) => void;
};

const TodoListItemDelete = (props: Props) => {
  console.log(`## TodoListItemDelete`);
  return (
    <span
      style={{ cursor: "pointer", color: "blue" }}
      onClick={() => props.deleteTodo(props.id)}
    >
      삭제
    </span>
  );
};

export default React.memo(TodoListItemDelete);
