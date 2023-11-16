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
import ProtectedRoute from './ProtectedRoute';
import SeedFlower from '../pages/SeedFlower';


export default function AppRoutes() {

    return (
        <>
            <Routes>
                <Route path="/*" element={<Theme component={<PNF />} />}/>
                <Route path='/login' element={<Theme component={<NewLogin />} />} />
                <Route path='/debtnew' element={<ProtectedRoute><Theme component={<DebtNew />} /></ProtectedRoute>} />
                <Route path='/users' element={<ProtectedRoute><Theme component={<Users />} /></ProtectedRoute>} />
                <Route path='/userinfo' >
                    <Route path=':id' element={<ProtectedRoute><Theme component={<UserInfoEdit />} /></ProtectedRoute>} />
                </Route>
                <Route path='/ani' element={<ProtectedRoute><Theme component={<SeedFlower />} /></ProtectedRoute>} />
                <Route path='/chat' element={<ProtectedRoute><Theme component={<ChatApp />} /></ProtectedRoute>} />
                <Route path='/' element={<ProtectedRoute><Theme component={<DebtHome />} /></ProtectedRoute>} />
                <Route path='/profile' element={<ProtectedRoute><Theme component={<Profile />} /></ProtectedRoute>} />
                <Route path='/pna' element={<Theme component={<PageNotAllowed />} />} />
            </Routes>
        </>
    )
}
