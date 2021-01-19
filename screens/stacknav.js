import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View} from 'react-native';

import HomeScreen from './HomeScreen';
import EditHome from './EditHome';
import ViewUsers from './ViewUsers';
import UserCardDetails from './UserCardDetails';
import CardDetails from './CardDetails';
import BlackListedProps from './BlacklistedProps';
import CardListScreen from './CardListScreen';
import Profile from './Profile';
import ViewAll from './ViewAll';
import UserCardDetailsRentee from './UserCardDetailsRentee';
import UserCardDetailsRenter from './UserCardDetailsRenter';
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


<Stack.Screen
          name="CardListScreen"
          component={CardListScreen}
          options={({route}) => ({
            title: route.params.title,
            headerBackTitleVisible: false,
          headerTitleAlign: 'center',

          })}
        />


<Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            // title: route.params.title,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

          })}
        />

      </Stack.Navigator>
  );
}

const WishlistStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ViewUsers" component={ViewUsers}
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

<Stack.Screen name="UserCardDetails" component={UserCardDetails}
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



<Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            // title: route.params.title,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

          })}
        />


    </Stack.Navigator>
  );
}

const ViewAllStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ViewAll" component={ViewAll}
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

<Stack.Screen name="UserCardDetails" component={UserCardDetails}
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

      <Stack.Screen name="UserCardDetailsRentee" component={UserCardDetailsRentee}
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

            <Stack.Screen name="UserCardDetailsRenter" component={UserCardDetailsRenter}
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
<Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            // title: route.params.title,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

          })}
        />


    </Stack.Navigator>
  );
}



const BlackListedPropsStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>

<Stack.Screen
          name="BlackListedProps"
          component={BlackListedProps}
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

        }}
        />

<Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            // title: route.params.title,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',

          })}
        />
    </Stack.Navigator>
  );
}

const ProfileStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile}

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


export { MainStackNavigator, WishlistStackNavigator,ViewAllStackNavigator,BlackListedPropsStackNavigator,ProfileStackNavigator };
