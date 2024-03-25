import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex, Text, SimpleGrid, Heading, Image, Button, Link } from '@chakra-ui/react';
import BackButton from '@/components/BackButton';
import { weatherBackgrounds } from '../../data/information';
import { WeatherCondition } from '../../typing';
import Nav from '@/components/Nav';

const fetchPokemonData = async (id: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon details');
  }
};

const fetchPokedexDescription = async (name: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch Pokédex description:', error);
    return null;
  }
};

const fetchPokemonType = async (id: string) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data.types.map(type => type.type.name);
  } catch (error) {
    console.error('Failed to fetch Pokémon type:', error);
    return [];
  }
};


export default function PokemonDetails(): JSX.Element {
  const [weatherData, setWeatherData] = useState({
    temp: '',
    weather: '' as WeatherCondition,
  });
  const [currentDate, setCurrentDate] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [pokedexDescription, setPokedexDescription] = useState('');
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = '94cc376cb7e1d14d4733642775cf5059';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver,ca&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const weatherData = await response.json();
        const temp = Math.round(weatherData.main.temp).toString();
        const weather = weatherData.weather[0].main;
        setWeatherData({ temp, weather });
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };

    fetchWeather();
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemon = await fetchPokemonData(id);
        const pokedex = await fetchPokedexDescription(id);
        setPokemonDetails(pokemon);
        if (pokedex && pokedex.flavor_text_entries && pokedex.flavor_text_entries.length > 0) {
          const description = pokedex.flavor_text_entries.find(entry => entry.language.name === 'en');
          if (description) {
            setPokedexDescription(description.flavor_text);
          }
        }
        if (pokemon && pokemon.types && pokemon.types.length > 0) {
          const types = pokemon.types.map(type => type.type.name);
          setPokemonTypes(types);
        }
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const convertToCentimeters = (decimeters: number) => decimeters * 10;
  const convertToKilograms = (hectograms: number) => hectograms / 10;

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
          boxSize={['400px', '400px', '400px']} // Adjust the boxSize for larger scale
          objectFit="cover"
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

              <Text fontSize={['md', '2xl']} my='20' style={{ textTransform: 'capitalize' }}>{pokedexDescription}</Text>

              <Button bg='#8BC5CD' color='white' size='lg' rounded='xl' fontSize={['xl', '2xl']}  p='8' fontWeight='normal'><Link href='/pokedex'>Explore More Pokemon</Link></Button>
            </>
          )}
        </Flex>
      </Flex>
    <Nav />
  </Box>
  );
}
