import useSWR from 'swr';
import { REFRESH_INTERVALS } from '../lib/constants';
import type { EventData } from '@shared/schema';

export const useEvents = () => {
  return useSWR<EventData>(
    '/api/events',
    {
      refreshInterval: REFRESH_INTERVALS.EVENTS_MS,
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );
};
