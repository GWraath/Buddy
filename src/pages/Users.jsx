import * as React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Box, Typography,
  Container, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { PageTypeContext } from '../context/PageTypeContext'
import { UsersContext } from '../context/UserContext';
import { DebtContext } from '../context/DebtContext';
import { useNavigate } from "react-router-dom";
import DebtPages from '../components/DebtPages';
import UserComponent from '../components/users/UserComponent';

export default function Users() {
  const { setPageType } = useContext(PageTypeContext);
  const { users, setUsers } = useContext(UsersContext)
  const { debts } = useContext(DebtContext)
  const [page, setPage] = useState(1);
  const [deleted, setDeleted] = useState(false);
  const [userList, setUserList] = useState(0)
  const UsersPerPage = 6;
  let navigate = useNavigate();

  //get and set the current logged in user
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  //if a non admin is trying to gain access, this will stop it.
  const doNotProceed = () => {
    if (currentUser === null || currentUser.UserAdmin === 0) {
      navigate('/pna');
    }
  }
  doNotProceed()

  //gets users
  useEffect(() => {
    setPageType('users')
    const offset = UsersPerPage * (page - 1)
    // const axUsers=`http://localhost:8080/api/users?limit=${UsersPerPage}&offset=${offset}`
    const axUsers = `http://localhost:8063/api/users/`
    axios.get(axUsers)
      .then(response => { setUsers(response.data.data) })
      .catch(error => { console.log(error) })
  }, [page, deleted])

  useEffect(() => {
    axios.get(`http://localhost:8063/api/users`)
      .then(response => { setUserList(response.data) })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <UserComponent users={users} currentUser={currentUser}/>
          
          {/* <UserMapComponent users={users} /> */}
        </Container>
      </main>
    </>
  );
}