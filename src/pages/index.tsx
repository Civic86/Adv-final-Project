import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import { Pokemon, Type } from 'pokeapi-typescript';
import { useRouter } from 'next/router';
import { WeatherCondition, WeatherData } from '../../typing';
import { weatherIcons, weatherBackgrounds, getWeatherBasedPokemonType } from '../../data/information';
import { Box, Flex, Text, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';

export default function Index(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: '',
    weather: '' as WeatherCondition,
  });

  const [currentDate, setCurrentDate] = useState<string>('');
  const [randomPokemonImageUrl, setRandomPokemonImageUrl] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);

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
    if (weatherData.weather !== 'Clear' && !randomPokemonImageUrl) {
      loadRandomPokemonImage(weatherData.weather);
    }
  }, [weatherData.weather, randomPokemonImageUrl]);

  const fetchRandomPokemonImage = useCallback(async (pokemonType: string) => {
    try {
      const typeData = await Type.fetch(pokemonType);
      const pokemonOfType = typeData.pokemon.map((p: { pokemon: string }) => p.pokemon);
      const randomPokemon = pokemonOfType[Math.floor(Math.random() * pokemonOfType.length)];
      const pokemonDetails = await Pokemon.fetch(randomPokemon.name);
      console.log('Final Pokémon Details:', pokemonDetails); // Log here
      console.log('Front default sprite:', pokemonDetails.sprites.other['official-artwork'].front_default); // Additional log
      setPokemonDetails(pokemonDetails); // Update pokemonDetails state
      return pokemonDetails.sprites.other['official-artwork'].front_default;
    } catch (error) {
      console.error('Failed to fetch random Pokémon image:', error);
      return null;
    }
  }, []);

  const loadRandomPokemonImage = async (weather: WeatherCondition) => {
    const pokemonType = getWeatherBasedPokemonType(weather);
    const pokemonImageUrl = await fetchRandomPokemonImage(pokemonType);
    if (pokemonImageUrl) {
      setRandomPokemonImageUrl(pokemonImageUrl);
    }
  };

  return (
    <Box bgImage={`/images/${weatherBackgrounds[weatherData.weather]}`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat">
      <Flex color='white'>
        <Flex flex={1} alignItems="center" minH="100vh" direction={'column'}>
          <Text fontSize={40} fontWeight={600} mt={10}>Vancouver, BC</Text>
          <Flex alignItems="center" gap={10}>
            <Image
              height={100}
              src={`/images/${weatherIcons[weatherData.weather]}`}
              alt={'weather icon'}
            />
            <Text fontSize={87} my={4}>{weatherData.temp}°C</Text>
          </Flex>
          <Text fontSize={30}>{weatherData.weather}</Text>
          <Text fontSize={30} mt={-2} mb={6}>{currentDate}</Text>

          <SimpleGrid columns={2} spacing={10} width="80%">
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center' style={{ color: "white" }}>Wind</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Humidity</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Visibility</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Precipitation</Flex>
          </SimpleGrid>
        </Flex>
        <Flex flex={1} alignItems="center" direction={'column'} justifyContent="center">
          {/* Conditionally render Link component based on pokemonDetails */}
          {pokemonDetails && (
            <Link href={`/pokemon?name=${pokemonDetails.name}&type=${pokemonDetails.type}`}>
              {randomPokemonImageUrl && (
                <Image src={randomPokemonImageUrl} alt="Random Pokémon" />
              )}
            </Link>
          )}
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );
}
