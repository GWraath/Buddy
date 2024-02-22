import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from '@mui/material/';
import { useNavigate } from "react-router-dom";

export const UserTotalInfo = () => {
    const params = useParams();
    const userid = params.userid
    // state and useeffect

    const [user, setUser] = useState([]);
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    let navigate = useNavigate();

    const doNotProceed = () => {
        console.log(currentUser)
        if (currentUser===null){
            navigate('/pna');
        }
      }
    //description field - make more user friendly
    doNotProceed()
    
    //gets the users
    useEffect(()=> {
        console.log('Fetching user information')
        axios.get('http://localhost:8063/api/users/'+userid)
        .then(response=> {console.log(response.data.data[0]); setUser(response.data.data[0]);})
        .catch(error => {console.log(error)})
        },[userid])

    const name = <div><b>First name:</b><br></br> {user.name}</div>
    const username = <div><b>Username:</b><br></br> {user.username}</div>

    //updates the users
    const userUpdate = () => {
        const updateUser={ 'FName':FName, 'totalOwed':totalOwed}
        const axUsers=`http://localhost:8063/api/users/`+userid
            console.log(axUsers)
            axios.put(axUsers, updateUser)
            .then(response=> {console.log(response); setUpdated(response.data); navigate('/users');})
            .catch(error => {console.log(error)});
        }

    return (
        <div className="userInfo">
        {user.id ?
        <>
        <h3>{user.FName}</h3>
        <img alt='plant' width={400} height={400}  src={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}></img>
        {/* <div><Button variant="contained" onClick={()=> dispatch({type: 'hideOrShow'})}>{state? 'Show User Information':'Hide User Information'}</Button></div> <br></br> */}
        {name} <br></br>
        {username}<br></br>
        </>
        : <p> User: {user.FName} not found</p>
        }
    </div>             
    )
}
