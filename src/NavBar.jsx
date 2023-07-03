import React from 'react'
import {NavLink} from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Search from './Search';



const Navbar=()=> {
  const users = <NavLink id="link" to='/users' exact="true" forcerefresh="true">Users</NavLink>
  const debts = <NavLink id="link" to='/transactions' exact="true" forcerefresh="true">Transactions</NavLink>
  //gets the logged in user
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  return (
    <>
    <AppBar position="sticky" className='AppBar' sx={{backgroundColor: '#4A8E51'}}>
      <Typography variant="h3" id="plantica">
        Buddy
      </Typography>
      <Toolbar id="tool">          
        <Typography variant="h6" color="inherit" noWrap id="toolItems">
          {currentUser ? debts : null}
          {currentUser && currentUser.UserAdmin ? users : null}
          {currentUser ? <NavLink id="link" to='/profile'>{currentUser.username}</NavLink> : <NavLink id="link" to='/' >Login</NavLink>}
        </Typography>
      </Toolbar>
      <Typography variant="h6" id="toolSearch">
      {currentUser && currentUser.UserAdmin ? <Search/> : null}
      </Typography>
    </AppBar>
    </>
  )
}

export default Navbar