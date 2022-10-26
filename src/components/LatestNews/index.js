import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetNews } from '../../sevices/newsService';
import NewsCard from '../NewsCard';
import SkeletonCard from '../Skeleton/SkeletonCard';

const LatestNews = () => {
    
    const [newsData, setNewsData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const loading = useSelector((state) => state.loading.loadingLatestNews);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await GetNews(page, 5, "en", null, null,  null, dispatch);
        if(response.status) {
            setMaxPage(Math.ceil(response.meta.found/5));
            setNewsData(response.data);
        }
    }

    const paginationHandle = (e, v) => {
        setPage(v);
    }

    useEffect(() => {
        fetchData()
        .catch(console.error);
    }, [page]);

    return (
        <Stack direction='column' sx={{width: '100%'}}>
            <Typography variant='h4' sx={{fontWeight:'bold', mb:2}}>Latest News</Typography>
            <Grid container spacing={3}>
                {
                    (loading ? Array.from(new Array(4)) : newsData).map((items, idx) => (    
                        <Grid md={3} xs={6} item key ={idx}>
                            {
                                loading ? (
                                    <SkeletonCard/>
                                ) :
                                (
                                    <NewsCard 
                                        imageCard={items['image_url']}
                                        title={items.title}
                                        description={items.description}
                                        link={`/detail/${items.uuid}`}
                                    />
                                )
                            }
                        </Grid>
                    ))
                }
            </Grid>
            {
                loading ? 
                null :
                <Box mt={3}>
                    <Pagination count={maxPage} color="primary" page={page} onChange={paginationHandle}/>
                </Box>
            }
        </Stack>
    );
}

export default LatestNews;
