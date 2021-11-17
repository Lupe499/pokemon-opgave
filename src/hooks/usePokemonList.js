import axios from 'axios'
import { useEffect, useState } from 'react'

export default function usePokemonList({limit, offset}) {

  

  const [allPokemons, setAllPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    let mounted = true
    setLoading(true)
    async function getAllPokemons() {

      try{
        const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
        setAllPokemons(data.results)
        setLoading(false)
        
      }catch(err){
        console.error(err)
        setError(err?.res?.data?.message?? err.message)
        
      }
    }
    getAllPokemons()
    return function cleanup() {
      mounted = false
    }
  }, [limit, offset])
  return {allPokemons, loading, error}
}
