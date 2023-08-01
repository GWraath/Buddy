import React from 'react'

import {
    Button, Card, CardActions, CardContent, Grid, Typography
} from '@mui/material';

import axios from 'axios';

export default function HomeMapComponent(props) {


    //delete a debt
    const debtDelete = (delDebt, e) => {
        // e.preventDefault()
        const axdebts = `http://localhost:8063/api/debts/delete/${delDebt}`
        console.log(axdebts)
        axios.delete(axdebts)
            .then(response => { console.log(response); setDeleted(true) })
            .catch(error => { console.log(error) })
        window.location.reload()
    }

    //pay a debt
    const debtPaid = (payDebt, e) => {
        console.log(payDebt)
        const pay = { 'paid': true }
        const axdebts = `http://localhost:8063/api/debts/put/${payDebt}`
        console.log(axdebts)
        axios.put(axdebts, pay)
            .then(response => { console.log(response); e.preventDefault() })
            .catch(error => { console.log(error) })
        window.location.reload()
    }
    return (
        <div>
            <Grid container spacing={4}>
                {props.debts.map((debt, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                {props.currentUser && props.currentUser.UserAdmin ?
                                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                                        {debt.userID}
                                    </Typography> : null}
                                <Typography>
                                    ${debt.amount}
                                </Typography>
                                <Typography>
                                    Created on: <br></br>
                                    {debt.createdAt.slice(0, 10)}<br></br>
                                </Typography>
                                <Typography>
                                    Due on: <br></br>
                                    {debt.duedate.slice(0, 10)}<br></br>
                                </Typography>
                                <Typography>
                                    {debt.createdAt.slice(12, 19)}
                                </Typography>
                                <Typography>
                                    Paid on: <br></br>
                                    {debt.createdAt !== debt.updatedAt ?
                                        debt.updatedAt.slice(0, 10)
                                        : null}
                                </Typography>
                                <Typography>
                                    {debt.createdAt !== debt.updatedAt ?
                                        debt.updatedAt.slice(12, 19)
                                        : null}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {props.currentUser && props.currentUser.UserAdmin ? <Button size="small" onClick={() => { debtPaid(debt.id) }}>Paid</Button> : null}
                                {props.currentUser && props.currentUser.UserAdmin ? <Button size="small" onClick={() => { debtDelete(debt.id) }}>Delete</Button> : null}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
