import { Box, Container, Grid, Pagination, Paper } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import InputSearch from '../components/InputSearch';
import NewsCard from '../components/NewsCard';
import SkeletonCard from '../components/Skeleton/SkeletonCard';
import { ContainerMaxWidth } from '../constanta/constanta';
import { GetNews } from '../sevices/newsService';

const SearchPage = () => {
    const [searchKey, setSearchKey] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const [maxPage, setMaxPage] = useState(10);
    const [page, setPage] = useState(1);
    const search = useLocation();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading.loadingLatestNews);

    const fetchData = async () => {
        const response = await GetNews(page, 5, "en", null, null,  searchKey, dispatch);
        if(response.status) {
            setMaxPage(Math.ceil(response.meta.found/5));
            setDataSearch(response.data);
        }
    }

    const handleSubmit = () => {
        fetchData()
        .catch(console.error);
        setPage(1);
    }

    const paginationHandle = (e, v) => {
        setPage(v);
    }

    const handleEnterSearch = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            handleSubmit()
        }
      }

    useEffect(() => {
        fetchData()
        .catch(console.error);
    }, [page]);

    useEffect(() => {
        console.log("dipanggil")
        if (search.state) {
            setSearchKey(search.state.search);
            fetchData()
            .catch(console.error);
        }
    }, [search]);

    return (
        <Container maxWidth={ContainerMaxWidth}>
            <Stack sx={{py:5}} spacing={3}>
                <Box sx={{
                    width:'100%', 
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <InputSearch 
                        onClickSearch={handleSubmit} 
                        searchKey={searchKey} 
                        setSearchKey={setSearchKey}
                        onKeyUp={handleEnterSearch}
                    />
                </Box>
                <Grid container spacing={3}>
                {
                    (loading ? Array.from(new Array(4)) : dataSearch).map((items, idx) => (    
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
                (loading || dataSearch.length === 0) ? 
                    null :
                    <Box mt={3}>
                        <Pagination count={maxPage} color="primary" page={page} onChange={paginationHandle}/>
                    </Box>
                }
            </Stack>
        </Container>
    );
}

export default SearchPage;
