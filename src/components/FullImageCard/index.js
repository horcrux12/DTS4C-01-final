import { Card, CardActionArea, CardActions, CardContent, CardMedia, styled } from '@mui/material';
import React from 'react';

export const FiCard = styled(Card)((theme) => ({
    position:'relative'
}));

export const FiCardActionArea = styled(CardActionArea)(() => ({
    position: 'relative'
}));

export const FiCardActions = styled(CardActions)(() => ({
    position: 'relative'
}));

export const FiCardContent = styled(CardContent)(() => ({
    position: 'relative',
    background: 'transparent'
}));

export const FiCardMedia = styled(CardMedia)(() => ({
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width:'100%'
}))

