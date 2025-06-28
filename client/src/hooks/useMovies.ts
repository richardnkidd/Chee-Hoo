import useSWR from 'swr';
import { REFRESH_INTERVALS } from '../lib/constants';
import type { MovieData } from '@shared/schema';

export const useMovies = () => {
  return useSWR<MovieData>(
    '/api/movies',
    {
      refreshInterval: REFRESH_INTERVALS.MOVIES_MS,
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );
};
