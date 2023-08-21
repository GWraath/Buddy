import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from '../../axios/Axios'

export default function PublishDebt(props) {
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState(null);
  const navigate = useNavigate()
  if (count===1) {
    navigate('/')
  }
  useEffect(() => {
    const sum = props.total + props.amount
    parseInt(sum)
    setObj({ 'userID': props.userId, 'amount': props.amount, 'duedate': props.dueDate, 'total': props.total, 'paid': false })
  },[obj])
  return (
    <>
      {count === 0 && obj ? <Axios call={'post'} type={'debts'} object={obj} onChange={() => setCount(1)}/> : null}
    </>
  )
}
