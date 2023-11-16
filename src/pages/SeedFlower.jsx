import React from 'react'
import '../SeedFlower.css'
import { Container, Box } from '@mui/material'

export default function SeedFlower() {
  return (
    <>
    <Container sx={{ py: 8, my: '400px', justifyContent: 'center', alignItems:'center', display:'flex'}} maxWidth="md">
    <Box className='seedToStem'></Box>
    </Container>
    <Container sx={{ py: 2, justifyContent: 'center', alignItems:'center', display:'flex'}} maxWidth="md">
    <Box className='centerFlower'></Box>
    </Container>
    <Container sx={{ py: 2, justifyContent: 'center', alignItems:'center', display:'flex'}} maxWidth="md">
    <Box className='custom-line'></Box>
    </Container>
    </>

  )
}
