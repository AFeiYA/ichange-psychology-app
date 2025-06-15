import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Card, Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import { getCurrentWeather } from '../../services/weatherService';
import { globalStyles, COLORS, FONT_SIZES } from '../../constants/theme';

// Default location (e.g., London, UK) - Used if permission denied or fetching fails
const DEFAULT_LOCATION = {
  latitude: 51.5074,
  longitude: -0.1278,
};

const generateFortune = (weatherData, locationName = "your current location") => {
  const hour = new Date().getHours();
  let weatherCondition = 'clear'; // Default
  let temperature = 20; // Default

  if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    weatherCondition = weatherData.weather[0].main.toLowerCase();
  }
  if (weatherData && weatherData.main) {
    temperature = weatherData.main.temp;
  }

  let fortune = `For ${locationName}: `;

  if (hour < 6 || hour > 22) { // Night time
    fortune += 'The night is calm and full of mystery. ';
  } else if (hour < 12) { // Morning
    fortune += 'Good morning! A fresh start awaits. ';
  } else if (hour < 18) { // Afternoon
    fortune += 'The day is in full swing. Seize the moment! ';
  } else { // Evening
    fortune += 'As evening approaches, reflect on your day. ';
  }

  switch (weatherCondition) {
    case 'clear':
      fortune += 'With clear skies, your path ahead looks bright and open. ';
      break;
    case 'clouds':
      fortune += 'Though clouds may gather, there is always a silver lining. Look for it. ';
      break;
    case 'rain':
      fortune += 'Rainy days are perfect for introspection and nurturing ideas. ';
      break;
    case 'snow':
      fortune += 'The world is hushed under a blanket of snow; a time for quiet contemplation. ';
      break;
    case 'thunderstorm':
      fortune += 'A storm is brewing! Expect sudden changes and powerful energy. ';
      break;
    case 'drizzle':
      fortune += 'A gentle drizzle falls, reminding you to appreciate the small things. ';
      break;
    default:
      fortune += 'Whatever the weather, make today uniquely yours. ';
  }

  if (temperature > 28) {
    fortune += 'It\'s quite warm; remember to stay hydrated and cool.';
  } else if (temperature < 10) {
    fortune += 'Chilly weather invites cozy comforts and warm thoughts.';
  }

  return fortune.trim();
};


const DailyFortuneScreen = () => {
  const [fortune, setFortune] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState('Fetching location...');

  const fetchWeatherData = async (latitude, longitude, locationName = "your current location") => {
    try {
      setError(null);
      setIsLoading(true);
      const weather = await getCurrentWeather(latitude, longitude);
      const generatedFortune = generateFortune(weather, locationName);
      setFortune(generatedFortune);
    } catch (e) {
      console.error("Failed to fetch weather/fortune:", e);
      setError(`Could not fetch weather for ${locationName}. Using a general fortune.`);
      setFortune('Even when the path is unclear, your inner strength guides you.');
    } finally {
      setIsLoading(false);
    }
  };

  const requestLocationAndFetchWeather = async () => {
    setIsLoading(true);
    setLocationStatus('Requesting location permission...');
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setLocationStatus('Permission to access location was denied. Using default location.');
      setError('Location permission denied. Showing fortune for a default location.');
      await fetchWeatherData(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, "our default location");
      return;
    }

    try {
      setLocationStatus('Fetching current position...');
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLocationStatus(`Location fetched: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
      await fetchWeatherData(position.coords.latitude, position.coords.longitude);
    } catch (locationError) {
      console.error("Error fetching location:", locationError);
      setLocationStatus('Failed to fetch location. Using default location.');
      setError('Could not fetch your location. Showing fortune for a default location.');
      await fetchWeatherData(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude, "our default location");
    }
  };

  useEffect(() => {
    requestLocationAndFetchWeather();
  }, []);

  return (
    <ScrollView contentContainerStyle={globalStyles.screenContainer}>
      <Card containerStyle={styles.card}>
        <Text h2Style={[globalStyles.h2, styles.title]} h2>Your Daily Fortune</Text>
        <Card.Divider />

        <Text style={styles.locationStatusText}>{locationStatus}</Text>

        <View style={styles.imagePlaceholder}>
          <Icon name="weather-partly-cloudy" type="material-community" size={60} color={COLORS.accent_teal} />
          <Text style={globalStyles.secondaryText}>Weather-Inspired Wisdom</Text>
        </View>

        {isLoading ? (
          <View style={styles.centeredContent}>
            <ActivityIndicator size="large" color={COLORS.ink_green} />
            <Text style={[globalStyles.secondaryText, { marginTop: 10 }]}>Summoning insights...</Text>
          </View>
        ) : error ? (
          <View style={styles.centeredContent}>
            <Icon name="alert-circle-outline" type="material-community" size={40} color={COLORS.error_red} />
            <Text style={globalStyles.errorText}>{error}</Text>
            <Text style={[globalStyles.primaryText, styles.fortuneText]}>{fortune}</Text>
          </View>
        ) : (
          <Text style={[globalStyles.primaryText, styles.fortuneText]}>{fortune}</Text>
        )}

        <Button
          title="Refresh Fortune"
          onPress={requestLocationAndFetchWeather}
          disabled={isLoading}
          icon={<Icon name="refresh" type="material-community" color={isLoading ? COLORS.medium_grey : COLORS.white} style={{marginRight: 8}}/>}
          containerStyle={styles.retryButtonContainer}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  locationStatusText: {
    ...globalStyles.secondaryText,
    fontSize: FONT_SIZES.xs,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: COLORS.light_blue, // Using a theme color
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    borderRadius: 90, // Make it circular
    borderWidth: 2,
    borderColor: COLORS.accent_teal,
  },
  centeredContent: {
    alignItems: 'center',
    marginVertical: 20,
  },
  fortuneText: {
    fontSize: FONT_SIZES.lg,
    lineHeight: FONT_SIZES.lg * 1.6,
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  retryButtonContainer: {
    marginTop: 30,
    width: '70%',
    alignSelf: 'center',
  }
});

export default DailyFortuneScreen;
