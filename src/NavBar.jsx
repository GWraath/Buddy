import { React, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Search from './Search';
import ConditionalComponent from './experimental/ConditionalComponent';
import HeaderComponent from './components/HeaderComponent';



const Navbar = () => {
  const location = useLocation();
  const users = <NavLink id="link" to='/users' exact="true" forcerefresh="true">Users</NavLink>
  const debts = <NavLink id="link" to='/' exact="true" forcerefresh="true">Transactions</NavLink>
  const clear = <NavLink onClick={() => setDoISearch(!doISearch)} outline='none' ><ClearIcon id="link" sx={{ mr: 2 }} /></NavLink>
  const search = <NavLink onClick={() => setDoISearch(!doISearch)} outline='none' ><SearchIcon id="link" sx={{ mr: 2 }} /></NavLink>

  //gets the logged in user
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  const pathname = location.pathname
  const [doISearch, setDoISearch] = useState(false)

  return (
    <>
      <AppBar position="sticky" className='AppBar' sx={{ backgroundColor: '#4A8E51' }}>
        <Toolbar id="tool">
          <Typography variant="h6" color="inherit" noWrap id="toolItems">
            {currentUser && currentUser.UserAdmin && pathname !== '/users' ? users : null}
            {currentUser && pathname !== '/' ? debts : null}
            {pathname == '/profile' || pathname == '/login' ? null : <NavLink id="link" to='/profile'>{currentUser.username}</NavLink>}
            {doISearch ? clear : search}
          </Typography>
        </Toolbar>
        <Typography variant="h6" id="toolSearch">
          {currentUser && currentUser.UserAdmin && doISearch ? <Search id="link" /> : null}
        </Typography>
      </AppBar>
      <HeaderComponent />
    </>
  )
  window.reload
}

export default Navbar