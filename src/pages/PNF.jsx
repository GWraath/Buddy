import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  })
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 15
        ,
        pb: 4,
      }}
    >
      <div>Page not found</div>
    </Box>


  );
}