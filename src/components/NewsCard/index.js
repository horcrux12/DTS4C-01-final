import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewsCard = (props) => {
  const {imageCard, title, description, link} = props
  const navigate = useNavigate();
  
    return (
    <Card sx={{ maxWidth: 345, minHeight:'23em' }} elevation={5}>
      <CardActionArea onClick={() => navigate(link)}>
        <CardMedia
          component="img"
          height="140"
          image={imageCard}
          alt="news images"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Learn
        </Button>
      </CardActions> */}
    </Card>
  );
}

export default NewsCard;
