import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [weatherData, setWeatherData] = useState([]);
  const cities = ["New York", "London", "Tokyo", "Nairobi", "Kampala", "Paris"];

  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      const data = await response.json();
      return {
        city: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
      };
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
      return {
        city,
        temperature: "N/A",
        condition: "Error",
      };
    }
  }

  useEffect(() => {
    async function fetchAllWeather() {
      const results = await Promise.all(
        cities.map((city) => fetchWeather(city))
      );
      setWeatherData(results);
    }
    fetchAllWeather();
  }, []);

  if (weatherData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-xl font-medium text-gray-600 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {weatherData.map((weather) => (
        <WeatherCard
          key={weather.city}
          city={weather.city}
          temperature={weather.temperature}
          condition={weather.condition}
        />
      ))}
    </div>
  );
}

export default App;
