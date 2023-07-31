import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";

export default function Profile() {
  let navigate = useNavigate();

  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  // state and useeffect

  const [user, setUser] = useState([]);
  const [updated, setUpdated] = useState(false);

  //gets user profile
  useEffect(() => {
    console.log(`Fetching ${currentUser}'s information`)
    axios.get('http://localhost:8063/api/users/' + currentUser.id)
      .then(response => { console.log(response.data); setUser(response.data[0]); })
      .catch(error => { console.log(error) })
  }, [currentUser.id, updated])

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //updates the users
  const userUpdate = () => {
    const updateUser = { 'name': name, 'username': username, 'password': password }
    const axUsers = `http://localhost:8063/api/users/put/` + currentUser.id
    console.log(axUsers)
    axios.put(axUsers, updateUser)
      .then(response => { console.log(response); setUpdated(response.data); })
      .catch(error => { console.log(error) });
  }

  // logs user out
  const loggingOff = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }
  return (
    <>
      <Button onClick={loggingOff}>Log out</Button>
      <div className="userInfo">
        {currentUser.username ?
          <>
            <h3>{currentUser.name}</h3>
            <h5>You currently owe: {currentUser.totalOwed}</h5>
            <form>
              <div><TextField type='text' onChange={e => setName(e.target.value)} defaultValue={currentUser.name} label="Name"></TextField></div><br></br>
              <div><TextField type='text' onChange={e => setUsername(e.target.value)} defaultValue={currentUser.username} label="Username"></TextField></div><br></br>
              <div><TextField type='password' onChange={e => setPassword(e.target.value)} label="Password"></TextField></div><br></br>
              <Button onClick={userUpdate}>Update</Button>
            </form>
          </>
          : <p> User: {currentUser.username} not found</p>
        }
      </div>
    </>
  )
}

