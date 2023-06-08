import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="Dormitory photo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Dormitory C13
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This dormitory is situated 5 minutes away from the city center. It provides various facilities like common
                        kitchen, bathrooms and the rooms have their own sink.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}