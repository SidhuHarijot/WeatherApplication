import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, PermissionsAndroid } from 'react-native';
import WeatherInfo from './Components/WeatherInfo';
import LinearGradient from 'react-native-linear-gradient';
import { useTailwind } from 'tailwind-rn';

const WeatherScreen = ({route, navigation}) => {
  
    const {latitude, longitude} = route.params;
    const gradientColors = ['#0A192F', '#000000'];

    return (
        <View style={useTailwind('flex-1 justify-center items-center')}>
            
            <LinearGradient colors={gradientColors} style={styles.linearGradient}>
                {latitude ? (
                <WeatherInfo latitude={latitude} longitude={longitude} />
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
