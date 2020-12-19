import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileStackNavigator ,WishlistStackNavigator} from "./stacknav";
import BottomTabNavigator from "./tabnav";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />

      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
      <Drawer.Screen name="Wishlist" component={WishlistStackNavigator} />

    </Drawer.Navigator>

  );
}

export default DrawerNavigator;
