import type { WeatherData } from '@shared/schema';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || process.env.OPENWEATHERMAP_API_KEY || '';
const HONOLULU_LAT = 21.3099;
const HONOLULU_LON = -157.8581;

export async function getWeatherData(): Promise<WeatherData> {
  if (!OPENWEATHER_API_KEY) {
    throw new Error('OpenWeatherMap API key not configured. Please add OPENWEATHER_API_KEY to your environment.');
  }

  try {
    // Fetch current weather
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${HONOLULU_LAT}&lon=${HONOLULU_LON}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    if (!currentResponse.ok) {
      if (currentResponse.status === 401) {
        console.error('Invalid OpenWeatherMap API key provided');
        throw new Error('Invalid API key. Please check your OpenWeatherMap API key configuration.');
      }
      throw new Error(`Weather API responded with status: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${HONOLULU_LAT}&lon=${HONOLULU_LON}&appid=${OPENWEATHER_API_KEY}&units=imperial`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API responded with status: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily forecasts
    const dailyForecasts = forecastData.list
      .filter((_: any, index: number) => index % 8 === 0) // Every 8th item (24 hours apart)
      .slice(0, 3)
      .map((item: any) => {
        const date = new Date(item.dt * 1000);
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        return {
          date: date.toISOString().split('T')[0],
          day: date.getDate() === new Date().getDate() ? 'Today' : dayNames[date.getDay()],
          icon: item.weather[0].icon,
          highTemp: Math.round(item.main.temp_max),
          lowTemp: Math.round(item.main.temp_min),
          condition: item.weather[0].main,
        };
      });

    const weatherData: WeatherData = {
      current: {
        temp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        uvIndex: 0, // UV Index not available in basic API, would need separate call
        wind: `${Math.round(currentData.wind.speed)} mph ${getWindDirection(currentData.wind.deg)}`,
        pressure: `${(currentData.main.pressure * 0.02953).toFixed(2)} in`,
        icon: currentData.weather[0].icon,
      },
      forecast: dailyForecasts,
      lastUpdated: new Date().toISOString(),
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (error instanceof Error && error.message.includes('Invalid API key')) {
      throw new Error('The OpenWeatherMap API key is invalid. Please get a valid API key from openweathermap.org/api');
    }
    throw error;
  }
}



function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
