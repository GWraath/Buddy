import React, {useEffect} from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PageNotAllowed() {
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
        pt: 15,
        pb: 4,
      }}
    >
      <div>You do not posess the right permissions to be there.</div>
    </Box>
  );
}