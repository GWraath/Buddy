import './App.css';
import React, { useState, useRoutes } from 'react';
import {Outlet} from 'react-router-dom';
import DebtHome from './DebtHome'
import PNF from './PNF';
import { Routes, Route, Router } from 'react-router-dom';
import Navbar from './NavBar';
import Users from './Users';
import { UserTotalInfo } from './UserTotalInfo'
import Login from './Login';
import { Profile } from './Profile';
import { UserInfoEdit } from './UserTotalEdit';
import PageNotAllowed from './PNA';
import Theme from './Theme';
import { DebtNew } from './DebtNew';
import NewLogin from './NewLogin';

export const DebtContext = React.createContext();
export const UsersContext = React.createContext();
export const CurrentUserContext = React.createContext();
export const PageTypeContext = React.createContext();

function App() {
  const [debts, setDebts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [pageType, setPageType] = useState('')

  return (
    <DebtContext.Provider value={{ debts, setDebts }}>
      <UsersContext.Provider value={{ users, setUsers }}>
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <PageTypeContext.Provider value={{ pageType, setPageType }}>
              <div>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Theme component={<Login/>}/>}/>
                  <Route path='/debtnew' element={<Theme component={<DebtNew/>}/>} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/userinfo' element={<Theme component={<Outlet/>}/>}>
                    <Route path=':userid' element={<UserTotalInfo />} />
                  </Route>
                  <Route path='/userinfoedit' element={<Theme component={<Outlet/>}/>}>
                    <Route path=':usereditid' element={<UserInfoEdit />} />
                  </Route>
                  <Route path='/transactions' element={<Theme component={<DebtHome/>}/>} />
                  <Route path='/profile' element={<Theme component={<Profile/>}/>} />
                  <Route path='/pna' element={<Theme component={<PageNotAllowed/>}/>} />
                  <Route path='*' element={<Theme component={<PNF/>}/>}/>
                </Routes>
              </div>
          </PageTypeContext.Provider>
        </CurrentUserContext.Provider>
      </UsersContext.Provider>
    </DebtContext.Provider>
  );
}

export default App;
