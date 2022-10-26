import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetSimilarNews } from '../../sevices/newsService';
import SkeletonCard from '../Skeleton/SkeletonCard';

const RelatedNews = (props) => {
    const {uuid, fetchApi} = props
    const [similarData, setSimilarData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchData = async (id) => {
        const response = await GetSimilarNews(1, 5, "en", id, dispatch);
        if(response.status){
            setSimilarData(response.data);
        }
    }
    
    useEffect(() => {
        fetchData(uuid)
        .catch(console.error);
    }, []);

    return (
        <Box sx={{width:'100%'}}>
            <Typography 
                variant='h4' align='center' 
                fontWeight='bold' color='primary.light'
                mb={5}
            >Related Post</Typography>
            <Stack px={2} spacing={3}>
                {   
                    similarData.length > 0 ? similarData.map((item, idx) => 
                    <Card elevation={4} sx={{
                        borderLeft:'10px solid',
                        borderColor:'primary.main',
                        borderRadius:2
                    }} key={idx}>
                        <CardActionArea
                            onClick={() => {
                                console.log("click")
                                fetchApi(item.uuid)
                            }}
                        >
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" fontWeight={600}>
                                    {item.title.substring(0, 50) + "..."}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {
                                        item.description.substring(0, 150) + "..."
                                    }
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    ) : <SkeletonCard/>
                }
            </Stack>
        </Box>
    );
}

export default RelatedNews;
