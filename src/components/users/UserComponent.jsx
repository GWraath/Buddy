import * as React from 'react';
import {
  Button, CssBaseline, Box, Typography,
  Container, Link
} from '@mui/material';
import { useState} from 'react';
import DebtPages from '../DebtPages';

export default function FilterComponent(props) {
  const [page, setPage] = useState(1);

  const debts = props.debts
  const currentUser = props.currentUser

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <UserMapComponent users={users} currentUser={currentUser}/>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </>
  )
}
