import { WeatherCondition } from '../typing';

export const weatherIcons: Record<WeatherCondition, string> = {
  Clear: 'clear.png',
  Clouds: 'cloudy.png',
  Drizzle: 'drizzle.png',
  Rain: 'rain.png',
  Thunderstorm: 'thunder.png',
  Mist: 'atmosphere.png',
  Snow: 'snow.png',
};

export const weatherBackgrounds: Record<WeatherCondition, string> = {
  Clear: 'sun-background.png',
  Clouds: 'cloudy-background.png',
  Drizzle: 'rain-background.png',
  Rain: 'rain-background.png',
  Snow: 'snow-background.png',
  Thunderstorm: 'thunder-background.png',
  Mist: 'atmosphere.png'
};

export const getWeatherBasedPokemonType = (weather: WeatherCondition): string => {
  let pokemonType: string;
  switch (weather) {
    case 'Clear':
      pokemonType = 'normal';
      break;
    case 'Clouds':
      pokemonType = 'fairy';
      break;
    case 'Drizzle':
    case 'Rain':
      pokemonType = 'water';
      break;
    case 'Snow':
      pokemonType = 'ice';
      break;
    case 'Thunderstorm':
      pokemonType = 'electric';
      break;
    case 'Mist':
      pokemonType = 'ghost';
      break;
    default:
      pokemonType = 'normal';
  }
  console.log(weather, 'Pokémon Type:', pokemonType);
  return pokemonType;
};
