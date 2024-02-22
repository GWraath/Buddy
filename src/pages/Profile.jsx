import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField, Box } from '@mui/material'
import { useNavigate } from "react-router-dom";
import Page from '../components/profile/Page';
import Axios from '../axios/Axios';

export default function Profile() {
  let navigate = useNavigate();
  const [count, setCount] = useState(false)

  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  // state and useeffect

  //gets user profile
  useEffect(() => {
    axios.get('http://localhost:8063/api/users/' + currentUser.id)
      .then(response => { console.log(response.data); })
      .catch(error => { console.log(error) })
  }, [currentUser.id])

  // const [name, setName] = useState('')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [vPassword, setVPassword] = useState('')

  // //updates the users
  // const userUpdate = () => {
  //   if (password === vPassword) {
  //     const updateUser = { 'name': name, 'username': username, 'password': password }
  //     const axUsers = `http://localhost:8063/api/users/put/` + currentUser.id
  //     axios.put(axUsers, updateUser)
  //       .then(response => {
  //         if (response.data.result !== 200) {
  //           alert(response.data.message)
  //         } else { navigate('/') }
  //       })
  //       .catch(error => { console.log(error) });
  //   }
  //   else if (password !== vPassword) {
  //     alert('These passwords do not match.')
  //   }
  // }

  // logs user out
  const loggingOff = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 15,
          pb: 4,
        }}
      >
        {count === 0 ? <Axios call={'get'} type={'users'} id={currentUser.id} onChange={() => setCount(1)}/> : null}
        <Button onClick={loggingOff}>Log out</Button>
        <Page currentUser={currentUser} />
      </Box>
    </>
  )
}

