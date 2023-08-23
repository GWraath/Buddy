import React, { useEffect } from 'react'

export default function Totalize(props) {
    useEffect(() => {
        const user = props.user
        const filteredArray = user.filter((transaction) => transaction.paid === false)
        const amountArray = filteredArray.map(({ amount }) => ({ amount }))
        const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
        props.setTotal(sum)
    })
    return (
        null
    )
}
