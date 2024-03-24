import Nav from '@/components/Nav';
import { Box, Flex, Text, SimpleGrid, Heading, Image, Divider, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';

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
      <BackButton />
      <Flex>
        <Flex flex={4} bg="blue.100" alignItems="center" justifyContent="center">
          {pokemonDetails && pokemonDetails.sprites && pokemonDetails.sprites.other && pokemonDetails.sprites.other['official-artwork'] && (
            <Image src={pokemonDetails.sprites.other['official-artwork'].front_default} alt="Official Artwork" boxSize="200px" mt={4} />
          )}
        </Flex>
        <Flex flex={6} alignItems="flex-start" direction="column" marginLeft='7rem'>
          {pokemonDetails && (
            <>
              <Heading as="h1" fontSize="2xl" mt={10} style={{ textTransform: 'capitalize' }}>{pokemonDetails.name}</Heading>
              <Button my='2' bg='#8BC5CD' color='white' size='xs' fontWeight='normal'>Type?</Button>
              <SimpleGrid alignItems={'center'} textAlign='center' columns={2} spacing={4} mt={4}>
                <Box rounded='lg' boxShadow='lg' py='6'>
                  <Text color={'#A0A0A0'}>Species</Text>
                  <Text color={'#3AC291'} style={{ textTransform: 'capitalize' }}>{pokemonDetails.species.name}</Text>
                </Box>
                <Box rounded='lg' boxShadow='lg' py='6'>
                  <Text color={'#A0A0A0'}>Abilities</Text>
                  <Text color={'#3AC291'} style={{ textTransform: 'capitalize' }}>{pokemonDetails.abilities.map(ability => ability.ability.name).join(', ')}</Text>
                </Box>
                <Box rounded='lg' boxShadow='lg' py='6'>
                  <Text color={'#A0A0A0'}>Height</Text>
                  <Text color={'#3AC291'}>{convertToCentimeters(pokemonDetails.height)} cm</Text>
                </Box>
                <Box rounded='lg' boxShadow='lg' py='6'>
                  <Text color={'#A0A0A0'}>Weight</Text>
                  <Text color={'#3AC291'}>{convertToKilograms(pokemonDetails.weight)} kg</Text>
                </Box>
              </SimpleGrid>
             
              <Text my='8' style={{ textTransform: 'capitalize' }}>bla</Text>
            
              <Button bg='#8BC5CD' color='white' size='lg' fontWeight='normal'><Link href='/pokedex'>Explore More Pokemon</Link></Button>
            </>
          )}
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );
}
