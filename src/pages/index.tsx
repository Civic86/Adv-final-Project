import { Box, Flex, Text, SimpleGrid, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import { Pokemon, Type } from 'pokeapi-typescript';

type WeatherCondition = 'Clear' | 'Clouds' | 'Drizzle' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Mist';

export default function Index(): JSX.Element {
  const [weatherData, setWeatherData] = useState({
    temp: '',
    weather: '' as WeatherCondition,
  });

  const [currentDate, setCurrentDate] = useState('');
  const [randomPokemonImageUrl, setRandomPokemonImageUrl] = useState<string | null>(null);

  const weatherIcons: Record<WeatherCondition, string> = {
    Clear: 'clear.png',
    Clouds: 'cloudy.png',
    Drizzle: 'drizzle.png',
    Rain: 'rain.png',
    Thunderstorm: 'thunder.png',
    Mist: 'atmosphere.png',
    Snow: 'snow.png',
  };

  const weatherBackgrounds: Record<WeatherCondition, string> = {
    Clear: 'sun-background.png',
    Clouds: 'cloudy-background.png',
    Drizzle: 'rain-background.png',
    Rain: 'rain-background.png',
    Snow: 'snow-background.png',
    Thunderstorm: 'thunder-background.png',
    Mist: 'atmosphere.png'
    };

  const fetchRandomPokemonImage = async (pokemonType: string) => {
    try {
      const typeData = await Type.fetch(pokemonType);
      const pokemonOfType = typeData.pokemon.map((p) => p.pokemon);
      const randomPokemon = pokemonOfType[Math.floor(Math.random() * pokemonOfType.length)];
      const pokemonDetails = await Pokemon.fetch(randomPokemon.name);
      return pokemonDetails.sprites.other['official-artwork'].front_default;
    } catch (error) {
      console.error('Failed to fetch random Pokémon image:', error);
      return null;
    }
  };

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

    const loadRandomPokemonImage = async () => {
      const pokemonType = getWeatherBasedPokemonType(weatherData.weather); 
      const pokemonImageUrl = await fetchRandomPokemonImage(pokemonType);
      if (pokemonImageUrl) {
        setRandomPokemonImageUrl(pokemonImageUrl);
      }
    };
    loadRandomPokemonImage();

    fetchWeather();

    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' } as const;
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  const getWeatherBasedPokemonType = (weather: WeatherCondition): string => {
    switch (weather) {
      case 'Clear':
        return 'normal', 'fire', 'fighting', 'flying';
      case 'Clouds':
        return 'fairy', 'poison', 'bug' ;
      case 'Drizzle':
      case 'Rain':
        return 'water';
      case 'Snow':
        return 'ice';
      case 'Thunder':
        return 'electric';
      default:
        return 'normal'; 
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
              height={200}
              src={`/images/${weatherIcons[weatherData.weather]}`}
              alt={'weather icon'}
            />
            <Text fontSize={87} my={4}>{weatherData.temp}°C</Text>
            </Flex>
          <Text fontSize={30}>{weatherData.weather}</Text>
          <Text fontSize={30} mt={-2} mb={6}>{currentDate}</Text>

          <SimpleGrid columns={2} spacing={10} width="80%">
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Wind</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Humidity</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Visibility</Flex>
            <Flex bg='rgba(128,128,128,0.5)' textAlign="center" height={16} borderRadius='0.5em' backgroundColor='black' opacity='50%' align='center' justify='center'>Precipitation</Flex>
          </SimpleGrid>
        </Flex>
        <Flex flex={1} alignItems="center" direction={'column'} justifyContent="center">
          <Link href="/pokemon" >
            {randomPokemonImageUrl && <img src={randomPokemonImageUrl} alt="Random Pokémon"/>}
          </Link>
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );
}
