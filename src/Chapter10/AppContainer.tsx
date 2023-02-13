import { useEffect, useState } from "react"
import App from "./App"
import produce from 'immer'
import axios from 'axios'
// import { string } from "prop-types";

export type TodoItemType = { id: number; todo: string; desc: string; done: boolean }
export type StatesType = { todoList: Array<TodoItemType>; isLoading: boolean }
export type CallbacksType = {
  fetchTodoList: () => void;
  addTodo: (todo: string, desc: string, callback: () => void) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (id: number, todo: string, desc: string, done: boolean, callback: () => void) => void;
}

// 다른 사용자 명을 사용하려면 변경할 것
// --> http://localhost:8000/todolist/[user명]/create
const USER = 'hs';
// const BASEURI = '/api/todolist/' + USER;
const BASEURI = '/api/todolist_long/' + USER;

const AppContainer = () => {
  let [todoList, setTodoList] = useState<Array<TodoItemType>>([
    // {id: 1, todo: '투두1', desc: '투두1 설명', done: false},
    // {id: 2, todo: '투두2', desc: '투두2 설명', done: true},
    // {id: 3, todo: '투두3', desc: '투두3 설명', done: false},
    // {id: 4, todo: '투두4', desc: '투두4 설명', done: false},
  ])
  let [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchTodoList();
  }, []);

  // 할 일 목록 조회하는 함수
  const fetchTodoList = async () => {
    setTodoList([]);
    setIsLoading(true);
    try {
      const res = await axios.get(BASEURI);
      setTodoList(res.data)
    } catch (err) {
      if ( err instanceof Error ) alert('조회 실패 : ' + err.message);
      else alert('조회 실패 : ' + err);
    }
    setIsLoading(false);
  }
  
  // 할 일 추가하는 함수
  // 할 일 추가가 성공하면 마지막 인자로 전달된 callback을 호출함
  const addTodo = async (todo: string, desc: string, callback: () => void) => {
    setIsLoading(true);
    try {
      const res = await axios.post(BASEURI, { todo, desc });
      if (res.data.status === 'success') {
        // 한 건의 할 일 추가가 성공하면 전체 할 일 목록을 다시 조회하는 것이 아니라
        // 추가된 한 건의 정보만 state에 추가함
        let newTodoList = produce(todoList, (draft) => {
          draft.push({ id: new Date().getTime(), todo, desc, done: false})
        });    
        setTodoList(newTodoList)
        callback();
      } else {
        alert('할 일 추가 실패 : ' + res.data.message);
      }
    } catch (err) {
      if ( err instanceof Error ) console.log('할 일 추가 실패 : ' + err.message);
      else alert('할 일 추가 실패 : ' + err);
    }
    setIsLoading(false);
  }

  // 할 일 한 건을 삭제하는 함수
  const deleteTodo = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`${BASEURI}/${id}`);
      if (res.data.status === 'success') {
        let index = todoList.findIndex((todo) => todo.id === id)
        let newTodoList = produce(todoList, (draft) => {
          draft.splice(index, 1)
        })
        setTodoList(newTodoList)        
      } else {
        alert('할 일 삭제 실패 : ' + res.data.message);
      }
    } catch (err) {
      if ( err instanceof Error ) alert('할 일 삭제 실패 : ' + err.message);
      else alert('할 일 삭제 실패 : ' + err)
    }
    setIsLoading(false);
  }

  // 할 일 완료 여부를 토글하는 함수
  const toggleDone = async (id: number) => {
    setIsLoading(true);
    try {
      let todoItem = todoList.find((todo) => todo.id === id);
      const res = await axios.put(`${BASEURI}/${id}`, {...todoItem, done: !todoItem?.done })
      if (res.data.status === 'success') {
        let index = todoList.findIndex((todo) => todo.id === id)
        let newTodoList = produce(todoList, (draft) => {
          draft[index].done = !draft[index].done
        })
        setTodoList(newTodoList)
      } else {
        alert('완료 토글 실패 : ' + res.data.message)
      }
    } catch (err) {
      if (err instanceof Error) alert('완료 토글 실패 : ' + err.message);
      else alert('완료 토글 실패 : ' + err)
    }
    setIsLoading(false);
  }

  // 할 일 수정하는 함수
  // 할 일 수정이 성공하면 마지막 인자로 전달된 callback 함수를 호출함
  const updateTodo = async ( id: number, todo: string, desc: string, done: boolean, callback: () => void ) => {
    setIsLoading(true);
    try {
      const res = await axios.put(`${BASEURI}/${id}`, { todo, desc, done });
      if (res.data.success === 'success') {
        let index = todoList.findIndex((todo) => todo.id === id)
        let newTodoList = produce(todoList, (draft) => {
          draft[index] = { ...draft[index], todo, desc, done }
        })
        setTodoList(newTodoList);
        callback();
      } else {
        alert('할 일 수정 실패 : ' + res.data.message);
      }
    } catch (err) {
      if (err instanceof Error) alert('할 일 수정 실패 : ' + err.message);
      else alert('할 일 수정 실패 : ' + err);
    } 
    setIsLoading(false);
  }

  // 상태와 액션을 states, callbacks 객체로 묶어서 한꺼번에 속성 전달!!
  const callbacks: CallbacksType = { fetchTodoList, addTodo, deleteTodo, toggleDone, updateTodo}
  const states: StatesType = { todoList, isLoading }
  
  return <App callbacks={callbacks} states={states} />
}

export default AppContainer