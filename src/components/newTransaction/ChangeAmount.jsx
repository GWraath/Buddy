import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

export default function ChangeAmount(props) {
    const [isCustom, setCustom] = useState(false)
    return (
        <div>
            {isCustom ? (
                <>
                    <TextField
                        type="number"
                        onChange={(e) => props.setAmount(parseInt(e.target.value))}
                        label="Custom Amount"
                    />
                    <br />
                </>
            ) : (
                <>
                    <Button onClick={() => props.setAmount(20)}>20</Button>
                    <br />
                    <Button onClick={() => props.setAmount(50)}>50</Button>
                    <br />
                    <Button onClick={() => props.setAmount(120)}>120</Button>
                    <br />
                </>
            )}

            {isCustom?<Button onClick={() => setCustom(!isCustom)}>Buttons</Button>:<Button onClick={() => setCustom(!isCustom)}>Custom</Button>}
        </div>
    )
}
