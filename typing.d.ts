export interface WeatherData {
    temp: string;
    weather: WeatherCondition;
  }
  
  export type WeatherCondition = 'Clear' | 'Clouds' | 'Drizzle' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Mist';
  