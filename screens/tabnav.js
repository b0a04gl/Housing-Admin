import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator, WishlistStackNavigator,ProfileStackNavigator } from "./stacknav";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainStackNavigator}
      options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="home" color={color} size={size} />
      ),
    }}
       />

    
      <Tab.Screen name="Profile" component={ProfileStackNavigator}
      options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
       />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
