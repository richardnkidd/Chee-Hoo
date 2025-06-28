import useSWR from 'swr';
import { REFRESH_INTERVALS } from '../lib/constants';
import type { TideData } from '@shared/schema';

export const useTides = () => {
  return useSWR<TideData>(
    '/api/tides',
    {
      refreshInterval: REFRESH_INTERVALS.TIDES_MS,
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
};
