import React from 'react'
import { Button } from '@mui/material'
import axios from 'axios'

export default function PaidDeleteComponent({ debt }, props) {
    const getUsers = (userid, amount) => {
        const axGetUsers = `http://localhost:8063/api/users/${userid}`
        axios.get(axGetUsers)
            .then(response => {
                updateBalance(response.data.data[0].total, userid, amount)
            })
            .catch(error => { console.log(error) })
    }

    //delete a debt
    const debtDelete = (debtid, userid, amount, paid) => {
        console.log('deleted')
        const axdebts = `http://localhost:8063/api/debts/delete/${debtid}`
        axios.delete(axdebts)
            .then(response => {
                console.log(response);
                { paid ? null : getUsers(userid, amount) }
            })
            .catch(error => { console.log(error) })
    }

    //pay a debt
    const debtPaid = (debtid, userid, amount) => {
        console.log('paid')
        const pay = { 'paid': true }
        const axdebts = `http://localhost:8063/api/debts/put/${debtid}`
        axios.put(axdebts, pay)
            .then(response => { console.log(response.data.data); })
            .catch(error => { console.log(error) })
        getUsers(userid, amount)
    }

    const updateBalance = (owed, userid, amount) => {
        const total = owed - amount
        console.log(total)
        const axPutUsers = `http://localhost:8063/api/users/put/${userid}`
        axios.put(axPutUsers, { 'total': total })
            .then(response => { console.log(response.data.data); })
            .catch(error => { console.log(error) })
    }
    return (
        <>
            <Button size="small" onClick={() => { debtPaid(debt.id, debt.userID, debt.amount) }}>Paid</Button>
            <Button size="small" onClick={() => { debtDelete(debt.id, debt.userID, debt.amount, debt.paid) }}>Delete</Button>
        </>
    )
}
