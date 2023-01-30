import produce from "immer";

export type TodoItemType = { id: number; todo: string };

export const Todo_ACTION = {
  ADD: "addTodo" as const,
  DELETE: "deleteTodo" as const,
};

export const TodoActionCreator = {
  addTodo: (todo: string) => ({
    type: Todo_ACTION.ADD,
    payload: { todo: todo },
  }),
  deleteTodo: (id: number) => ({
    type: Todo_ACTION.DELETE,
    payload: { id: id },
  }),
};

export type TodoActionType =
  | ReturnType<typeof TodoActionCreator.addTodo>
  | ReturnType<typeof TodoActionCreator.deleteTodo>;

const TodoReducer = (state: Array<TodoItemType>, action: TodoActionType) => {
  switch (action.type) {
    case Todo_ACTION.ADD:
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.push({ id: new Date().getTime(), todo: action.payload.todo });
      });
    case Todo_ACTION.DELETE:
      let index = state.findIndex((item) => item.id === action.payload.id);
      return produce(state, (draft: Array<TodoItemType>) => {
        draft.splice(index, 1);
      });
    default:
      return state;
  }
  return <div>TodoReducer</div>;
};

export default TodoReducer;
