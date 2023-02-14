import produce from 'immer'
import { TodoActionType, TODO_ACTION } from './TodoActionCreator'

export type TodoItemType = {
  id: number;
  todo: string;
  desc: string;
  done: boolean;
}

export type TodoStatesType = { todoList: Array<TodoItemType> }

const initialState: TodoStatesType = {
  todoList: [
    {id: 1, todo: 'todo1', desc: 'desc1', done: false},
    {id: 2, todo: 'todo2', desc: 'desc2', done: true},
    {id: 3, todo: 'todo3', desc: 'desc3', done: false},
    {id: 4, todo: 'todo4', desc: 'desc4', done: false},
  ]
}

const TodoReducer = (state: TodoStatesType = initialState, action: TodoActionType) => {
  let index: number;
  switch (action.type) {
    case TODO_ACTION.ADD_TODO:
      return produce(state, (draft) => {
        draft.todoList.push({
          id: new Date().getTime(),
          todo: action.payload.todo,
          desc: action.payload.desc,
          done: false,
        })
      })
    case TODO_ACTION.DELETE_TODO:
      index = state.todoList.findIndex((item) => item.id === action.payload.id)
      return produce(state, (draft) => {
        draft.todoList.splice(index, 1)
      })
    case TODO_ACTION.TOGGLE_DONE:
      index = state.todoList.findIndex((item) => item.id === action.payload.id)
      return produce(state, (draft) => {
        draft.todoList[index].done = !draft.todoList[index].done
      })
    default:
      return state
  }
}

export default TodoReducer