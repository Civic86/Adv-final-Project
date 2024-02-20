import { useState, useEffect } from 'react';
import { SimpleGrid, Card, CardHeader, Heading, Image, Text, Button } from '@chakra-ui/react';

interface Pokemon {
  name: string;
  id: number;
  imageUrl: string;
}

export default function Pokedex(): JSX.Element {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      const allPokemonData: any[] = [];
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`);
      let data = await response.json();
      for (const pokemon of data.results) {
        response = await fetch(pokemon.url);
        const pokemonData = await response.json();
        allPokemonData.push({
          name: pokemonData.name,
          id: pokemonData.id,
          imageUrl: pokemonData.sprites.front_default
        });
      }
      setPokemons(allPokemonData);
    };

    fetchPokemons();
  }, [offset]);

  const loadNextPage = () => {
    setOffset(prevOffset => prevOffset + 100);
  };

  return (
    <div>
      <SimpleGrid columns={5} spacing={10}>
        {pokemons.map(pokemon => (
          <Card key={pokemon.id}>
            <CardHeader>
              <Heading size='md'>{pokemon.name}</Heading>
              <Text>#{pokemon.id}</Text>
            </CardHeader>
            <Image src={pokemon.imageUrl} alt={pokemon.name} />
          </Card>
        ))}
      </SimpleGrid>
      <Button onClick={loadNextPage}>Load Next 100 Pokémon</Button>
    </div>
  );
}