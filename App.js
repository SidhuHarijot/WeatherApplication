import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherScreen from './android/WeatherScreen';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import {SettingsProvider} from './android/Components/SettingsContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from './android/SearchScreen';
import GeneralWeatherScreen from './android/GeneralWeatherScreen';


const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen name="WeatherInfo" component={GeneralWeatherScreen} />
    </SearchStack.Navigator>
  );
}


function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <TailwindProvider utilities={utilities}>
          <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Weather') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search-circle' : 'search-circle-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: {
              backgroundColor: 'black',
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 15,
            },
            topBarIconStyle: {
              width: 30,
              height: 30,
              marginBottom: 10,
            },

          })} initialRouteName="Weather">
            <Tab.Screen name="Weather" component={WeatherScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
          </Tab.Navigator>
        </TailwindProvider>
      </NavigationContainer>
    </SettingsProvider>
  );
}

export default App;
