import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import {Button} from '@mui/material/';
import { useNavigate } from "react-router-dom";
import useLogic from './useLogic';

export const UserTotalInfo = () => {
    const params = useParams();
    const userid = params.userid
    // state and useeffect

    const [state, dispatch] = useLogic()

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
        axios.get('http://localhost:8080/api/users/'+userid)
        .then(response=> {console.log(response.data); setUser(response.data[0]);})
        .catch(error => {console.log(error)})
        },[userid])

    const FName = <div><b>First name:</b><br></br> {user.FName}</div>
    const totalOwed = <div><b>Toal Owed:</b><br></br> {user.totalOwed}</div>

    //updates the users
    const userUpdate = () => {
        const updateUser={ 'FName':FName, 'totalOwed':totalOwed}
        const axUsers=`http://localhost:8080/api/users/`+userid
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
        <div><Button variant="contained" onClick={()=> dispatch({type: 'hideOrShow'})}>{state? 'Show User Information':'Hide User Information'}</Button></div> <br></br>
        {!state ? FName : null} <br></br>
        {!state ? Owed : null}<br></br>
        </>
        : <p> User: {user.FName} not found</p>
        }
    </div>             
    )
}
