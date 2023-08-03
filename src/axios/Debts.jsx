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
import HomeMapComponent from '../components/HomeMapComponent';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterComponent from '../components/FilterComponent';

export default function debtHome() {
  const { setPageType } = useContext(PageTypeContext);
  const { debts, setDebts } = useContext(DebtContext);
  const [page, setPage] = useState(1);
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
        .then(response => { 
        //   getTotal(response.data.data); 
        //   filterUnpaid(response.data.data); 
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

  return (
    <FilterComponent debts={debts} currentUser={currentUser}/>
  )
}
