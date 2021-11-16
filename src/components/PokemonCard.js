import React from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CircularProgress } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import usePokemon from '../hooks/usePokemon';



export default function PokemonCard(url) {
  const {loading, error, pokemon} = usePokemon(url)

  return (
    loading ? <CircularProgress size={20} />: 
    error.length > 0 ? <Typography>{error}</Typography>:

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={pokemon?.sprites?.front_default}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.name} #0{pokemon.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {pokemon?.types?.map(type => {
                    return type.type.name + " "
            })}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
