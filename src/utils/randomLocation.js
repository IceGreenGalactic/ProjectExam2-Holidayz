const defaultLocations = [
  {
    address: "123 Beachside Ave",
    city: "Miami",
    zip: "33139",
    country: "USA",
    lat: 25.790654,
    lng: -80.130045,
  },
  {
    address: "456 Mountain View Lane",
    city: "Aspen",
    zip: "81611",
    country: "USA",
    lat: 39.1911,
    lng: -106.8175,
  },
  {
    address: "789 Sunset Blvd",
    city: "Los Angeles",
    zip: "90028",
    country: "USA",
    lat: 34.098342,
    lng: -118.326744,
  },
  {
    address: "1 Ocean Breeze",
    city: "Malibu",
    zip: "90265",
    country: "USA",
    lat: 34.025922,
    lng: -118.779757,
  },
];

export const getRandomLocation = () => {
  return defaultLocations[Math.floor(Math.random() * defaultLocations.length)];
};
