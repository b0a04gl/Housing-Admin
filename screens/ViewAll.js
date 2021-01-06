import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import UserCard from '../components/UserCard';
import Firebase from '../firebaseConfig';


const Rentee = ({navigation}) => {

const [allusers,setAllUsers] = React.useState([]);
const [isLoading,setIsLoading] = React.useState(false);

const renderRow = ({ item }) => {
  return (
                <UserCard
                   itemData={item}
                   onPress={()=> navigation.navigate('UserCardDetailsRentee', {user: item})}
               />
  )
}

const getData = () => {


  setIsLoading(true);

  var users = [];

  Firebase.database().ref('/users/renters').on('value', (data) => {

      if (data.val()) {
          var keys = Object.keys(data.val());
          var temp = data.val();

          for(var i=0;i<keys.length;i++)
          {
            if(temp[keys[i]].wishlist!=null && temp[keys[i]].wishlist.length!=0 && temp[keys[i]].isBlacklisted==false)
              users.push(temp[keys[i]]);
          }

      }


});


if(users!=null)
{

setAllUsers(users);
setIsLoading(false);

}
else {
  setAllUsers(users);
  setIsLoading(false);
}


}

  console.log("state :: "+allusers);
  if(allusers!=null && allusers.length!=0)
  {
    return (
      <View style={{
          flex: 1,
          width: '90%',
          alignSelf: 'center'
        }}>
        <FlatList
          data={allusers}
          renderItem={renderRow}
          refreshing={isLoading}
          onRefresh={getData}
          keyExtractor={item => item.uid.toString()}
        />
      </View>
    )
  }
  else {



    return (
           <View style={{
             backgroundColor: '#f9fafd',
             flex: 1,
             justifyContent: 'center',
             alignItems: 'center',
             padding: 20
           }}>
             <Text style={{
               fontSize: 20,
               color: '#333333'
             }}>No properties posted by this user</Text>
              <View style={{padding:16}}>
                        <FormButton
                         buttonTitle="REFRESH"
                         onPress={getData}
                        />
                        </View>
           </View>
         );
  }
}


const Renter = ({navigation}) => {

  const [allusers,setAllUsers] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState(false);

  const renderRow = ({ item }) => {
    return (
                  <UserCard
                     itemData={item}
                     onPress={()=> navigation.navigate('UserCardDetailsRenter', {user: item})}
                 />
    )
  }

  const getData = () => {


    setIsLoading(true);

    var users = [];

    Firebase.database().ref('/users/renters').on('value', (data) => {

        if (data.val()) {
            var keys = Object.keys(data.val());
            var temp = data.val();

            for(var i=0;i<keys.length;i++)
            {
              if(temp[keys[i]].isBlacklisted==false)    
                users.push(temp[keys[i]]);
            }

        }


  });


  var required1 = [];

  for(var i=0;i<users.length;i++)
  {
    // console.log(useruids[i]);
    var ref = Firebase.database().ref("/properties/"+users[i].uid);

    ref.once("value", (data) => {

        // console.log(data.val());
        if (data.val()) {
            required1.push(users[i]);
        }
      });
  }


  if(required1!=null)
  {

  setAllUsers(users);
  setIsLoading(false);

  }
  else {
    setAllUsers(users);
    setIsLoading(false);
  }


  }

    console.log("state :: "+allusers);
    if(allusers!=null && allusers.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center'
          }}>
          <FlatList
            data={allusers}
            renderItem={renderRow}
            refreshing={isLoading}
            onRefresh={getData}
            keyExtractor={item => item.uid.toString()}
          />
        </View>
      )
    }
    else {



      return (
             <View style={{
               backgroundColor: '#f9fafd',
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               padding: 20
             }}>
               <Text style={{
                 fontSize: 20,
                 color: '#333333'
               }}>No properties posted by this user</Text>
                <View style={{padding:16}}>
                          <FormButton
                           buttonTitle="REFRESH"
                           onPress={getData}
                          />
                          </View>
             </View>
           );
    }
}




const ViewAll = ({navigation}) => {

const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Rentee" component={Rentee} />
      <Tab.Screen name="Renter" component={Renter} />
    </Tab.Navigator>
  );
}

export default ViewAll;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
