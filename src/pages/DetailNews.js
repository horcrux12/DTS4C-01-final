import { Breadcrumbs, Button, Card, CardActionArea, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContainerMaxWidth } from '../constanta/constanta';
import { useDispatch, useSelector } from 'react-redux';
import { GetDetailNews } from '../sevices/newsService';
import Loader from '../components/Skeleton/Loader';
import moment from 'moment';

const DetailNews = () => {
    const {newsID} = useParams();
    const [detailData, setDetailData] = useState({});
    const loading = useSelector((state) => state.loading.loading);
    const dispatch = useDispatch();

    const fetchData = async (newsID) => {
        const response = await GetDetailNews(dispatch, newsID);
        if(response.status) {
            setDetailData(response.data);
        }
    }

    useEffect(() => {
        fetchData(newsID)
        .catch(console.error);
    }, []);
    return loading ? (<Loader />): (
        <>
            <Box sx={{
                backgroundImage:`url('${detailData.image_url}')`,
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                backgroundPosition: 'center',
                minHeight:'24em',
                position:'relative',
                zIndex:-1
            }}>
                <Box sx={{
                    minHeight:'24em',
                    width:'100%',
                    backgroundColor:'rgba(0,0,0,.10)',
                    zIndex:-2
                }}>

                </Box>

            </Box>
            <Container maxWidth={ContainerMaxWidth} sx={{mt:3}}>
                <Typography variant='h4' sx={{fontWeight:'bold', mb:2}}>{detailData.title}</Typography>
                <Breadcrumbs aria-label='news-information' separator='・'>
                    <Typography variant='subtitle2'>Publisher</Typography>
                    <Typography variant='subtitle2'>{moment(detailData.published_at).format("DD-MM-YYYY HH:mm:ss")}</Typography>
                </Breadcrumbs>
                <Grid container my={5}>
                    <Grid item xs={8} pr={3} container direction='column'>
                        <Grid item mb={5}>
                            <Typography align='justify' fontFamily='serif' variant='subtitle1'>
                                {detailData.description}
                            </Typography>
                        </Grid>
                        <Grid>
                            <Button variant='outlined' href={detailData.url} target="_blank">
                                Read More
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} borderLeft='1px solid' borderColor='divider' >
                        <Typography 
                            variant='h4' align='center' 
                            fontWeight='bold' color='primary.light'
                            mb={5}
                        >Related Post</Typography>
                        <Stack px={2} spacing={3}>
                            <Card elevation={4} sx={{
                                    borderLeft:'10px solid',
                                    borderColor:'primary.main',
                                    borderRadius:2
                                }}>
                                <CardActionArea>
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000
                                        species, ranging across all continents except Antarctica
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default DetailNews;
