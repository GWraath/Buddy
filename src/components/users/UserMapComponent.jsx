import React from 'react'
import {
    Card, CardActions, CardContent, Grid, Typography, CardMedia, Button
} from '@mui/material';
import ViewDeleteComponent from './ViewDeleteComponent';


export default function UserMapComponent(props) {
  return (
    <div>
        <Grid container spacing={4}>
            {props.users.map((user, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'https://cdn-icons-png.flaticon.com/512/1946/1946429.png'}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {user.id}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2" className='capitalise'>
                      {user.name}
                    </Typography>
                    <Typography>
                      ${user.total}
                    </Typography>
                  </CardContent>
                  <ViewDeleteComponent user={user} />
                </Card>
              </Grid>
            ))}
          </Grid>
    </div>
  )
}
