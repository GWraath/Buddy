import React from 'react'
import { Button, TextField } from '@mui/material'

export default function ChangeAmount(props) {
    return (
        <div>
            <TextField type='number' onChange={e => props.setAmount(e.target.value)} label="Custom Amount"></TextField><br />
            <Button onClick={() => props.setAmount(20)}>20</Button><br></br>
            <Button onClick={() => props.setAmount(50)}>50</Button><br></br>
            <Button onClick={() => props.setAmount(120)}>120</Button>
        </div>
    )
}
