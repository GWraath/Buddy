import React, {useState} from 'react'
import {Button, TextField} from '@mui/material'
import DateChange from './DateChange';
import Totalize from './Totalize';
import PublishDebt from './PublishDebt';
import ChangeAmount from './ChangeAmount';

export default function Inputs(props) {
    const [total, setTotal] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [amount, setAmount] = useState(null)
    const [count, setCount] = useState(null)

    const inputCheck = () => {
        if (amount == null || dueDate == null || props.user == null) {
            alert('Please fill in all fields')
        } else { setCount(count+1)  } 
    }
    
    return (
        <div>
            {props.user?<Totalize setTotal={setTotal} user={props.user}/>:null}
            <ChangeAmount setAmount={setAmount}/>
            <DateChange setDueDate={setDueDate}/><br/>
            <Button onClick={inputCheck}>Add</Button>
            {count===1 ? <PublishDebt userId={props.userId} amount={amount} dueDate={dueDate} total={total} onChange={()=>setCount(count+1)}/> : null}
        </div>
    )
}