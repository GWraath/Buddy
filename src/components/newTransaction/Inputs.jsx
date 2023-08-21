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
    const [click, setClick] = useState(false)
    
    return (
        <div>
            {props.user?<Totalize setTotal={setTotal} user={props.user}/>:null}
            <ChangeAmount setAmount={setAmount}/>
            <DateChange setDueDate={setDueDate}/><br/>
            <Button onClick={()=>setClick(true)}>Add</Button>
            {click ? <PublishDebt userId={props.userId} amount={amount} dueDate={dueDate} total={total}/> : null}
        </div>
    )
}