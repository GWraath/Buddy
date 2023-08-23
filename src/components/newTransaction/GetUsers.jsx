import React, {useState, useEffect} from 'react'
import Axios from '../../axios/Axios'
import GetUser from './GetUser';
export default function GetUsers() {
    const [count, setCount] = useState(0)
    const [users, setUsers] = useState(null);
  return (
    <div>
        {count === 0 ? <Axios setResponse={setUsers} call={'get'} type={'users'} setCount={setCount} count={count} /> : null}
        {users ? <GetUser users={users}/> : null}
    </div>
  )
}
