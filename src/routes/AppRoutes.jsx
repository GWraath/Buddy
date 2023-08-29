import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import PageNotAllowed from '../pages/PNA';
import { DebtNew } from '../pages/DebtNew';
import NewLogin from '../pages/NewLogin';
import DebtHome from '../pages/DebtHome'
import PNF from '../pages/PNF';
import Theme from '../theme/Theme';
import { UserInfoEdit } from '../pages/UserTotalEdit';
import Axios from '../axios/Axios';
import ChatApp from '../pages/Chat';
import Redirect from '../components/Redirect';


export default function AppRoutes() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    return (
        <>
            <Routes>
                <Route path="/*" element={<>{currentUser?<Theme component={<PNF />} />:<Theme component={<Redirect />} />}</>}/>
                <Route path='/login' element={<Theme component={<NewLogin />} />} />
                <Route path='/debtnew' element={<Theme component={<DebtNew />} />} />
                <Route path='/users' element={<Theme component={<Users />} />} />
                <Route path='/userinfo' >
                    <Route path=':id' element={<Theme component={<UserInfoEdit />} />} />
                </Route>
                <Route path='/chat' element={<Theme component={<ChatApp />} />} />
                <Route path='/axios' element={<Axios />} />
                <Route path='/' element={<Theme component={<DebtHome />} />} />
                <Route path='/profile' element={<Theme component={<Profile />} />} />
                <Route path='/pna' element={<Theme component={<PageNotAllowed />} />} />
                <Route path='*' element={<Theme component={<PNF />} />} />
            </Routes>
        </>
    )
}
