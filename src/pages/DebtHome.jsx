import * as React from 'react';
import { Button,CssBaseline, Box, Typography, 
  Container, Link } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { DebtContext } from '../context/DebtContext';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from "react-router-dom";
import FilterComponent from '../components/transactions/FilterComponent';
import Axios from '../axios/Axios';

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
  const { pageType, setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const { query } = useContext(SearchContext);
  // const [state, dispatch] = useLogic()
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  // //get the debts
  useEffect(() => {
    setPageType('debts')
}, [])
  
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
        {debts && query===''?<Axios setResponse={setDebts} call={'get'} type={'debts'}/>:null}
        <Container sx={{ py: 8 }} maxWidth="md">
          <FilterComponent debts={debts} currentUser={currentUser}/>
        </Container>
      </main>
      </>
  );
}