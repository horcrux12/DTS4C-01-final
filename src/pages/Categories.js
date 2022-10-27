import { Box, Container, Grid, Pagination, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsCard from '../components/NewsCard';
import SkeletonCard from '../components/Skeleton/SkeletonCard';
import { ContainerMaxWidth, NewsCategory } from '../constanta/constanta';
import { GetNews } from '../sevices/newsService';

const Categories = () => {
    const [value, setValue] = useState(0);
    const [newsData, setNewsData] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const loading = useSelector((state) => state.loading.loadingLatestNews);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if(page === 1) {
            fetchData(newValue)
                .catch(console.error);
        }else {
            setPage(1);
        }
    };

    const paginationHandle = (e, v) => {
        setPage(v);
    }

    const fetchData = async (idx) => {
        const response = await GetNews(page, 5, "en", null, NewsCategory[idx],  null, dispatch);
        if(response.status) {
            setMaxPage(Math.ceil(response.meta.found/5));
            setNewsData(response.data);
        }
    }

    useEffect(() => {
        fetchData(value)
            .catch(console.error);
    }, [page]);

    return (
        <Container maxWidth={ContainerMaxWidth}>
            <Box sx={{width:'100%', mt:3}}>
                <Typography variant='h4' sx={{fontWeight:'bold', mb:2}}>Categories</Typography>
            </Box>
            <Tabs value={value} 
                onChange={handleChange} 
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{mb:3}}
            >
                {
                    NewsCategory.map((item, idx) => <Tab key={`${item}-${idx}`} label={item} />)
                }
            </Tabs>
            <Grid container spacing={3} sx={{mb:3}}>
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
                <Box mt={3} sx={{mb:3}}>
                    <Pagination count={maxPage} color="primary" page={page} onChange={paginationHandle}/>
                </Box>
            }
        </Container>
    );
}

export default Categories;
