import { getWeatherDescription, getWeatherIcon } from '../utils/weatherApi';

const WeatherCard = ({ weatherData, cityInfo }) => {
  const { current_weather, hourly } = weatherData;
  
  // Get current hour index for additional data
  const currentTime = new Date(current_weather.time);
  const currentHour = currentTime.getHours();
  
  // Find the closest hour in hourly data
  const currentHourIndex = hourly.time.findIndex(time => {
    const hourlyTime = new Date(time);
    return hourlyTime.getHours() === currentHour && 
           hourlyTime.getDate() === currentTime.getDate();
  });
  
  const humidity = currentHourIndex >= 0 ? hourly.relative_humidity_2m[currentHourIndex] : null;
  const windSpeed = current_weather.windspeed;
  const temperature = current_weather.temperature;
  const weatherCode = current_weather.weathercode;
  const isDay = current_weather.is_day === 1;
  
  const weatherIcon = getWeatherIcon(weatherCode, isDay);
  const weatherDescription = getWeatherDescription(weatherCode);
  
  return (
    <div className="relative group max-w-xl mx-auto">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
      <div className="relative rounded-3xl p-8 sm:p-10 bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white mb-1 drop-shadow">{cityInfo.name}</h2>
          {!!cityInfo.country && (<p className="text-purple-100/90 text-sm">{cityInfo.country}</p>)}
          <p className="text-xs text-purple-100/80 mt-1">
            {new Date(current_weather.time).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        
        {/* Main weather info */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 drop-shadow-sm">{weatherIcon}</div>
          <div className="text-5xl font-extrabold text-white mb-2">
            {Math.round(temperature)}°C
          </div>
          <div className="text-lg text-purple-100/90 capitalize">
            {weatherDescription}
          </div>
        </div>
        
        {/* Weather details */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="rounded-2xl p-4 text-center bg-white/20 border border-white/20 text-white">
            <div className="text-2xl mb-2">💨</div>
            <div className="text-xs text-purple-100/90">Wind Speed</div>
            <div className="font-semibold">{windSpeed} km/h</div>
          </div>
          
          {humidity !== null && (
            <div className="rounded-2xl p-4 text-center bg-white/20 border border-white/20 text-white">
              <div className="text-2xl mb-2">💧</div>
              <div className="text-xs text-purple-100/90">Humidity</div>
              <div className="font-semibold">{humidity}%</div>
            </div>
          )}
          
          <div className="rounded-2xl p-4 text-center bg-white/20 border border-white/20 text-white">
            <div className="text-2xl mb-2">🌡️</div>
            <div className="text-xs text-purple-100/90">Feels like</div>
            <div className="font-semibold">{Math.round(temperature)}°C</div>
          </div>
          
          <div className="rounded-2xl p-4 text-center bg-white/20 border border-white/20 text-white">
            <div className="text-2xl mb-2">{isDay ? '☀️' : '🌙'}</div>
            <div className="text-xs text-purple-100/90">Time of day</div>
            <div className="font-semibold">{isDay ? 'Day' : 'Night'}</div>
          </div>
        </div>
        
        {/* Last updated */}
        <div className="text-center mt-6 text-xs text-purple-100/80">
          Last updated: {new Date(current_weather.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
