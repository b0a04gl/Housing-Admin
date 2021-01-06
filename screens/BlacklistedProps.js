import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import UserCard from '../components/UserCard';
import Firebase from '../firebaseConfig';
import Card from '../components/Card';

const Users = ({navigation}) => {

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
            if(temp[keys[i]].isBlacklisted==true)
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


const Properties = ({navigation}) => {

  const [blacklisted,setBlacklisted] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState(false);

  const renderRow = ({ item }) => {
    return (
      <Card
         itemData={item}
         onPress={()=> navigation.navigate('CardDetails', {itemData: item,type:'NotMine',user:null})}
     />
    )
  }

  const getData = () => {


    setIsLoading(true);

    let allusers = Firebase.database().ref('/properties');
       var useruids = [];
       if (allusers) {
         allusers.on('value', (data) => {

           if (data.val()) {
             var temp = data.val();
             var keys = Object.keys(temp);
             useruids = keys;
             }
           });
     }





   var required = [];

   for(var i=0;i<useruids.length;i++)
   {
   // console.log(useruids[i]);
   var ref = Firebase.database().ref("/properties/"+useruids[i]);

   ref.on("value", (data) => {

       // console.log(data.val());
       if (data.val()) {
         var temp = data.val();
         var keys = Object.keys(temp);
         // console.log(keys);
         var x = [];
         for (var index = 0; index < keys.length; index++) {
           var key = keys[index];
           if(temp[key].isVerified == 'blacklisted')
               required.push(temp[key]);

         };
       }
     });
   }

   if(required!=null)
   {
     setBlacklisted(required);
     setIsLoading(false);

   }
   else {
 setBlacklisted(required);
 setIsLoading(false);
   }



  }

    console.log("state :: "+blacklisted);
    if(blacklisted!=null && blacklisted.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center'
          }}>
          <FlatList
            data={blacklisted}
            renderItem={renderRow}
            refreshing={isLoading}
            onRefresh={getData}
            keyExtractor={item => item.propID.toString()}
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




const BlackListed = ({navigation}) => {

const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Properties" component={Properties} />
    </Tab.Navigator>
  );
}

export default BlackListed;

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




// import React from 'react';
//
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import Firebase from '../firebaseConfig';
// import Card from '../components/Card';
// import FormButton from '../components/FormButton';
//
// export default class BlackListedProps extends React.Component {
//   state = {
//     allusers: [],
//     isLoading: false,
//     blacklistedProperties:[]
//   }
//
//   renderRow = ({ item }) => {
//
//
//     return (
//                   <Card
//                      itemData={item}
//                      onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'NotMine',user:null})}
//                  />
//     )
//   }
//
//   componentDidMount(){
//     // this.getData();
//   }
//
//   getData = () => {
//
//
//     let allusers = Firebase.database().ref('/properties');
//     var useruids = [];
//     if (allusers) {
//       allusers.on('value', (data) => {
//
//         if (data.val()) {
//           var temp = data.val();
//           var keys = Object.keys(temp);
//           useruids = keys;
//           }
//         });
//   }
//
//
//
//
//
// var required = [];
//
// for(var i=0;i<useruids.length;i++)
// {
// // console.log(useruids[i]);
// var ref = Firebase.database().ref("/properties/"+useruids[i]);
//
// ref.on("value", (data) => {
//
//     // console.log(data.val());
//     if (data.val()) {
//       var temp = data.val();
//       var keys = Object.keys(temp);
//       console.log(keys);
//       var x = [];
//       for (var index = 0; index < keys.length; index++) {
//         var key = keys[index];
//         if(temp[key].isVerified == 'blacklisted')
//             required.push(temp[key]);
//
//       };
//     }
//   });
// }
//
// if(required!=null)
// {
// this.setState({blacklistedProperties:required,isLoading:false});
//
//
// }
// else {
//       this.setState({blacklistedProperties:required,isLoading:false});
// }
//
//
//
//   }
//
//   render() {
//
//
//
//
//
//     console.log("state :: "+this.state.blacklistedProperties);
//     if(this.state.blacklistedProperties!=null && this.state.blacklistedProperties.length!=0)
//     {
//       return (
//         <View style={{
//             flex: 1,
//             width: '90%',
//             alignSelf: 'center'
//           }}>
//           <FlatList
//             data={this.state.blacklistedProperties}
//             renderItem={this.renderRow}
//             refreshing={this.state.isLoading}
//             onRefresh={this.getData}
//             keyExtractor={item => item.propID.toString()}
//           />
//         </View>
//       )
//     }
//     else {
//
//
//
//       return (
//              <View style={{
//                backgroundColor: '#f9fafd',
//                flex: 1,
//                justifyContent: 'center',
//                alignItems: 'center',
//                padding: 20
//              }}>
//                <Text style={{
//                  fontSize: 20,
//                  color: '#333333'
//                }}>No properties posted by this {this.state.propSubtype} category</Text>
//                 <View style={{padding:16}}>
//                           <FormButton
//                            buttonTitle="REFRESH"
//                            onPress={() => {this.getData()}}
//                           />
//                           </View>
//              </View>
//            );
//     }
//   }
// }
