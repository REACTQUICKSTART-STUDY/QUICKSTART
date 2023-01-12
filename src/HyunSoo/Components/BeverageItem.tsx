import React from 'react'
import { BeverageType } from '../App'

type BeverageItemPropsType = {
  beverageitem: BeverageType
}

const BeverageItem = (props: BeverageItemPropsType) => {
  let item = props.beverageitem
  // console.log(item)
  return (
    <label className={item.visited ? "list-group-item active" : "list-group-item"}>
      <input className='form-check-input' type='checkbox' />
      {item.beverage}
      <small className='text-secondary'>
        {item.message}
      </small>
    </label>
  )
}

export default BeverageItem