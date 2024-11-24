export const defaultLocations = [
  // USA
  {
    address: "123 Beachside Ave",
    city: "Miami",
    zip: "33139",
    country: "USA",
    continent: "North America",
    lat: 25.790654,
    lng: -80.130045,
  },
  // Norway
  {
    address: "NorskeGate 125",
    city: "Oslo",
    zip: "0166",
    country: "Norway",
    continent: "Europe",
    lat: 59.9139,
    lng: 10.7522,
  },
  {
    address: "Bergmans Gate 94",
    city: "Tønsberg",
    zip: "3118",
    country: "Norge",
    continent: "Europe",
    lat: 59.2736,
    lng: 10.4017,
  },
  // Sweden
  {
    address: "Skeppsbron 2",
    city: "Stockholm",
    zip: "11130",
    country: "Sweden",
    continent: "Europe",
    lat: 59.3293,
    lng: 18.0686,
  },
  // France
  {
    address: "12 Rue de Rivoli",
    city: "Paris",
    zip: "75001",
    country: "France",
    continent: "Europe",
    lat: 48.8566,
    lng: 2.3522,
  },
  // Spain
  {
    address: "Gran Vía, 28",
    city: "Madrid",
    zip: "28013",
    country: "Spain",
    continent: "Europe",
    lat: 40.4168,
    lng: -3.7038,
  },
  // Turkey
  {
    address: "İstiklal Cd. No:43",
    city: "Istanbul",
    zip: "34433",
    country: "Turkey",
    continent: "Asia",
    lat: 41.0082,
    lng: 28.9784,
  },
  // England
  {
    address: "221B Baker Street",
    city: "London",
    zip: "NW1 6XE",
    country: "England",
    continent: "Europe",
    lat: 51.5237,
    lng: -0.1586,
  },
  // Germany
  {
    address: "Unter den Linden",
    city: "Berlin",
    zip: "10117",
    country: "Germany",
    continent: "Europe",
    lat: 52.5163,
    lng: 13.3777,
  },
  // Italy
  {
    address: "Piazza San Marco",
    city: "Venice",
    zip: "30124",
    country: "Italy",
    continent: "Europe",
    lat: 45.434,
    lng: 12.338,
  },
  // Australia
  {
    address: "Bondi Beach",
    city: "Sydney",
    zip: "2026",
    country: "Australia",
    continent: "Oceania",
    lat: -33.8915,
    lng: 151.2767,
  },
  // Japan
  {
    address: "Shibuya Crossing",
    city: "Tokyo",
    zip: "150-0002",
    country: "Japan",
    continent: "Asia",
    lat: 35.6595,
    lng: 139.7004,
  },
  // Brazil
  {
    address: "Avenida Atlântica",
    city: "Rio de Janeiro",
    zip: "22021-001",
    country: "Brazil",
    continent: "South America",
    lat: -22.9707,
    lng: -43.1824,
  },
  // South Africa
  {
    address: "V&A Waterfront",
    city: "Cape Town",
    zip: "8001",
    country: "South Africa",
    continent: "Africa",
    lat: -33.9078,
    lng: 18.4202,
  },
  // Canada
  {
    address: "CN Tower",
    city: "Toronto",
    zip: "M5V 3L9",
    country: "Canada",
    continent: "North America",
    lat: 43.6426,
    lng: -79.3871,
  },
  // India
  {
    address: "Marine Drive",
    city: "Mumbai",
    zip: "400020",
    country: "India",
    continent: "Asia",
    lat: 18.9435,
    lng: 72.8236,
  },
];

export const getRandomLocation = () => {
  return defaultLocations[Math.floor(Math.random() * defaultLocations.length)];
};
