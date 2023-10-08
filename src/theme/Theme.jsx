import * as React from 'react';
import {CssBaseline, Box, Typography, Container} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//sets the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4A8E51'
    }
  },
}
);

export default function Theme(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 0,
                    pb: 0,
                    mt: -10,
                }}
                >
                    <Container maxWidth="m">
                        <Typography
                        component="h1"
                        variant="p"
                        align="center"
                        color="text.primary"
                        gutterBottom
                        >
                          {props.component}
                        </Typography>
                    </Container>
                </Box>
            </main>
    </ThemeProvider>
  );
}