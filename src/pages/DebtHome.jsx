import * as React from 'react';
import { Button,CssBaseline, Box, Typography, 
  Container, Link } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import axios from 'axios';
import DebtPages from '../components/DebtPages';
import { DebtContext } from '../context/DebtContext';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
// import useLogic from '../hooks/useLogic';
import { useNavigate } from "react-router-dom";
import HomeMapComponent from '../components/transactions/HomeMapComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterComponent from '../components/transactions/FilterComponent';
import Axios from '../components/Axios';

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

export default function debtHome() {
  const { setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useContext(SearchContext);
  // const [state, dispatch] = useLogic()
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  // //get the debts
  // useEffect(() => {
  //   setPageType('debts')
  //   // const offset = debtsPerPage * (page-1)
  //   if (currentUser && currentUser.UserAdmin) {
  //     // const axDebts = `http://localhost:8063/api/debts/?limit=${debtsPerPage}&offset=${offset}`
  //     const axDebts = `http://localhost:8063/api/debts/`
  //     axios.get(axDebts)
  //       .then(response => { 
  //         // dispatch({ type: 'unpaid', reponse: response.data.data})
  //         setDebts(response.data.data) })
  //       .catch(error => { console.log(error) })
  //   }
  //   else {
  //     const axDebts = `http://localhost:8063/api/debts/userdebts/${currentUser.id}`
  //     axios.get(axDebts)
  //       .then(response => { console.log(response); setDebts(response.data.data)})
  //       .catch(error => { console.log(error) })
  //   }
  // }, [debts, currentUser])
  
  //if non user clicks delete, redirect to pna
  const doNotProceed = () => {
    if (currentUser === null) {
      navigate('/pna');
    }
  }
  //call the function
  doNotProceed()



  return (
    <>
      <CssBaseline />
      <main>
        {debts?<Axios setResponse={setDebts} call={'get'} type={'debts'}/>:null}
        <Container sx={{ py: 8 }} maxWidth="md">
          <FilterComponent debts={debts} currentUser={currentUser}/>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}
      </>
  );
}