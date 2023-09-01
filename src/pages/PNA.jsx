import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PageNotAllowed(props) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (props.currentUser)
    setTimeout(() => {
      navigate('/')
    }, 5000)
    else {
      setTimeout(() => {
        navigate('/login')
      }, 5000)
    }
  })

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
        {props.currentUser
        ?'Redirecting to the home page.'
        :'Redirecting to the login page.'}
      </div>
    </Box>
  );
}