import * as React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid,
  Box, Typography, Container, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useContext, useReducer } from 'react';
import axios from 'axios';
import DebtPages from '../components/DebtPages';
import { DebtContext } from '../App';
import { PageTypeContext } from '../App'
import { SearchContext } from '../App'
// import useLogic from '../hooks/useLogic';
import { useNavigate } from "react-router-dom";
import HomeMapComponent from '../components/HomeMapComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterComponent from '../components/FilterComponent';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// const cards = [response];

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A8E51'
    }
  },
});

export default function debtHome() {
  const { setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useContext(SearchContext);
  // const [state, dispatch] = useLogic()
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState([])
  const [isPaid, setIsPaid] = useState(false)
  const [total, setTotal] = useState(0)
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  //get the debts
  useEffect(() => {
    setPageType('debts')
    // const offset = debtsPerPage * (page-1)
    if (currentUser && currentUser.UserAdmin) {
      // const axDebts = `http://localhost:8063/api/debts/?limit=${debtsPerPage}&offset=${offset}`
      const axDebts = `http://localhost:8063/api/debts/`
      axios.get(axDebts)
        .then(response => { getTotal(response.data.data); 
          filterUnpaid(response.data.data); 
          // dispatch({ type: 'unpaid', reponse: response.data.data})
          setDebts(response.data.data) })
        .catch(error => { console.log(error) })
    }
    else {
      const axDebts = `http://localhost:8063/api/debts/userdebts/${currentUser.id}`
      axios.get(axDebts)
        .then(response => { console.log(response); setDebts(response.data.data); getTotal(response.data.data) })
        .catch(error => { console.log(error) })
    }
    // query!==''?()=>filterUnpaid(debts):null
  }, [page])


  const getTotal = (transactions) => {
    const filteredArray = transactions.filter((transaction) => transaction.paid === false)
    const amountArray = filteredArray.map(({ amount }) => ({ amount }))
    const sum = amountArray.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(sum)
    setTotal(sum)
  }

  const filterPaid = () => {
    const filteredArray = debts.filter((transaction) => transaction.paid === true)
    setFilter(filteredArray)
    getTotal(filteredArray)
    setIsPaid(true)
  }

  const filterUnpaid = (response) => {
    const filteredTransaction = response.filter((transaction) => transaction.paid === false)
    setFilter(filteredTransaction)
    getTotal(response)
    console.log()
    setIsPaid(false)
  }

  //if non user clicks delete, redirect to pna
  const doNotProceed = () => {
    if (currentUser === null) {
      navigate('/pna');
    }
  }
  //call the function
  doNotProceed()



  return (
    <ThemeProvider theme={theme}>
      <FilterComponent paid={isPaid} response={filter} currentUser={currentUser}/>
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
            {currentUser && currentUser.UserAdmin && isPaid || query !== '' ? <Button variant="outlined" id="buttonWhite" size="small" onClick={() => filterUnpaid(debts)}>Unpaid</Button> : <Button variant="outlined" id="buttonWhite" size="small" onClick={filterPaid}>Paid</Button>}
            <div><Button variant="outlined" id="buttonWhite" size="small"><RefreshIcon onClick={() => window.location.reload()} /></Button></div>
          </Typography>
          <HomeMapComponent debts={filter} currentUser={currentUser} />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          <DebtPages pageHandler={setPage} list={filter.length} />
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}