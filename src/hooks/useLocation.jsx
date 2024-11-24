import { useEffect, useState } from "react";
import { getRandomLocation, defaultLocations } from "../utils/randomLocation";

const useLocation = (id, singleVenue) => {
  const [randomLocation, setRandomLocation] = useState(null);

  useEffect(() => {
    const locationKey = `randomLocation_${id}`;
    const savedLocation = localStorage.getItem(locationKey);
    let parsedSavedLocation = savedLocation ? JSON.parse(savedLocation) : null;

    if (!singleVenue?.location?.country) {
      const randomLocation = parsedSavedLocation || getRandomLocation();
      setRandomLocation(randomLocation);
      localStorage.setItem(locationKey, JSON.stringify(randomLocation));
      return;
    }

    const matchedLocation = defaultLocations.find(
      (loc) => loc.country === singleVenue.location.country
    );

    if (matchedLocation) {
      setRandomLocation(matchedLocation);
      localStorage.setItem(locationKey, JSON.stringify(matchedLocation));
    } else if (parsedSavedLocation) {
      setRandomLocation(parsedSavedLocation);
    } else {
      const fallbackLocation = getRandomLocation();
      setRandomLocation(fallbackLocation);
      localStorage.setItem(locationKey, JSON.stringify(fallbackLocation));
    }
  }, [id, singleVenue]);

  return randomLocation;
};

export default useLocation;
