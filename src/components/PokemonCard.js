import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CircularProgress } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';



export default function PokemonCard(url) {
  const {loading, error, pokemon} = usePokemon(url)



  function usePokemon(url) {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    
    useEffect(() => {
      let mounted = true
      setLoading(true)
      async function fetchPokemon() {

        
        try{
          const {data} = await axios(url)
          if(mounted) {
            setPokemon(data)
          }
        }catch(err) {
          setError(err)
        }finally{
          if(mounted) {
            setLoading(false)
          }
        }
      }
      fetchPokemon()
      return function cleanup() {
        mounted = false
      }
    }, [url])
    return {pokemon, loading, error}
  }


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
