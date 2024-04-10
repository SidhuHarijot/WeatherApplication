import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import WeatherInfo from './Components/WeatherInfo';
import LinearGradient from 'react-native-linear-gradient';
import { useTailwind } from 'tailwind-rn';

const WeatherScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This app needs to access your location.",
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission granted, get the location
            getCurrentLocation();
          } else {
            console.log("Location permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
    }
};

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    };

    requestLocationPermission();
  }, []);

  const gradientColors = ['#0A192F', '#000000'];

  return (
    <View style={useTailwind('flex-1 justify-center items-center')}>
        
        <LinearGradient colors={gradientColors} style={styles.linearGradient}>
            {location ? (
            <WeatherInfo latitude={location.latitude} longitude={location.longitude} />
            ) : (
                <Text style={useTailwind('text-base text-black')}>Fetching Location...</Text>
            )}
        </LinearGradient>
    </View>
  );
};

const styles = {
    linearGradient: {
        alignItems: 'center',
        paddingVertical: 20,
    },
}

export default WeatherScreen;
