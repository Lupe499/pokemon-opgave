import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import PokemonCard from './components/PokemonCard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20')
  const getAllPokemons = async () => {

    
    try{
      const res = await axios(loadMore)
      const data = await res.data
      makePokemonCard(data.results)
      console.log(data);
      setLoadMore(data.next)
      
    }catch(err){
      console.log(err)
 
      document.querySelector(".App").innerHTML = "someting went wrong please try again later"
      document.querySelector(".App").style.color = "white"
    }
    
    
    
    function makePokemonCard (result) {
      console.log(result);
      result.forEach( async (pokemon) => {
        
        try{
          const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.data
          setAllPokemons(currentList => [...currentList, data])
          
        }catch(err){
          console.log(err);
          document.querySelector(".App").innerHTML = "someting went wrong please try again later"
          document.querySelector(".App").style.color = "white"
        }


      })
    }
    await console.log(allPokemons)

  }
  
  
  useEffect(() => {
    getAllPokemons()
  }, [])



    
    return (
      <ErrorBoundary>

        <>
        <div className="App">
        {allPokemons.map((pokemon, index) => {
          return(
            <PokemonCard 
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
            key={index} 
            />
            )
          })}
          
      </div>
      <Button onClick={() => getAllPokemons()} variant="contained">Load more</Button>
      </>
    </ErrorBoundary>
  );
}

export default App;
