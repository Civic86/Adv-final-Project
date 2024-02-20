import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '@/components/Nav';
import Image from 'next/image';

type WeatherCondition = 'Clear' | 'Clouds' | 'Drizzle' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Mist';

export default function Index(): JSX.Element {
  const [weatherData, setWeatherData] = useState({
    temp: '',
    weather: '' as WeatherCondition,
  });

  const [currentDate, setCurrentDate] = useState('');

  const weatherIcons: Record<WeatherCondition, string> = {
    Clear: 'clear.png',
    Clouds: 'cloudy.png',
    Drizzle: 'drizzle.png',
    Rain: 'rain.png',
    Snow: 'snow.png',
    Thunderstorm: 'thunder.png',
    Mist: 'atmosphere.png'
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

    // 現在の日付を取得
    const date = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' } as const;
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  return (
    <Box bgImage={`/images/${weatherBackgrounds[weatherData.weather]}`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat">
      <Flex color='white'>
        <Flex flex={1} alignItems="center" minH="100vh" direction={'column'}>
          <Text fontSize={40} mt={10}>Vancouver, BC</Text>
          <Flex alignItems="center" mt={-14} gap={10}>
            <Image
              width={150}
              height={200}
              src={`/images/${weatherIcons[weatherData.weather]}`}
              alt={'weather icon'}
            />
            <Text fontSize={167}>{weatherData.temp}°C</Text>
          </Flex>
          <Text fontSize={40} mt={-14}>{weatherData.weather}</Text>
          <Flex alignItems="center" gap={10}>
            <Text fontSize={40}>{currentDate}</Text>
          </Flex>
          <SimpleGrid columns={2} spacing={10} width="80%">
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14} borderRadius='0.5em' backgroundColor='black' opacity='50%'>Wind</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14} borderRadius='0.5em' backgroundColor='black' opacity='50%'>Humidity</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14} borderRadius='0.5em' backgroundColor='black' opacity='50%'>Visibility</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14} borderRadius='0.5em' backgroundColor='black' opacity='50%'>Precipitation</Box>
          </SimpleGrid>
        </Flex>
        <Flex flex={1} alignItems="center" direction={'column'} justifyContent="center">
          <Link href="/pokemon">
            <Box w={200} h={200} bg="green.100" borderRadius="50%"></Box>
          </Link>
        </Flex>
      </Flex>
      <Nav />
    </Box>
  );
}
