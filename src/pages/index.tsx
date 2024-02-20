import { Box, Flex, Text, SimpleGrid } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Index(): JSX.Element {
  const [weatherData, setWeatherData] = useState({
    temp: '',
    weather: '',
  });

  const [currentDate, setCurrentDate] = useState('');

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
          weather: main,
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

  return (
    <Box>
      <Flex>
        <Flex flex={1} bg="red.100" alignItems="center" minH="100vh" direction={'column'}>
          <Text fontSize={40} mt={10}>Vancouver, BC</Text>
          <Flex alignItems="center" mt={-14} gap={10}>
            <Box w={100} h={100} bg="green.100" borderRadius="50%" mt={10}></Box>
            <Text fontSize={167}>{weatherData.temp}°C</Text>
          </Flex>
          <Text fontSize={40} mt={-14}>{weatherData.weather}</Text>
          <Flex alignItems="center" gap={10}>
            <Text fontSize={40}>{currentDate}</Text>
          </Flex>
          <SimpleGrid columns={2} spacing={10} width="80%">
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14}>Wind</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14}>Humidity</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14}>Visibility</Box>
            <Box bg='rgba(128,128,128,0.5)' textAlign="center" height={14}>Precipitation</Box>
          </SimpleGrid>
        </Flex>
        <Flex flex={1} bg="blue.100" alignItems="center" direction={'column'} justifyContent="center">
          <Link href="/pokemon">
            <Box w={200} h={200} bg="green.100" borderRadius="50%"></Box>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
