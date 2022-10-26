import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCard, FiCardActionArea, FiCardContent, FiCardMedia } from '../FullImageCard';

const HeroCard = (props) => {
    const {sx, heroImages, link, children} = props
    const navigate = useNavigate();
    return(
        <FiCard>
            <FiCardActionArea sx= {sx} onClick={() => navigate(link)}>
                <FiCardMedia
                    media='picture'
                    alt='test picture'
                    image={heroImages}
                    title='test image'
                />
                <FiCardContent sx={{
                    ...sx,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    color:'common.white',
                    backgroundColor: 'rgba(0,0,0,.15)'
                }}>
                     {children}
                </FiCardContent>
            </FiCardActionArea>
        </FiCard>
    )
}

export default HeroCard;