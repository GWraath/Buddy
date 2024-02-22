import * as React from 'react';
import { Button,CssBaseline, Box, Typography, 
  Container, Link } from '@mui/material';
import { useEffect, useState, useContext, useReducer } from 'react';
import { PageTypeContext } from '../context/PageTypeContext'
import { SearchContext } from '../context/SearchContext'
import { useNavigate } from "react-router-dom";
import UserComponent from '../components/users/UserComponent';
import Axios from '../axios/Axios';
import { UsersContext } from '../context/UserContext';

export default function debtHome() {
  const { pageType, setPageType } = useContext(PageTypeContext);
  const { users, setUsers } = useContext(UsersContext);
  const { query } = useContext(SearchContext);
  // const [state, dispatch] = useLogic()
  // const debtsPerPage = 6;
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  let navigate = useNavigate();

  // //get the debts
  useEffect(() => {
    setPageType('users')
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
        {users && query.doISearch===false?<Axios setResponse={setUsers} call={'get'} type={'users'}/>:null}
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <UserComponent users={users} currentUser={currentUser}/>
        </Container>
      </main>
    </>
  );
}