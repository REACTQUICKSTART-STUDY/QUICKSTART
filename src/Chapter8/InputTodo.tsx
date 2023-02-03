import React, {useState, useEffect, useContext} from 'react'
import TodoContext from './TodoContext'

const InputTodo = () => {
  const [todo, setTodo] = useState<string>('')
  // useContext 훅으로 TodoContext의 value 값 받기
  const value = useContext(TodoContext)

  //value가 가진 속성의 actions의 addTodo 함수를 호출하기
  const addHandler = () => {
    value?.actions.addTodo(todo)
    setTodo('')
  }

  const enterInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addHandler()
    }
  }

  const changeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }

  return (
    <div className='row'>
      <div className='col'>
        <div className='input-group'>
          <input id='msg' type='text' className='form-control'
          name='msg' placeholder='할일 입력' value={todo}
          onChange={changeTodo} onKeyUp={enterInput} />
          <span className='btn btn-primary inpur-group-addon'
          onClick={addHandler}
          >추가</span>
        </div>
      </div>
    </div>
  )
}

export default InputTodo