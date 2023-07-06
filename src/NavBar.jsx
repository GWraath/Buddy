import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Search from './Search';
import ConditionalComponent from './experimental/ConditionalComponent';
import HeaderComponent from './components/HeaderComponent';



const Navbar = () => {
  const users = <NavLink id="link" to='/users' exact="true" forcerefresh="true">Users</NavLink>
  const debts = <NavLink id="link" to='/transactions' exact="true" forcerefresh="true">Transactions</NavLink>
  const clear = <Button onClick={() => setDoISearch(!doISearch)}><ClearIcon id="link" sx={{ mr: 2 }} /></Button>
  const search = <Button onClick={() => setDoISearch(!doISearch)}><SearchIcon id="link" sx={{ mr: 2 }} /></Button>

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
            {currentUser && pathname === '/users' ? debts : null}
            {currentUser && currentUser.UserAdmin && pathname === '/transactions' ? users : null}
            {currentUser && pathname === '/profile' ? debts : null}
            {currentUser && pathname === '/profile' ? users : null}
            {currentUser && pathname === '/profile' ? null : <NavLink id="link" to='/profile'>{currentUser.username}</NavLink>}
            {doISearch ? clear : search}
            {/* <ConditionalComponent prop={doISearch} true={clear} false={search}/>  */}
          </Typography>
        </Toolbar>
        <Typography variant="h6" id="toolSearch">
          {currentUser && currentUser.UserAdmin && doISearch ? <Search /> : null}
        </Typography>
      </AppBar>
      <HeaderComponent/>
    </>
  )
window.reload
}

export default Navbar