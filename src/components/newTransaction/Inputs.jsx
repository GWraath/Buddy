import React, {useState} from 'react'
import {Button, TextField} from '@mui/material'
import DateChange from './DateChange';
import Totalize from './Totalize';
import PublishDebt from './PublishDebt';
import ChangeAmount from './ChangeAmount';

export default function Inputs(props) {
    const [total, setTotal] = useState(0);
    const [dueDate, setDueDate] = useState(null);
    const [amount, setAmount] = useState(0)
    const [count, setCount] = useState(0)
    
    return (
        <div>
            {props.user?<Totalize setTotal={setTotal} user={props.user}/>:null}
            <ChangeAmount setAmount={setAmount}/>
            <DateChange setDueDate={setDueDate}/><br/>
            <Button onClick={()=>setCount(count+1)}>Add</Button>
            {count===1 ? <PublishDebt userId={props.userId} amount={amount} dueDate={dueDate} total={total} onChange={()=>setCount(count+1)}/> : null}
        </div>
    )
}