import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PageNotAllowed() {
  const navigate = useNavigate();
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);
  
  useEffect(() => {
    if (currentUser)
    setTimeout(() => {
      navigate('/')
    }, 5000)
    else {
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
  },[])

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 15,
        pb: 4,
      }}
    >
      <div>
        Permissions not valid.<br/>
        {currentUser
        ?'Redirecting to the home page.'
        :'Redirecting to the login page.'}
      </div>
    </Box>
  );
}