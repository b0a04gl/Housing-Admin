import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileStackNavigator ,WishlistStackNavigator,BlackListedPropsStackNavigator,ViewAllStackNavigator} from "./stacknav";
import BottomTabNavigator from "./tabnav";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />

      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
      <Drawer.Screen name="ViewUsers" component={WishlistStackNavigator} />
      <Drawer.Screen name="ViewAll" component={ViewAllStackNavigator} />
      <Drawer.Screen name="BlackListedProps" component={BlackListedPropsStackNavigator} />
    </Drawer.Navigator>

  );
}

export default DrawerNavigator;
