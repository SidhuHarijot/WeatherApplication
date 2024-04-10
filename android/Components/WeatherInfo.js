import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import citiesData from './worldcities.json';


const getClosestCity = (latitude, longitude) => {
    let closestCity = null;
    let minDistance = Infinity;
  

    for (const city of citiesData) {
        const cityLat = parseFloat(city.lat);
        const cityLng = parseFloat(city.lng);
        const distance = Math.sqrt(Math.pow(latitude - cityLat, 2) + Math.pow(longitude - cityLng, 2));

        if (distance < minDistance) {
            closestCity = city;
            minDistance = distance;
        }
    }

    return closestCity;
};

const getWeatherColors = (weatherCode) => {
    console.log(weatherCode);
    if (weatherCode >= 200 && weatherCode < 300) {
      // Thunderstorm
      return ['#1F1C2C'];
    } else if (weatherCode >= 300 && weatherCode < 400) {
      // Drizzle
      return ['#89F7FE'];
    } else if (weatherCode >= 500 && weatherCode < 600) {
      // Rain
      return ['#005AA7'];
    } else if (weatherCode >= 600 && weatherCode < 700) {
      // Snow
      return ['#E0EAFC'];
    } else if (weatherCode >= 700 && weatherCode < 800) {
      // Atmosphere (Mist, Smoke, Haze, etc.)
      return ['#3E5151'];
    } else if (weatherCode === 800) {
      // Clear
      return ['#56CCF2']; // Bright day
    } else if (weatherCode > 800 && weatherCode < 900) {
      // Clouds
      return ['#D7D2CC'];
    } else {
      // Default or unknown code
      return ['#4DA0B0']; // A generic pleasant gradient
    }
  };

const WeatherInfo = ({ latitude, longitude }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [weatherColor, setWeatherColor] = useState('#4DA0B0');

    useEffect(() => {
        // ... fetchWeather function
    
        if (data) {
          const newWeatherCode = data.current.weather[0].id;
          const newWeatherColor = getWeatherColors(newWeatherCode);
          setWeatherColor(newWeatherColor); // Update color based on the new weather code
        }
      }, [data]);
    
    useEffect(() => {console.log(latitude, longitude)}, []) 

    useEffect(() => {
        const apiKey = 'd7d549cd66f7d531611de0319937c1dc';
        const fetchWeather = async () => {
          try {
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`API call failed with status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
          } catch (error) {
            setError(`Failed to load weather data: ${error.message || error}`);
          } finally {
            setLoading(false);
          }
        };
      
        fetchWeather();
      }, [latitude, longitude]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
    }

    if (error) {
        return <Text style={{ color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20 }}>Failed to load weather data: {error} params: {latitude}, {longitude}</Text>;
    }

    const weatherCode = data.current.weather[0].id;
    const tempCelsius = (data.current.temp - 273.15).toFixed(0);
    const weather = data.current.weather[0];
    const closestCity = getClosestCity(latitude, longitude);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.cityText}>{closestCity.city}</Text>
            <Text style={styles.weatherDescription}>{weather.description}</Text>
            <Image
                style={styles.weatherIcon}
                source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}.png` }}
            />
            <Text style={styles.temperatureText}><Text style={{color: weatherColor}}>{tempCelsius}</Text>°C</Text>
            <Text style={styles.feelsLikeText}>Feels like <Text style={{color: weatherColor}}>{(data.current.feels_like - 273.15).toFixed(0)}</Text>°C</Text>
            <View style={styles.detailsContainer}>
                {[
                { title: 'Pressure', value: `${data.current.pressure} hPa`, icon: 'speed' },
                { title: 'Humidity', value: `${data.current.humidity}%`, icon: 'opacity' },
                { title: 'UV Index', value: data.current.uvi, icon: 'wb-sunny' },
                { title: 'Wind Speed', value: `${data.current.wind_speed} m/s`, icon: 'toys' },
                { title: 'Visibility', value: `${data.current.visibility / 1000} km`, icon: 'visibility' },
                { title: 'Cloudiness', value: `${data.current.clouds}%`, icon: 'cloud' },
                // Add more parameters here as needed
                ].reduce((acc, item, index, array) => {
                if (index % 2 === 0) acc.push(array.slice(index, index + 2));
                return acc;
                }, []).map((pair, index) => (
                <View key={index} style={styles.pairContainer}>
                    {pair.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <MaterialIcons name={item.icon} size={30} color="#fff" />
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardValue}>{item.value}</Text>
                    </View>
                    ))}
                </View>
                ))}
            </View>
        </ScrollView>
        )
};
    

const styles = StyleSheet.create({
    container: {
    flexGrow: 1,
    alignItems: 'center',
    },
    
    cityText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
    weatherDescription: {
        fontSize: 20,
        color: 'white',
        marginBottom: 10,
    },
    temperatureText: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    feelsLikeText: {
        fontSize: 20,
        marginBottom: 20,
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    }, 
    pairContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
        width: '95%',
        marginBottom: 10,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '46%', 
        marginHorizontal: '6%', 
    },
    cardTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 5,
    },weatherIcon: {
        width: 120,
        height: 120,
        marginBottom: 2,
    },
});


  
  
export default WeatherInfo;
