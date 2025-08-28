// Utility functions for weather API

/**
 * Fetch coordinates for a given city name using Open-Meteo Geocoding API
 * @param {string} cityName - Name of the city
 * @returns {Promise<Object>} - Promise resolving to coordinates and city info
 */
export const fetchCityCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch city coordinates');
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('City not found');
    }
    
    const city = data.results[0];
    return {
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    };
  } catch (error) {
    throw new Error(`Error fetching city coordinates: ${error.message}`);
  }
};

/**
 * Fetch current weather data using Open-Meteo Weather API
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object>} - Promise resolving to weather data
 */
export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};

/**
 * Get weather description based on weather code
 * @param {number} weatherCode - Weather code from Open-Meteo API
 * @returns {string} - Human readable weather description
 */
export const getWeatherDescription = (weatherCode) => {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  
  return weatherCodes[weatherCode] || 'Unknown weather condition';
};

/**
 * Get weather icon based on weather code and time of day
 * @param {number} weatherCode - Weather code from Open-Meteo API
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - Emoji icon for the weather
 */
export const getWeatherIcon = (weatherCode, isDay = true) => {
  if (weatherCode === 0) return isDay ? '☀️' : '🌙';
  if (weatherCode >= 1 && weatherCode <= 3) return isDay ? '⛅' : '🌙';
  if (weatherCode === 45 || weatherCode === 48) return '🌫️';
  if (weatherCode >= 51 && weatherCode <= 57) return '🌦️';
  if (weatherCode >= 61 && weatherCode <= 67) return '🌧️';
  if (weatherCode >= 71 && weatherCode <= 77) return '❄️';
  if (weatherCode >= 80 && weatherCode <= 86) return '🌧️';
  if (weatherCode >= 95 && weatherCode <= 99) return '⛈️';
  
  return '🌤️';
};
