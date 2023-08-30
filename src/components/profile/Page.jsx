import React, {useState} from 'react'
import { Button, TextField } from '@mui/material'
import Axios from '../../axios/Axios'

export default function Page(props) {
    const [name, setName] = useState(props.currentUser.name)
    const [username, setUsername] = useState(props.currentUser.username)
    const [password, setPassword] = useState('')
    const [vPassword, setVPassword] = useState('')
    const [count, setCount] = useState(false)

    const currentUser = props.currentUser
    const updateUser = { 'name': name, 'username': username, 'password': password }

  return (
    <>
        <div className="userInfo">
          {currentUser.username ?
            <>
              <h3>{currentUser.name}</h3>
              <h5>You currently owe: ${currentUser.total}</h5>
              <form>
                <div><TextField type='text' onChange={e => setName(e.target.value)} defaultValue={currentUser.name} label="Name"></TextField></div><br></br>
                <div><TextField type='text' onChange={e => setUsername(e.target.value)} defaultValue={currentUser.username} label="Username"></TextField></div><br></br>
                <div><TextField type='password' onChange={e => setPassword(e.target.value)} label="Password"></TextField></div><br></br>
                <div><TextField type='password' onChange={e => setVPassword(e.target.value)} label="Verify Password"></TextField></div><br></br>
                <Button onClick={password === vPassword ?()=>setCount(count+1):()=>alert('These passwords do not match.')}>Update</Button>
                {count===1 ? <Axios call={'put'} type={'users'} id={currentUser.id} object={updateUser} setCount={setCount} count={count}/> : null}
              </form>
            </>
            : <p> User: {currentUser.username} not found</p>
          }
          </div>
          </>
  )
}
