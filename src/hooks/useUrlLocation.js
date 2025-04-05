// we were now  able to pass this data here
// into all kinds of different components
// without having to store it anywhere inside a react App
// so we didn't have to create any new piece of state

import { useSearchParams } from "react-router-dom";

// but instead we just stored it in the url
export function useUrlLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const Lat = searchParams.get("lat");
  const Lng = searchParams.get("lng");
  return [Lat, Lng];
}
