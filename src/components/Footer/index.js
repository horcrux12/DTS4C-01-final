import { Box, Container, Link, Typography } from '@mui/material';
import React from 'react';

const Copyright = ( ) => {
    return (
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
            py: 3,
            px: 2,
            mt: "auto",
            bgcolor: 'secondary.main'
        }}
        >
            <Container maxWidth='xl'>
                <Typography variant="body1">
                    My sticky footer can be found here.
                </Typography>
                <Copyright />
            </Container>
        </Box>
    );
}

export default Footer;
