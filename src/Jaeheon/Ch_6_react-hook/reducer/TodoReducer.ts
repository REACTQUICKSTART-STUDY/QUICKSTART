import produce from "immer";

export type TodoItemType = {
  id: number;
  todo: string;
};

export const TODO_ACTON = {
  ADD: "addTodo" as const,
  DELETE: "deleteTodo" as const,
};

export const TodoActionCreator = {
  addTodo: (todo: string) => ({
    type: TODO_ACTON.ADD,
    payload: { todo: todo },
  }),
  deleteTodo: (id: number) => ({
    type: TODO_ACTON.DELETE,
    payload: { id: id },
  }),
};

export type TodoActionType =
  | ReturnType<typeof TodoActionCreator.addTodo>
  | ReturnType<typeof TodoActionCreator.deleteTodo>;

export const TodoReducer = (state: TodoItemType[], action: TodoActionType) => {
  switch (action.type) {
    case TODO_ACTON.ADD:
      return produce(state, (draft: TodoItemType[]) => {
        draft.push({ id: new Date().getTime(), todo: action.payload.todo });
      });
    case TODO_ACTON.DELETE:
      const index = state.findIndex((item) => item.id === action.payload.id);
      return produce(state, (draft: TodoItemType[]) => {
        draft.splice(index, 1);
      });
    default:
      return state;
  }
};
