// TODO: Replace with your actual OpenWeatherMap API key
// It's recommended to store API keys in environment variables or a secure configuration file.
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY_PLACEHOLDER';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Fetches current weather data for a given latitude and longitude.
 * @param {number} lat Latitude
 * @param {number} lon Longitude
 * @returns {Promise<object>} A promise that resolves to the weather data object.
 * @throws {Error} If the API request fails or returns an error.
 */
export const getCurrentWeather = async (lat, lon) => {
  if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_PLACEHOLDER') {
    console.warn('Using placeholder API key for OpenWeatherMap. Please replace it with your actual key in src/services/weatherService.js');
    // Return mock data or throw an error if you don't want to proceed without a real key
    // For this exercise, we'll return mock data to allow UI development.
    return Promise.resolve({
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 25 }, // Temperature in Celsius
      cod: 200,
    });
  }

  const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Weather API request failed: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    if (data.cod !== 200) {
        throw new Error(`Weather API error: ${data.message}`);
    }
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

// Example usage (for testing directly in this file if needed):
/*
(async () => {
  try {
    // Hardcoded location for San Francisco for testing
    const weather = await getCurrentWeather(37.7749, -122.4194);
    console.log('Weather in SF:', weather);
  } catch (error) {
    console.error('Failed to get weather:', error);
  }
})();
*/
