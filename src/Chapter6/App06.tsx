import { useState, useRef } from "react";

const App = () => {
  const elName: React.RefObject<HTMLInputElement> = 
  useRef<HTMLInputElement>(null)

  const [ name, setName ] = useState('홍길동')

  const refTel = useRef("010-2222-2222")

  const goFirstInputElement = () => {
    if(elName.current) elName.current.focus()
  }

  return (
    <div className="boxStyle">
      이름 : <input 
        onChange={(e) => (setName(e.target.value))} 
        value={name} 
        ref={elName} 
        type="text" 
        defaultValue="배현수" 
      />
      <br />
      전화 : <input 
        onChange={(e) => (refTel.current = e.target.value)} 
        type="text" />
      <br />
      주소 : <input type="text" defaultValue="부천" />
      <br />
      <button onClick={goFirstInputElement}>첫 번째 필드로 포커스 이동</button>
      <br />
      <div>refTel 값 : {refTel.current}</div>
    </div>
  )
}

export default App