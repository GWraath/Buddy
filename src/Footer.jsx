import React from 'react'
import { Box, Typography, Link } from '@mui/material';
import Copyright from './components/Copyright';

export default function Footer() {
    
    return (
        <>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Choose a page to explore more!
                </Typography>
                <Copyright />
            </Box>
            {/* End footer */}</>
    )
}
