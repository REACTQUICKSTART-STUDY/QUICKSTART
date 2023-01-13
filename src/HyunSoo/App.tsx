import React, { useState } from 'react'
import BeverageList from './Components/BeverageList'
import "bootstrap/dist/css/bootstrap.css"
import Footer from './Components/Footer'
import Calc from './Components/Calc'

import {
  BasicButton,
  ItalicButton,
  UnderLineButton,
  WhiteUnderlineButton
} from './Components/Buttons'

export type BeverageType = {
  no: number
  beverage: string
  visited: boolean
  message?: string
}

const App = () => {
  const [x, setX] = useState<number>(100)
  // const [y, setY] = useState<number>(200)
  // const [oper, setOper] = useState<string>('&')

  const [theme, setTheme] = useState('default')
  const [msg, setMsg] = useState<string>('음료 종류')
  const [list, setList] = useState<Array<BeverageType>>([
    { no: 1, beverage: '커피', visited: false, message: '커혈 필수' },
    { no: 2, beverage: '주스', visited: false, message: '망고주스 먹고싶다' },
    { no: 3, beverage: '술', visited: false, message: '굿' },
    { no: 4, beverage: '물', visited: false },
  ])

  const addResult = (x: number, y: number) => {
    return (
      <div className="card card-body bg-light mb-5">
        {x} + {y} = {x + y}
      </div>
    )
  }

  return (
    <div className='container'>
      <h2>Hello {msg}</h2>
      <hr className="dash-style" />
      {addResult(4, 3)}
      <BeverageList beverages={list} />
      <BasicButton>기본</BasicButton>
      <ItalicButton>이탤릭</ItalicButton>
      <UnderLineButton>언더라인</UnderLineButton>
      <WhiteUnderlineButton>화이트 언더라인</WhiteUnderlineButton>
      <br className='p-10' />
      <div>
        <Calc x={x}
        // y={y} oper={oper} 
        />
      </div>
      <Footer theme={theme} />
    </div>
  )
}

export default App