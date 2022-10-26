import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error505 = () => {
    const navigate = useNavigate();
    return (
        <Grid container 
            direction='column'
            sx={{
                width:'100%', 
                height:'98vh',
            }}
            alignItems='center' justifyContent='center'
        >
            <Box textAlign='center'>
                <Typography variant='h1' component='h1' color='red' fontWeight='bold'>
                    Oops !!! 
                </Typography>
                <Typography variant='h1' component='h1' fontWeight={400}>
                    505 Server Error...
                </Typography>
                <Button variant='outlined' onClick={() => {navigate(-1)}}>
                    Back To Page
                </Button>
            </Box>
        </Grid>
    );
}

export default Error505;
