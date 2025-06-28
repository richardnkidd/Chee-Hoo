import { useQuery } from "@tanstack/react-query";

/**
 * HNL default coords point at Ala Moana Bowls – adjust as needed.
 */
const DEFAULT_BREAK = { name: "Ala Moana Bowls", lat: 21.276, lng: -157.822 };

export function useSurf(breakInfo = DEFAULT_BREAK) {
  const { lat, lng } = breakInfo;

  return useQuery({
    queryKey: [`/api/surf?lat=${lat}&lng=${lng}`], // queryKey[0] is the endpoint string used by your default queryFn
    staleTime: 30 * 60 * 1000, // half-hour cache
  });
}
