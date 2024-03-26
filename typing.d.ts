export interface WeatherData {
    precipitation: ReactNode;
    visibility: ReactNode;
    humidity: ReactNode;
    wind: any;
    windSpeed: any;
    temp: string;
    weather: WeatherCondition;
  }
  
  export type WeatherCondition = 'Clear' | 'Clouds' | 'Drizzle' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Mist';
  

export interface Forecast {
  temp: string;
  weather: WeatherCondition;
}
