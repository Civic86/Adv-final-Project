import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import { Pokemon, Type } from 'pokeapi-typescript';
import { Forecast, WeatherCondition, WeatherData } from '../../typing';
import { weatherIcons, weatherBackgrounds, getWeatherBasedPokemonType } from '../../data/information';
import { Box, Flex, Text, SimpleGrid, Image, GridItem, Grid } from '@chakra-ui/react';
import Link from 'next/link';

export default function Index(): JSX.Element {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: '',
    weather: '' as WeatherCondition,
    wind: '',
    windSpeed: '',
    humidity: '',
    visibility: '',
    precipitation: '',
  });
  const [forecast, setForecast] = useState<Forecast>({
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
        const { speed } = response.data.wind;
        const { humidity } = response.data.main;
        const { visibility } = response.data;
        const { precipitation } = response.data;

        setWeatherData((prevData) => ({
          ...prevData,
          temp: Math.round(temp).toString(),
          weather: main as WeatherCondition,
          wind: speed.toString(),
          windSpeed: '',
          humidity: humidity.toString(),
          visibility: visibility.toString(),
          precipitation: precipitation ? precipitation['1h'] : '0',
        }));
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
    if (weatherData.weather && !randomPokemonImageUrl) {
      loadRandomPokemonImage(weatherData.weather);
    }
  }, [weatherData.weather, randomPokemonImageUrl]);

  const fetchRandomPokemonImage = useCallback(async (pokemonType: string) => {
    try {
      const typeData = await Type.fetch(pokemonType);
      const pokemonOfType = typeData.pokemon.map((p: { pokemon: string }) => p.pokemon);
      const randomPokemon = pokemonOfType[Math.floor(Math.random() * pokemonOfType.length)];
      const pokemonDetails = await Pokemon.fetch(randomPokemon.name);
      console.log('Final Pokémon Details:', pokemonDetails);
      console.log('Front default sprite:', pokemonDetails.sprites.other['official-artwork'].front_default);
      setPokemonDetails(pokemonDetails);
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
      bgRepeat="no-repeat"
      p={4}
    >
      <Flex color='white' flexDir={{ base: 'column', md: 'row' }}>
        <Flex flex={{ base: 1, md: 2 }} alignItems="center" direction={'column'} justifyContent="center" mt={{ base: 4, md: 0 }}>
          {pokemonDetails && (
            <Link href={`/pokemon?name=${pokemonDetails.name}&type=${pokemonDetails.type}`}>
              {randomPokemonImageUrl && (
                <Image src={randomPokemonImageUrl} alt="Random Pokémon" />
              )}
            </Link>
          )}
        </Flex>
        <Flex flex={{ base: 1, md: 3 }} alignItems="center" minH="100vh" flexDirection="column">
          <Text fontSize={{ base: 24, md: 40 }} fontWeight={600} mt={10}>Vancouver, BC</Text>
          <Flex alignItems="center" gap={10}>
            <Image
              height={{ base: 50, md: 100 }}
              src={`/images/${weatherIcons[weatherData.weather]}`}
              alt={'weather icon'}
            />
            <Text fontSize={{ base: 48, md: 87 }} my={4}>{weatherData.temp}°C</Text>
          </Flex>
          <Text fontSize={{ base: 20, md: 30 }}>{weatherData.weather}</Text>
          <Text fontSize={{ base: 20, md: 30 }} mt={-2} mb={6}>{currentDate}</Text>

          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            gap={10}
            width="80%"
            autoFlow="row dense"
          >
            <GridItem
              bg='rgba(128,128,128,0.5)'
              textAlign="center"
              borderRadius='0.5em'
              backgroundColor='black'
              opacity='50%'
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              py={4}
            >
              Wind: {weatherData.wind} m/s
            </GridItem>
            <GridItem
              bg='rgba(128,128,128,0.5)'
              textAlign="center"
              borderRadius='0.5em'
              backgroundColor='black'
              opacity='50%'
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={4}
            >
              Humidity: {weatherData.humidity}%
            </GridItem>
            <GridItem
              bg='rgba(128,128,128,0.5)'
              textAlign="center"
              borderRadius='0.5em'
              backgroundColor='black'
              opacity='50%'
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={4}
            >
              Visibility: {weatherData.visibility} m
            </GridItem>
            <GridItem
              bg='rgba(128,128,128,0.5)'
              textAlign="center"
              borderRadius='0.5em'
              backgroundColor='black'
              opacity='50%'
              display="flex"
              alignItems="center"
              justifyContent="center"
              py={4}
            >
              Precipitation: {weatherData.precipitation} mm
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );

}
