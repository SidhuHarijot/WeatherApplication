import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import WeatherInfo from './Components/WeatherInfo'; // Import the WeatherInfo component
import citiesData from './Components/worldcities.json';
import LinearGradient from 'react-native-linear-gradient';

const SearchPage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearch = (query) => {
    const filtered = citiesData.filter(city =>
      city.city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const handleCityPress = (city) => {
    navigation.navigate('WeatherInfo', { latitude: city.lat, longitude: city.lng });
  };
  const gradientColors = ['#0A192F', '#000000'];

  return (
    <View style={styles.container}>
        <LinearGradient colors={gradientColors} style={styles.linearGradient}>
            <TextInput
                style={styles.textInput}
                placeholderTextColor="#ccc"
                placeholder="Search for a city"
                value={searchQuery}
                onChangeText={text => {
                setSearchQuery(text);
                handleSearch(text);
                }}
            />
            <FlatList
                data={filteredCities}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.cityItem} onPress={() => handleCityPress(item)}>
                    <Text style={styles.cityText}>{item.city}</Text>
                </TouchableOpacity>
                )}
            />
        </LinearGradient>
    </View>
  );
};

// React Native StyleSheet for styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 50, // Increased height
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15, // Increased padding
    fontSize: 18, // Larger font size
    color: 'white', // White text color for the input
    marginVertical: 20, // Add vertical spacing
    marginHorizontal: 20, // Add horizontal spacing
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly transparent background
  },
  cityItem: {
    paddingVertical: 15, // More vertical padding
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginHorizontal: 20, // Add horizontal spacing
  },
  cityText: {
    fontSize: 18,
    color: 'white', // White text color for the city names
  },
  linearGradient: {
    flex: 1, // Take up all available space
    width: '100%', // Ensure the gradient background covers the whole width
  },
});

export default SearchPage;
