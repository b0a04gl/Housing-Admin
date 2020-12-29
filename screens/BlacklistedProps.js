import React from 'react';

import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../firebaseConfig';
import Card from '../components/Card';
import FormButton from '../components/FormButton';
export default class Wishlist extends React.Component {
  state = {
    allusers: [],
    isLoading: false
  }

  renderRow = ({ item }) => {
    

    return (
                  <Card
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'NotMine',user:null})}
                 />
    )
  }

  componentDidMount(){
    // this.getData();
  }

  getData = () => {


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
      console.log(keys);
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
this.setState({blacklistedProperties:required,isLoading:false});


}
else {
      this.setState({blacklistedProperties:required,isLoading:false});
}



  }

  render() {


   


    console.log("state :: "+this.state.blacklistedProperties);
    if(this.state.blacklistedProperties!=null && this.state.blacklistedProperties.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center'
          }}>
          <FlatList
            data={this.state.blacklistedProperties}
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
