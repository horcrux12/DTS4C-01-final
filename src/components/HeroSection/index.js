import { Box, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { GetTopNews } from '../../sevices/newsService';
import SkeletonCard from '../Skeleton/SkeletonCard';
import HeroCard from './HeroCard';

const HeroSection = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [topNews, setTopNews] = useState({});
    const loading = useSelector((state) => state.loading.loading);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await GetTopNews(dispatch, "en");
        if(response.status) {
            setTopNews(response.data);
        }
    }

    useEffect(() => {
        fetchData()
        .catch(console.error);
    }, []);

    return (
        <Stack direction='column' sx={{width:'100%'}}>
            <Typography variant='h4' sx={{fontWeight:'bold', mb:2}}>Hot Topics</Typography>
            {
                loading ? 
                (
                    <SkeletonCard/>
                ) :
                (
                    <Grid container spacing={2}>
                        <Grid md={8} xs={12} item>
                            <HeroCard sx={{
                                minHeight:['14em', '18em', '28em']
                            }} heroImages={topNews.image_url} link={"/detail/"+topNews.uuid}>
                                <Typography variant={matches ? 'h4': 'h5'} gutterBottom component='h2' mb={2}>
                                    {topNews.title}
                                </Typography>
                                <Box>
                                    <Typography variant='body2' sx={{display:'inline', mr:3}}>{moment(topNews.published_at).format("DD-MM-YYYY HH:mm:ss")}</Typography>
                                    <Typography variant='body2' sx={{display:'inline'}}>{topNews.source}</Typography>
                                </Box>
                            </HeroCard>
                        </Grid>
                        {
                            matches ? (
                                <Grid md={4} item>
                                    <Typography align='justify' variant='h5' fontFamily='serif'>
                                        {topNews.description}
                                    </Typography>
                                </Grid>
                            ) : null
                        }
                        
                    </Grid>
                )
            }
            
        </Stack>    
    );
}

export default HeroSection;
