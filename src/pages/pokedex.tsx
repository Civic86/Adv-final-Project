import { useState, useEffect } from 'react';
import { SimpleGrid, Card, CardHeader, Heading, Image, Text, Button, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import Nav from '@/components/Nav';


interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

export default function Pokedex(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 100;
  

  useEffect(() => {
    const fetchPokemons = async () => {
      const allPokemonData: any[] = [];
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      let data = await response.json();
      for (const pokemon of data.results) {
        response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        allPokemonData.push({
          name: pokemonData.name,
          id: pokemonData.id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`
        });
      }
      setPokemons(allPokemonData);
    };

    fetchPokemons();
  }, [offset]);

  const loadNextPage = () => {
    setOffset(prevOffset => prevOffset + limit); // Increment by the limit
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (  
    <div>
        <Stack spacing={4} justifyContent="center" alignItems="center" mt={4}>
            <InputGroup w={500}>
                <Input type='string' placeholder='Search by Pokemon name, id' />
            </InputGroup>
        </Stack>

      <SimpleGrid columns={5} spacing={12} padding={40}>
        {pokemons.map(pokemon => (
          <Card key={pokemon.id} w={270} h={180} position="relative" boxShadow="0 4px 8px 0 rgba(0,0,0,0.2), 4px 0 8px 0 rgba(0,0,0,0.2)">
            <CardHeader>
            <Heading size='md'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Heading>
            <Text fontWeight="bold" color="gray" fontSize={20}>#{pokemon.id}</Text>
            </CardHeader>
            <Image src={pokemon.imageUrl} alt={pokemon.name} boxSize="150px" objectFit="none" transform="scale(1.7)" position="absolute" bottom="1" right="0"/>
          </Card>
        ))}
      </SimpleGrid>
      {pokemons.length < 649 && ( 
        <Button onClick={loadNextPage}>Load Next 100 Pokémon</Button>
      )}
      <Nav/>
    </div>
  );
}