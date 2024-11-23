import React, { useEffect, useState } from "react";

const Weather = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!latitude || !longitude) {
      setError("Invalid location data");
      setLoading(false);
      return;
    }

    const fetchWeather = async () => {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherRes.json();
        const { temperature, wind_speed, humidity, weathercode } =
          weatherData.current_weather;

        setWeather({
          temperature,
          wind_speed,
          humidity,
          weather_state_name: weathercode,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (loading) {
    return <span>Loading weather...</span>;
  }

  if (error) {
    return <span>{error}</span>;
  }

  if (!weather) {
    return <span>No weather data available</span>;
  }

  const { temperature } = weather;

  return (
    <span className="weather">
      <span> {temperature}°C</span>
    </span>
  );
};

export default Weather;
