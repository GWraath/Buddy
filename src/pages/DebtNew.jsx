import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { UsersContext } from '../App'

export const DebtNew = () => {
    // const [transactions, getTransactions] = useState([]);
    const { users } = useContext(UsersContext)
    const [total, setTotal] = useState(0);
    const [dueDate, setDueDate] = useState(null);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    //if a non user is trying to gain access, this will stop it.
    const doNotProceed = () => {
        if (currentUser === null) {
            navigate('/pna');
        }
    }
    doNotProceed()
    console.log(typeof(dueDate))

    const getInfo = () => {
        axios.get(`http://localhost:8063/api/debts/userdebts/${userId}`)
            .then(response => {
                console.log(response.data.data);
                getTotal(response.data.data)
            })
            .catch(error => { console.log(error) })
    }

    const getTotal = (transactions) => {
        const filteredArray = transactions.filter((transaction) => transaction.paid === false)
        const amountArray = filteredArray.map(({ amount }) => ({ amount }))
        const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
        console.log(sum)
        setTotal(sum)
    }

    const handleDateChange = (date) => {
        console.log(`${date.$D}/${date.$M}/${date.$y}`)
        const dDate = `${date.$D}/${date.$M}/${date.$y}`
        setDueDate(dDate)
      };


    const [amount, setAmount] = useState('')
    const [userId, setUserId] = useState('')

    const addToTotal = () => {
        const sum = total + amount
        parseInt(sum)
        transAdd(sum)
    }

    //adds a transaction
    const transAdd = (sum) => {
        console.log(total)
        const newTrans = { 'userID': userId, 'amount': amount, 'total': sum, 'paid': false }
        const axTrans = `http://localhost:8063/api/debts/create`
        const axUsers = `http://localhost:8063/api/users/put/${userId}`
        console.log(newTrans)
        axios.post(axTrans, newTrans)
            .then(response => { console.log(response.data); })
            .catch(error => { console.log(error) });
        axios.post(axUsers, { 'total': sum })
            .then(response => { console.log(response.data); })
            .catch(error => { console.log(error) });
        navigate('/transactions');
    }

    return (
        <div className="plantInfo">
            {/* <img alt='plant' width={400} height={400} src={imgUrl}></img> */}
            Add a transaction
            <form>
                {/* <br></br><div><TextField type='text' onChange={e => getTotal(e.target.value)} label="User ID"></TextField></div><br></br> */}
                <br></br><div><TextField type='text' onChange={e => setUserId(e.target.value)} label="User ID"></TextField></div>

                Total owed: {total} <br></br><Button onClick={getInfo}>Get Total</Button><br></br>

                <Button onClick={() => setAmount(20)}>20</Button><br></br>
                <Button onClick={() => setAmount(50)}>50</Button><br></br>
                <Button onClick={() => setAmount(120)}>120</Button>
                <div><TextField type='number' onChange={e => setAmount(e.target.value)} label="Custom Amount"></TextField></div><br></br>
                {/* Due on: <br></br> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label={"Due date"} value={dueDate} onChange={handleDateChange} renderInput={(params) => <input {...params}/>} format='DD/MM/YYYY'/>
                </LocalizationProvider><br></br>
                <Button onClick={addToTotal}>Add</Button>
            </form>
        </div>
    )
}
