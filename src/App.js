import { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import PokemonCard from './components/PokemonCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import usePokemonList from './hooks/usePokemonList';

function App() {

  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)

  
  
  const {allPokemons, loading, error} = usePokemonList({limit, offset})


  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  
  

  function handleNext() {
    setOffset(offset + limit)
  }
  function handleBack() {
    if(offset !== 0){
      setOffset(offset - limit)
    }
  }
  
    return (
     

        <>
        <div className="App">
          {
            loading ? <CircularProgress size={20} />: 
            error.length > 0 ? <Typography>{error}</Typography>:

            allPokemons.map((pokemon, index) => {
              
            return(
              <PokemonCard 
                key={index}
                url={pokemon.url}
              />
            )
          })}
          
      </div>
      <Button onClick={() => handleBack()} variant="contained">Back</Button>
      <Button onClick={() => handleNext()} variant="contained">Next</Button>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">limit</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </>
    
  );
}

export default App;
