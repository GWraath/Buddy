import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { UsersContext } from '../context/UserContext';
import { Troubleshoot } from '@mui/icons-material';

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

    const getInfo = (id) => {
        setUserId(id)
        axios.get(`http://localhost:8063/api/debts/userdebts/${id}`)
            .then(response => {
                console.log(response);
                getTotal(response.data.data)
            })
            .catch(error => { console.log(error) })
    }

    const getTotal = (transactions) => {
        const filteredArray = transactions.filter((transaction) => transaction.paid === false)
        const amountArray = filteredArray.map(({ amount }) => ({ amount }))
        const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum)
        console.log(sum)
    }

    const handleDateChange = (date) => {
        const year = date.$y 
        const month = date.$M
        const day = date.$D
        console.log(`${date.$D}/${date.$M}/${date.$y}`)
        const nDate = new Date(year,month,day)
        setDueDate(nDate)
      };


    const [amount, setAmount] = useState('')
    const [userId, setUserId] = useState('')

    const addToTotal = () => {
        const sum = total + amount
        parseInt(sum)
        console.log(total)
        transAdd(sum)
    }

    //adds a transaction
    const transAdd = (sum) => {
        const newTrans = { 'userID': userId, 'amount': amount, 'duedate': dueDate ,'total': sum, 'paid': false }
        const axTrans = `http://localhost:8063/api/debts/create`
        const axUsers = `http://localhost:8063/api/users/put/${userId}`
        axios.post(axTrans, newTrans)
            .then(response => { console.log(response.data); })
            .catch(error => { console.log(error) });
        axios.put(axUsers, { 'total': sum })
            .then(response => { console.log(response.data); })
            .catch(error => { console.log(error) });
        navigate('/');
    }

    return (
        <div className="plantInfo">
            Add a transaction
            <form>
                {/* <br></br><div><TextField type='text' onChange={(e) =>{ setUserId(e.target.value); setTimeout(getInfo(), 1000)}} label="User ID"></TextField></div> */}
                <br></br><div><TextField type='text' onChange={(e) =>{getInfo(e.target.value)}} label="User ID"></TextField></div>
                <Button onClick={() => setAmount(20)}>20</Button><br></br>
                <Button onClick={() => setAmount(50)}>50</Button><br></br>
                <Button onClick={() => setAmount(120)}>120</Button>
                <div><TextField type='number' onChange={e => setAmount(e.target.value)} label="Custom Amount"></TextField></div><br></br>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker required label={"Due date"} value={dueDate} onChange={handleDateChange} renderInput={(params) => <input {...params}/>} format='YYYY-MM-DD'/>
                </LocalizationProvider><br></br>
                <Button onClick={dueDate!=null?addToTotal:null}>Add</Button>
            </form>
        </div>
    )
}
