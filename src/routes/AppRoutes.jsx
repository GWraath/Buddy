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
import ChatApp from '../pages/Chat';


export default function AppRoutes() {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    return (
        <>
            <Routes>
                <Route path="/*" element={<Theme component={<PNF currentUser={currentUser}/>} />}/>
                <Route path='/login' element={<Theme component={<NewLogin />} />} />
                <Route path='/debtnew' element={<>{currentUser?<Theme component={<DebtNew />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                <Route path='/users' element={<>{currentUser?<Theme component={<Users />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                <Route path='/userinfo' >
                    <Route path=':id' element={<>{currentUser?<Theme component={<UserInfoEdit />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                </Route>
                <Route path='/chat' element={<>{currentUser?<Theme component={<ChatApp />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                <Route path='/' element={<>{currentUser?<Theme component={<DebtHome />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                <Route path='/profile' element={<>{currentUser?<Theme component={<Profile />} />:<Theme component={<PageNotAllowed currentUser={currentUser}/>} />}</>} />
                <Route path='/pna' element={<Theme component={<PageNotAllowed />} />} />
            </Routes>
        </>
    )
}
