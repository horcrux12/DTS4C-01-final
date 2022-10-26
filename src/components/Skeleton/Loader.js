import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center', height:'20em' }}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;
