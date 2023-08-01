import * as React from 'react';
import {
  Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Box, Typography,
  Container, Link
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
// import PlantPages from '../DebtPages';
import { PageTypeContext } from '../context/PageTypeContext'
import { UsersContext } from '../context/UserContext';
import { DebtContext } from '../context/DebtContext';
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    const userAmounts = debts.map(({ userID, amount }) => ({ userID, amount }))
    // const matchAmounts = userAmounts.filter(usr=> usr.userID)
    const arrayOfArrays = []
    for (let i = 2; i < users.length + 1; i++) {
      arrayOfArrays.push(userAmounts.filter(usr => usr.userID === i))
    }
    const filteredArray = arrayOfArrays.map(({ amount }) => ({ amount }))
    // for (let i = 0; i <8; i++){

    // }
    // const sum = arrayOfArrays[0].reduce((acc, cur) => acc + cur.value, 0);
    // arrayOfArrays.map()
    // const matchTrans = userAmounts.filter(usr => usr.userID)
    console.log(arrayOfArrays[1])
    console.log(filteredArray)
  })

  // console.log(debts)

  //deletes the user
  const userDelete = (delUser) => {
    const axPlants = `http://localhost:8063/api/users/` + delUser
    axios.delete(axPlants)
      .then(response => { console.log(response); setDeleted(true) })
      .catch(error => { console.log(error) })
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
            {currentUser ? <Button variant='outlined' size="small" href={"/usernew/"}>Add a user</Button> : null}
          </Typography>
          <Grid container spacing={4}>
            {users.map((user, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {user.id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {user.name}
                    </Typography>
                    <Typography>
                      {user.total}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={"/userinfo/" + user.id}>View</Button>
                    <Button size="small" onClick={() => { userDelete(user.id) }}>Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          {/* <PlantPages pageHandler={setPage} list={userList.length} /> */}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Choose a page to explore more!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </>
  );
}