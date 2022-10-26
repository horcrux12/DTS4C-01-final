import { Box, Container } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import HeroSection from '../components/HeroSection';
import LatestNews from '../components/LatestNews';
import { ContainerMaxWidth } from '../constanta/constanta';

const HomePage = () => {
    return (
        <Container maxWidth={ContainerMaxWidth} sx={{ my:2 }}>
            <Stack direction='column' spacing={2}>
                <Box>
                    <HeroSection/>
                </Box>
                <Box>
                    <LatestNews/>
                </Box>
            </Stack>

        </Container>
    );
}

export default HomePage;
