import { Box, Skeleton } from '@mui/material';
import React from 'react';

const SkeletonCard = () => {
    return (
        <>
            <Skeleton variant='rectangular' height={118} mb={2}/>
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton />
            </Box>
        </>
    );
}

export default SkeletonCard;
