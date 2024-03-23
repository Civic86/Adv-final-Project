import Nav from '@/components/Nav';
import { Box, Flex, Text, SimpleGrid, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Define the fetchPokemonData function to fetch Pokémon details
const fetchPokemonData = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon details');
  }
};

export default function Pokemon(): JSX.Element {
  const router = useRouter();
  const { name } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const data = await fetchPokemonData(name);
        setPokemonDetails(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    if (name) {
      fetchPokemonDetails();
    }
  }, [router.query]);

  const convertToCentimeters = (decimeters) => {
    return decimeters * 10; // 1 decimeter = 10 centimeters
  };

  const convertToKilograms = (hectograms) => {
    return hectograms / 10; // 1 hectogram = 100 grams = 0.1 kilograms
  };

  return (
    <Box>
      <Flex>
        <Flex flex={4} bg="blue.100" alignItems="center" justifyContent="center">
          {pokemonDetails && pokemonDetails.sprites && pokemonDetails.sprites.other && pokemonDetails.sprites.other['official-artwork'] && (
            <Image src={pokemonDetails.sprites.other['official-artwork'].front_default} alt="Official Artwork" boxSize="200px" mt={4} />
          )}
        </Flex>
        <Flex flex={6} alignItems="center" direction="column">
          {pokemonDetails && (
            <>
              <Heading as="h1" fontSize="2xl" mt={10}>{pokemonDetails.name}</Heading>
              <SimpleGrid columns={2} spacing={4} mt={4}>
                <Text>Species: {pokemonDetails.species.name}</Text>
                <Text>Abilities: {pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</Text>
                <Text>Height: {convertToCentimeters(pokemonDetails.height)} cm</Text>
                <Text>Weight: {convertToKilograms(pokemonDetails.weight)} kg</Text>
              </SimpleGrid>
            </>
          )}
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );
}
