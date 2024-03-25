import axios from 'axios';
import Nav from '@/components/Nav';
import { Box, Flex, Text, SimpleGrid, Heading, Image, Button, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BackButton from '@/components/BackButton';
import { weatherBackgrounds } from '../../data/information';
import { WeatherCondition, WeatherData } from '../../typing';

const fetchPokemonData = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon details');
  }
};

const fetchPokedexDescription = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Pokédex description:', error);
    return null;
  }
};

const fetchPokemonType = async (name) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data.types.map(type => type.type.name);
  } catch (error) {
    console.error('Failed to fetch Pokémon type:', error);
    return [];
  }
};


export default function Pokemon(): JSX.Element {

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: '',
    weather: '' as WeatherCondition,
  });

  const [currentDate, setCurrentDate] = useState<string>('');
  const router = useRouter();
  const { name } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokedexDescription, setPokedexDescription] = useState<string>('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]); // Define pokemonTypes state here

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '94cc376cb7e1d14d4733642775cf5059';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver,ca&units=metric&appid=${apiKey}`;
        const response = await axios.get(url);
        const { temp } = response.data.main;
        const { main } = response.data.weather[0];

        setWeatherData({
          temp: Math.round(temp).toString(),
          weather: main as WeatherCondition,
        });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();

    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' } as const;
    setCurrentDate(date.toLocaleDateString('en-US', options));

  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const data = await fetchPokemonData(name);
        setPokemonDetails(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    const fetchData = async () => {
      try {
        // Fetch Pokémon details
        await fetchPokemonDetails();

        // Fetch Pokédex description
        const pokedexData = await fetchPokedexDescription(name);
        if (pokedexData && pokedexData.flavor_text_entries && pokedexData.flavor_text_entries.length > 0) {
          const description = pokedexData.flavor_text_entries.find(entry => entry.language.name === 'en');
          if (description) {
            // Replace the up arrow character with a space character
            const cleanDescription = description.flavor_text.replace(/\/g, ' ');
            
            // Split the description into sentences
            const sentences = cleanDescription.split('. ');
            
            // Capitalize the first letter of each sentence
            const capitalizedSentences = sentences.map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1));
            
            // Join the sentences back together
            const formattedDescription = capitalizedSentences.join('. ');
            
            setPokedexDescription(formattedDescription);
          }
        }

        // Fetch Pokémon type
        const types = await fetchPokemonType(name);
        setPokemonTypes(types);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);



  const convertToCentimeters = (decimeters) => {
    return decimeters * 10; // 1 decimeter = 10 centimeters
  };

  const convertToKilograms = (hectograms) => {
    return hectograms / 10; // 1 hectogram = 100 grams = 0.1 kilograms
  };

  return (
  <Box minHeight="100vh" display="flex" flexDirection="column">
  <BackButton />
  <Flex flex="1" flexDirection={['column', 'column', 'column', 'row']}>
    {/* Pokemon with background */}
    <Flex
    bgImage={`/images/${weatherBackgrounds[weatherData.weather]}`}
    bgSize="cover"
    bgPosition="center"
    bgRepeat="no-repeat"
    flex="1"
    alignItems="center"
    justifyContent="center"
  >
  {pokemonDetails && pokemonDetails.sprites && pokemonDetails.sprites.other && pokemonDetails.sprites.other['official-artwork'] && (
    <Image
      src={pokemonDetails.sprites.other['official-artwork'].front_default}
      alt="Official Artwork"
      mt={[0, 4, 4]}
      width={['100%', '50%', '40%']} // Set width for different screen sizes
    />
  )}
</Flex>
    {/* Pokemon information */}
    <Flex flex="1" alignItems={['center', 'center', 'center', "flex-start"]} justifyContent={['center']} direction="column" ml={['0', '0', '0', '7rem']} px={['4', '4', '4', '0']} pb={['40']}>
      {pokemonDetails && (
        <>
          <Heading as="h1" fontSize={['2xl', '5xl']} mt={['10', '10', '10', '0']} style={{ textTransform: 'capitalize' }}>{pokemonDetails.name}</Heading>
          <Text my='2' rounded='lg' bg='#8BC5CD' color='white' fontSize={['xs', 'lg']} fontWeight='normal' p='1' px='6'>{pokemonDetails.type}</Text>
          <SimpleGrid alignItems={'center'} textAlign='center' columns={[2]} spacing={4} mt={10}>
            <Box rounded='lg' boxShadow='lg' p='6'>
              <Text fontSize={['md', '2xl']} color={'#A0A0A0'}>Species</Text>
              <Text fontSize={['md', '2xl']} color={'#3AC291'} style={{ textTransform: 'capitalize' }}>{pokemonDetails.species.name}</Text>
            </Box>
            <Box rounded='lg' boxShadow='lg' p='6'>
              <Text fontSize={['md', '2xl']} color={'#A0A0A0'}>Abilities</Text>
              <Box color={'#3AC291'} style={{ textTransform: 'capitalize' }}>
                {pokemonDetails.abilities.map(ability => (
                  <Text fontSize={['md', '2xl']} key={ability.ability.name}>{ability.ability.name}</Text>
                ))}
              </Box>
            </Box>
            <Box rounded='lg' boxShadow='lg' p='6'>
              <Text fontSize={['md', '2xl']} color={'#A0A0A0'}>Height</Text>
              <Text fontSize={['md', '2xl']} color={'#3AC291'}>{convertToCentimeters(pokemonDetails.height)} cm</Text>
            </Box>
            <Box rounded='lg' boxShadow='lg' p='6'>
              <Text fontSize={['md', '2xl']} color={'#A0A0A0'}>Weight</Text>
              <Text fontSize={['md', '2xl']} color={'#3AC291'}>{convertToKilograms(pokemonDetails.weight)} kg</Text>
            </Box>
          </SimpleGrid>

          <Text fontSize={['md', '2xl']} my='20'>{pokedexDescription}</Text>

          <Button bg='#8BC5CD' color='white' size='lg' rounded='xl' fontSize={['xl', '2xl']}  p='8' fontWeight='normal'><Link href='/pokedex'>Explore More Pokemon</Link></Button>
        </>
      )}
    </Flex>
  </Flex>
  <Nav />
</Box>

  );
}