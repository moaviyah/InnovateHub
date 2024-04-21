import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Groom from './Groom';
import Favorites from './Favorites';
import About from './About';
import { Ionicons } from '@expo/vector-icons'; // Import your icon library
import { PRIMARY, SECONDARY } from '../colors';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const Navigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      // sceneContainerStyle={{marginBottom:10}}
      screenOptions={({ route }) => ({
        tabBarStyle:{height: height * 0.08, paddingVertical:5, backgroundColor:PRIMARY },
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? require('../assets/home.png') : require('../assets/home-outline.png');
          } else if (route.name === 'Groom') {
            iconName = focused ? require('../assets/connection.png') : require('../assets/connection-outline.png');
            size = focused ? 35 : 22;
          } else if (route.name === 'Favorites') {
            iconName = focused ? require('../assets/favorites.png') : require('../assets/favorites-outline.png');
            size = focused ? 35 : 22;
          } else if (route.name === 'About') {
            iconName = focused ? require('../assets/file.png') : require('../assets/file-outline.png');
            size = focused ? 35 : 22;
          } 
          const elevation = focused ? 8 : 0
          const shadowStyle = focused ? { shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4 } : {};
          return <Image  source={iconName} style={{height:24, width:24}} />;
        },
        tabBarLabel: ({ focused, color, fontWeight }) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
            color = focused ? 'white' : 'white'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'Groom') {
            label = 'Groom';
            color = focused ? 'white' : 'white'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'Favorites') {
            label = 'Favorites';
            color = focused ? 'white' : 'white'
            fontWeight = focused ? '600' : '400'
          } else if (route.name === 'About') {
            label = 'About';
            color = focused ? 'white' : 'white'
            fontWeight = focused ? '600' : '400'
          } 

          // You can return any component here that you want as the tab label.
          return <Text style={{ color, fontWeight }}>{label}</Text>;
        },
      })}
    >

      <Tab.Screen name="Home" component={Home} /> 
      <Tab.Screen name="Groom" component={Groom} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="About" component={About} />

    </Tab.Navigator>
  );
};

export default Navigator;