import React from 'react'
import { BeverageType } from '../App'
import BeverageItem from './BeverageItem'

type BeverageListPropsType = {
  beverages: Array<BeverageType>
}

const BeverageList = (props: BeverageListPropsType) => {
  const list = props.beverages
  let beverages = list.map((item, index) => {
    return (
      <BeverageItem
        key={item.no}
        beverageitem={item} />
    )
  })

  return <ul className='list-group'>{beverages}</ul>
}

export default BeverageList