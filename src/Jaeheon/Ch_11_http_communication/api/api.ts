import { TodoItemType } from "../AppContainer";
import { instance } from "./instance";

export {};

export const getTodoApi = async () => {
  try {
    const res = await instance.get("");
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof Error) alert("TodoList 조회 실패" + e.message);
    else alert("TodoList 조회 실패" + e);
  }
};

export const addTodoApi = async (todo: string, desc: string) => {
  try {
    const res = await instance.post("", { todo, desc });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof Error) alert("할일 추가 실패" + e.message);
    else alert("할일 추가 실패" + e);
  }
};

export const deleteTodoApi = async (id: number) => {
  try {
    const res = await instance.delete(`/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof Error) alert("할일 삭제 실패" + e.message);
    else alert("할일 삭제 실패" + e);
  }
};

export const toggleDoneApi = async (todoItem: TodoItemType) => {
  try {
    const res = await instance.put(`/${todoItem.id}`, {
      ...todoItem,
      done: !todoItem.done,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof Error) alert("완료 토글 실패" + e.message);
    else alert("완료 토글 실패" + e);
  }
};

export const updateTodoApi = async (
  id: number,
  todo: string,
  desc: string,
  done: boolean
) => {
  try {
    const res = await instance.put(`/${id}`, { todo, desc, done });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e instanceof Error) alert("할일 수정 실패" + e.message);
    else alert("할일 수정 실패" + e);
  }
};
