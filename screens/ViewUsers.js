import React from 'react';

import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../firebaseConfig';
import UserCard from '../components/UserCard';
import FormButton from '../components/FormButton';
export default class Wishlist extends React.Component {
  state = {
    allusers: [],
    isLoading: false
  }

  renderRow = ({ item }) => {
    return (
                  <UserCard
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('UserCardDetails', {user: item})}
                 />
    )
  }

  componentDidMount(){
    // this.getData();
  }

  getData = () => {


    this.setState({isLoading:true});

    var users = [];

    Firebase.database().ref('/users/renters').on('value', (data) => {
     
        if (data.val()) {
            var keys = Object.keys(data.val());
            var temp = data.val();

            for(var i=0;i<keys.length;i++)
            {
                users.push(temp[keys[i]]);
            }

        }
        
    
});


if(users!=null)
{
  this.setState({allusers:users,isLoading:false});


}
else {
        this.setState({allusers:users,isLoading:false});
}


  }

  render() {


   


    console.log("state :: "+this.state.allusers);
    if(this.state.allusers!=null && this.state.allusers.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center'
          }}>
          <FlatList
            data={this.state.allusers}
            renderItem={this.renderRow}
            refreshing={this.state.isLoading}
            onRefresh={this.getData}
            keyExtractor={(item) => item.uid}
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
               }}>No properties posted by this {this.state.propSubtype} category</Text>
                <View style={{padding:16}}>
                          <FormButton
                           buttonTitle="REFRESH"
                           onPress={() => {this.getData()}}
                          />
                          </View>
             </View>
           );
    }
  }
}
