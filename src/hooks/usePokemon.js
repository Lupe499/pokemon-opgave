import axios from 'axios'
import { useEffect, useState } from 'react'

export default function usePokemon(url) {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
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

