import React from 'react'
import { Typography } from '@mui/material'

export default function PaidComponent({ debt }) {
    const updated = debt.updatedAt
    return (
        <>
            <Typography>
                Paid: <br />
                {updated.slice(0,10)}<br />
            </Typography>
        </>
    )
}
