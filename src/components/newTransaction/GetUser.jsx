import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import Axios from '../../axios/Axios';
import Inputs from './Inputs';

export default function GetUser(props) {
  const [userId, setUserId] = useState(null);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const users = props.users;
  const userOptions = users.map((user) => ({
    label: user.id.toString(), // Convert the ID to a string
    value: user.id, // Keep the ID as a number
  }));

  const userObj = users.find(user => user.id === userId);

  return (
    <>
    <div>{user?userObj.name:"Add a transaction"}</div>
    <br/>
    <Autocomplete
        disablePortal
        id="User ID"
        onChange={(e, selectedOption) => {
          setUserId(selectedOption ? selectedOption.value : null);
          setCount(count + 1);
        }}
        options={userOptions}
        getOptionLabel={(option) => option.label}
        sx={{ width: 195, margin: '0 auto', textAlign: 'center' }}
        renderInput={(params) => <TextField {...params} sx={{ textAlign: 'center' }}  label="User ID" />}
      /><br/>
      {userId && count===1 ? (
        <Axios setResponse={setUser} call={'get'} type={'debts'} id={userId} />
      ) : null}
      <Inputs user={user} userId={userId}/>
    </>
  );
}
