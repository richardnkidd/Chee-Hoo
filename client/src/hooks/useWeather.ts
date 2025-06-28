import useSWR from 'swr';
import { REFRESH_INTERVALS } from '../lib/constants';
import type { WeatherData } from '@shared/schema';

export const useWeather = () => {
  return useSWR<WeatherData>(
    '/api/weather',
    {
      refreshInterval: REFRESH_INTERVALS.WEATHER_MS,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
};
