import Nav from '@/components/Nav';
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'


export default function Pokemon(): JSX.Element {

  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const pokemonDetails = await fetchPokemonData(name);
        console.log('Pokémon Details:', pokemonDetails);
        // Update state with Pokémon details
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    if (name) {
      fetchPokemonDetails();
    }
  }, [name]);


  return (
    <Box>
      <Flex>
        <Flex flex={4} bg="blue.100" alignItems="center" direction={'column'} justifyContent="center">
          <Link href="/">
            <Box w={200} h={200} bg="green.100" borderRadius="50%"></Box>
          </Link>
        </Flex>
          <Flex flex={6} alignItems="center" minH="100vh" direction={'column'}>
            <Text fontSize={40} mt={10}>Ditto</Text>
            <SimpleGrid columns={3} spacing={10} width="80%">
              <Box bg='tomato' textAlign="center" height={14}>Gender</Box>
              <Box bg='tomato' textAlign="center" height={14}>Species</Box>
              <Box bg='tomato' textAlign="center" height={14}>Abilities</Box>
              <Box bg='tomato' textAlign="center" height={14}>Height</Box>
              <Box bg='tomato' textAlign="center" height={14}>Weight</Box>
            </SimpleGrid>
        </Flex>
      </Flex>
      <Nav/>
    </Box>
  );
}
