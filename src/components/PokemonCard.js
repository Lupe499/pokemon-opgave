import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



export default function PokemonCard({id, name, image, type}) {


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name} #0{id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type:{type}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
