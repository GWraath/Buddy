import React, { useEffect, useState } from 'react'
import Axios from '../../axios/Axios'

export default function PublishDebt(props) {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState(null);

  useEffect(() => {
    const sum = props.total + props.amount
    parseInt(sum)
    console.log(sum)
    setObj({ 'userID': props.userId, 'amount': props.amount, 'duedate': props.dueDate, 'total': sum, 'paid': false })
  },[])

  return (
    <>
      {count === 0 && obj ? <Axios call={'post'} type={'debts'} object={obj} setCount={setCount} count={count}/> : null}
      {count === 1 && obj ? <Axios call={'put'} type={'users'} object={{ 'total': obj.total}} setCount={setCount} count={count} id={props.userId}/> : null}
    </>
  )
}
