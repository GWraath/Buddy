import * as React from 'react';
import {
  Button, CssBaseline, Typography,
  Container
} from '@mui/material';
import { useState } from 'react';
import DebtPages from '../DebtPages';
import UserMapComponent from './UserMapComponent';

export default function UserComponent(props) {
  const [page, setPage] = useState(1);

  const users = props.users
  const currentUser = props.currentUser

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentUser && currentUser.UserAdmin ? <Button variant='outlined' size="small" href={"/usernew/"}>Add a user</Button> : null}
          </Typography>
          <UserMapComponent users={users} currentUser={currentUser} />
        </Container>
      </main>
      <Typography variant="h6" align="center" gutterBottom>
        <DebtPages pageHandler={setPage} list={users.length} />
      </Typography>
    </>
  )
}
