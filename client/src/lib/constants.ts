export const REFRESH_INTERVALS = {
  WEATHER_MS: 900_000,    // 15 minutes
  TIDES_MS: 1_800_000,    // 30 minutes  
  MOVIES_MS: 86_400_000,  // 24 hours
  EVENTS_MS: 21_600_000   // 6 hours
} as const;

export const CACHE_KEYS = {
  WEATHER: 'weather',
  TIDES: 'tides', 
  MOVIES: 'movies',
  EVENTS: 'events'
} as const;

export const HONOLULU_COORDS = {
  lat: 21.3099,
  lng: -157.8581
} as const;

export const NOAA_STATION_ID = '1612340'; // Honolulu Harbor
