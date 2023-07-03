import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { DebtContext } from './App'


export const UserInfoEdit = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [vPassword, setVPassword] = useState('')
    const [total, setTotal] = useState([])

    const params = useParams();
    const userid = params.usereditid
    // state and useeffect

    const [user, setUser] = useState({});
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    //if a non admin is trying to gain access, this will stop it.
    const doNotProceed = () => {
        if (currentUser === null || currentUser.UserAdmin === 0) {
            navigate('/pna');
        }
    }
    //description field - make more user friendly
    doNotProceed()

    //gets users
    useEffect(() => {
        console.log(`Fetching ${userid} information`)
        axios.get('http://localhost:8063/api/users/' + userid)
            .then(response => { console.log(response.data); setUser(response.data.data[0]); })
            .catch(error => { console.log(error) })
    }, [userid])

    //gets debts
    useEffect(() => {
        console.log(`Fetching ${userid} information`)
        axios.get('http://localhost:8063/api/debts/userdebts/' + userid)
            .then(response => { console.log(response.data.data); })
            .catch(error => { console.log(error) })
    }, [userid])

    //updates the users
    const userUpdate = () => {
        if (password === vPassword) {
            const updateUser = { 'name': name, 'username': username, 'password': password }
            const axUsers = `http://localhost:8063/api/users/put/` + userid
            axios.put(axUsers, updateUser)
                .then(response => { console.log(response); navigate('/users'); })
                .catch(error => { console.log(error) });
        }
        else if (password === user.password) {
            alert(`Choose a different password.`)
        }
        else {
            alert('These passwords do not match.')
        }
    }

    return (
        <div className="userInfo">
            {userid ?
                <>
                    <h3>{userid}</h3>
                    <img alt='user' width={400} height={400} src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
                    <form>
                        <div><TextField type='text' key={user.name} onChange={e => setName(e.target.value)} defaultValue={user.name} label="First Name"></TextField></div>
                        <div><TextField type='text' key={user.username} onChange={e => setUsername(e.target.value)} defaultValue={user.username} label="Username"></TextField></div>
                        <div><TextField type='password' onChange={e => setPassword(e.target.value)} defaultValue={user.password} label="Password"></TextField></div>
                        <div><TextField type='password' onChange={e => setVPassword(e.target.value)} label="Password"></TextField></div>

                        <Button onClick={userUpdate}>Update</Button>
                    </form>
                </>
                : <p> User: {userid} not found</p>
            }
        </div>
    )
}
