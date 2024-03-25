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


export const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};