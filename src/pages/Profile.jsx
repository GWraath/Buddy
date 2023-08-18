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

  //gets user profile
  useEffect(() => {
    console.log(`Fetching ${currentUser}'s information`)
    axios.get('http://localhost:8063/api/users/' + currentUser.id)
      .then(response => { console.log(response.data); })
      .catch(error => { console.log(error) })
  }, [currentUser.id])

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [vPassword, setVPassword] = useState('')

  //updates the users
  const userUpdate = () => {
    console.log('Password:', password, vPassword);
        const uppercaseLetters = password.match(/[A-Z]/g)
        const numbersNeeded = password.match(/\d/g)
        if (password === vPassword) {
            if(password.length < 4) {
                alert('Password must be at least 4 characters long.');
            }
            else if (password === currentUser.password) {
              alert(`Can not match existing password.`)
            }
            else if(uppercaseLetters==null || uppercaseLetters.length < 1) {
                alert('Password must have at least 1 uppercase character.');
            }
            else if (numbersNeeded==null || numbersNeeded.length < 1) {
                alert('Password must include 1 number.');
            }            
            else {
                const updateUser = { 'name': name, 'username': username, 'password': password }
                console.log(updateUser)
                console.log(currentUser.id)
                const axUsers = `http://localhost:8063/api/users/put/` + currentUser.id
                axios.put(axUsers, updateUser)
                    .then(response => { console.log(response);  })
                    .catch(error => { console.log(error) });
            }
        }
        else if (password !== vPassword) {
            alert('These passwords do not match.')
        }
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
            <h5>You currently owe: {currentUser.total}</h5>
            <form>
              <div><TextField type='text' onChange={e => setName(e.target.value)} defaultValue={currentUser.name} label="Name"></TextField></div><br></br>
              <div><TextField type='text' onChange={e => setUsername(e.target.value)} defaultValue={currentUser.username} label="Username"></TextField></div><br></br>
              <div><TextField type='password' onChange={e => setPassword(e.target.value)} label="Password"></TextField></div><br></br>
              <div><TextField type='password' onChange={e => setVPassword(e.target.value)} label="Verify Password"></TextField></div><br></br>
              <Button onClick={userUpdate}>Update</Button>
            </form>
          </>
          : <p> User: {currentUser.username} not found</p>
        }
      </div>
    </>
  )
}

