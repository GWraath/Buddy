import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField, Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { UsersContext } from '../context/UserContext';
import dayjs from 'dayjs'; // Import Day.js
import { Troubleshoot } from '@mui/icons-material';
import Axios from '../axios/Axios';
import GetUser from '../components/newTransaction/GetUser';
import GetUsers from '../components/newTransaction/GetUsers';

export const DebtNew = () => {
    const { users } = useContext(UsersContext)
    const [total, setTotal] = useState(0);
    const [dueDate, setDueDate] = useState(null);
    const [amount, setAmount] = useState(0)
    // const [newTrans, setNewTrans] = useState(0)
    const [userId, setUserId] = useState('')
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

    // {newTrans? <Axios object={newTrans} call={'post'} type={'debts'} id={'3'}/> : null}

    // const getInfo = (id) => {
    //     setUserId(id)
    //     axios.get(`http://localhost:8063/api/debts/userdebts/${id}`)
    //         .then(response => {
    //             console.log(response);
    //             getTotal(response.data.data)
    //         })
    //         .catch(error => { console.log(error) })
    // }

    const getTotal = (transactions) => {
        const filteredArray = transactions.filter((transaction) => transaction.paid === false)
        const amountArray = filteredArray.map(({ amount }) => ({ amount }))
        const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
        setTotal(sum)
        console.log(sum)
    }
    //change and set the date to a usable format
    const handleDateChange = (date) => {
        //define the date
        const selectedDate = new Date(date)
        //set the date
        setDueDate(selectedDate);
    };

    const addToTotal = () => {
        const sum = total + amount
        parseInt(sum)
        console.log(total)
        transAdd(sum)
    }

    return (

        <div className="plantInfo">
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 15,
                    pb: 4,
                }}
            ></Box>
            <form>
                <GetUsers />
            </form>
        </div>
    )
}
