import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

function WeatherCard(props) {
  // Pick icon based on condition
  const getWeatherIcon = (cond) => {
    const lower = cond.toLowerCase();
    if (lower.includes("sun") || lower.includes("clear")) return <WiDaySunny className="text-yellow-400 text-6xl" />;
    if (lower.includes("cloud")) return <WiCloud className="text-gray-500 text-6xl" />;
    if (lower.includes("rain")) return <WiRain className="text-blue-500 text-6xl" />;
    if (lower.includes("snow")) return <WiSnow className="text-cyan-400 text-6xl" />;
    if (lower.includes("storm") || lower.includes("thunder")) return <WiThunderstorm className="text-purple-600 text-6xl" />;
    return <WiCloud className="text-gray-400 text-6xl" />; // default
  };

  return (
    <div className="max-w-xs w-full bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center space-y-4 transition hover:scale-105 hover:shadow-xl">
      {/* City */}
      <h1 className="text-xl font-semibold text-gray-800">{props.city}</h1>

      {/* Icon */}
      {getWeatherIcon(props.condition)}

      {/* Temperature */}
      <h2 className="text-4xl font-bold text-blue-600">{props.temperature}°C</h2>

      {/* Condition */}
      <h3 className="text-lg text-gray-600 capitalize">{props.condition}</h3>
    </div>
  );
}

export default WeatherCard;
