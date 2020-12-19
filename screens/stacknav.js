import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View} from 'react-native';

import HomeScreen from './HomeScreen';
import EditHome from './EditHome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';

// import { MaterialCommunityIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();



const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4263ec",  elevation: 0,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf:'center'
        },
};



const MainStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title : 'Housing',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Icon.Button
                  name="ios-menu"
                  size={25}
                  color='#fff'
                  backgroundColor='#4263ec'
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', marginRight: 25}}>
               <AntDesign name="edit" size={25} color="#fff"
                onPress={() => navigation.navigate("EditHome")}
               />

              </View>
            ),
          }}
        />

<Stack.Screen
          name="EditHome"
          component={EditHome}
          options={{
            title : 'EditHome',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Icon.Button
                  name="ios-menu"
                  size={25}
                  color='#fff'
                  backgroundColor='#4263ec'
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            ),
          
          }}
        />

      </Stack.Navigator>
  );
}

const WishlistStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Wishlist" component={HomeScreen}
      options={{

               headerTitleAlign: 'center',
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),
               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'

                   />

                 </View>
               ),
           }}

      />




    </Stack.Navigator>
  );
}

const MyPropertyStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>



    </Stack.Navigator>
  );
}

const ProfileStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={HomeScreen}

      options={{

               headerTitleAlign: 'center',
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),

               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'

                   />

                 </View>
               ),
           }}

      />

    

    </Stack.Navigator>
  );
}


export { MainStackNavigator, WishlistStackNavigator,ProfileStackNavigator };
