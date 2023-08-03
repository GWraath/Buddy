import React, {useState} from 'react'

import {
    Button, Card, CardActions, CardContent, Grid, Typography
} from '@mui/material';

import axios from 'axios';
import OverdueComponent from './OverdueComponent';
import PaidComponent from './PaidComponent';

export default function HomeMapComponent(props) {
    const [calc, setCalc] = useState();

      //delete a debt
  const debtDelete = (debtid, userid) => {
    const axdebts = `http://localhost:8063/api/debts/delete/${debtid}`
    axios.delete(axdebts)
      .then(response => { console.log(response); })
      .catch(error => { console.log(error) })
  }

  //pay a debt
  const debtPaid = (debtid, userid, amount) => {
    console.log(userid)
    const pay = { 'paid': true }
    const axdebts = `http://localhost:8063/api/debts/put/${debtid}`
    const axGetUsers = `http://localhost:8063/api/users/${userid}`
    axios.put(axdebts, pay)
      .then(response => { console.log(response.data.data);})
      .catch(error => { console.log(error) })
    axios.get(axGetUsers)
      .then(response => {
        updateBalance(response.data.data, amount, userid)
    })
      .catch(error => { console.log(error) })
  }

  const updateBalance = (owed, amount, userid) => {
    console.log(owed)
    const total = owed - amount
    const axPutUsers = `http://localhost:8063/api/users/put/${userid}`
    // axios.put(axPutUsers, total)
    // .then(response => { console.log(response.data.data);})
    // .catch(error => { console.log(error) })
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
                                    Verified on: <br></br>
                                    {debt.createdAt.slice(0, 10)}<br></br>
                                </Typography>
                                {props.paid==true ? <PaidComponent debt={debt}/>:<OverdueComponent debt={debt}/>}
                            </CardContent>
                            <CardActions>
                                {props.currentUser && props.currentUser.UserAdmin ? <Button size="small" onClick={() => { debtPaid(debt.id, debt.userID, debt.amount) }}>Paid</Button> : null}
                                {props.currentUser && props.currentUser.UserAdmin ? <Button size="small" onClick={() => { debtDelete(debt.id, debt.userID) }}>Delete</Button> : null}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}