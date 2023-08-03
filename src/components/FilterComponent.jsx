import * as React from 'react';
import { Button,CssBaseline, Box, Typography, 
  Container, Link } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import axios from 'axios';
import DebtPages from '../components/DebtPages';
import Copyright from './Copyright';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from "react-router-dom";
import HomeMapComponent from '../components/HomeMapComponent';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function FilterComponent(props) {
    const [filter, setFilter] = useState([])
    const [isPaid, setIsPaid] = useState(false)
    const [total, setTotal] = useState(0)
    const { query } = useContext(SearchContext);
  const [page, setPage] = useState(1);

    const debts = props.debts
    const currentUser = props.currentUser
    
    const filterPaid = () => {
        const filteredArray = debts.filter((transaction) => transaction.paid === true)
        console.log(filteredArray)
        setFilter(filteredArray)
        // getTotal(filteredArray)
        setIsPaid(true)
      }
    
      const filterUnpaid = () => {
        const filteredTransaction = debts.filter((transaction) => transaction.paid === false)
        setFilter(filteredTransaction)
        // getTotal(response)
        console.log()
        setIsPaid(false)
      }

      const getTotal = (transactions) => {
        const filteredArray = transactions.filter((transaction) => transaction.paid === false)
        const amountArray = filteredArray.map(({ amount }) => ({ amount }))
        const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
        console.log(sum)
        setTotal(sum)
      }

  return (
    <>
<CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Transactions for {currentUser.name}<br></br>
            Amount owed: ${total}
            {currentUser && currentUser.UserAdmin ? <div><Button variant="outlined" id="buttonWhite" size="small" href={"/debtnew/"}>Add a debt</Button></div> : null}
            {/* {currentUser && currentUser.UserAdmin && isPaid || query !== '' ? <Button variant="outlined" id="buttonWhite" size="small" onClick={() => filterUnpaid(debts)}>Unpaid</Button> : <Button variant="outlined" id="buttonWhite" size="small" onClick={filterPaid}>Paid</Button>} */}
            {currentUser && currentUser.UserAdmin && isPaid || query !== '' ? <Button variant="outlined" id="buttonWhite" size="small" onClick={() => setIsPaid(false)}>Unpaid</Button> : <Button variant="outlined" id="buttonWhite" size="small" onClick={() => setIsPaid(true)}>Paid</Button>}
            <div><Button variant="outlined" id="buttonWhite" size="small"><RefreshIcon onClick={() => window.location.reload()} /></Button></div>
          </Typography>
          <HomeMapComponent debts={filter} currentUser={currentUser} paid={isPaid}/>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          <DebtPages pageHandler={setPage} list={filter.length} />
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
      </>
  )
}
