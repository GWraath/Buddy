import React from 'react'
import { Box, Typography, Link } from '@mui/material';
import Copyright from './components/Copyright';

export default function Footer() {

    return (
        <>
            {/* Footer */}
            <Box sx={{ bgcolor: 'background.paper', p: 0 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Buddy
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    All rights reserved.
                </Typography>
            </Box>
            {/* End footer */}
        </>
    )
}
