import React, { Component  ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,Button,Image,TextInput,FlatList
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import NumericInput from 'react-native-numeric-input'
import Constants from 'expo-constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
import FormButton from '../components/FormButton';
import Firebase from '../firebaseConfig';
// import { ImagePicker, Permissions } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';
import Card from '../components/Card';
import Toast from 'react-native-simple-toast';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';


const component1 = () => <Text>Properties</Text>
const component2 = () => <Text>Wishlist</Text>
const component3 = () => <Text>Unverified Props</Text>





class R1add extends Component {




  state = {
    count: 0
  }

  constructor (props) {
    super(props);
    this.state = {
      taluksData:[],
      action:null,
      image: null,
      imageURL:null,
      frequency:null,
      propType: 2,
      propSubtype: null,
      propPrice:0,
      propArea:0,
      bedCount:0,
      bathroomCount:0,
      selectedItems1: [],
      selectedItems2: [],
      region: {
     latitude: 13.067439,
     longitude: 80.237617,
     latitudeDelta: 0.1,
     longitudeDelta: 0.1
   },
   markers: [],
propDescription:null,
height:30,
contactNo:null,
mailId : null,
whatsappNo : null,
isLoading2: false,
isLoading1 : false,
isLoading3 : false,
wishlist:[],      
myProperties:[],
unverifiedProps:[]
    }

    this.updateIndex = this.updateIndex.bind(this)
   
  }

  
  updateIndex (selectedIndex) {

    // console.log(selectedIndex);

    this.setState({propType:selectedIndex})
  }




componentDidMount() {

    this.getData();
  }


  renderRow2 = ({ item }) => {

    const {user} = this.props.route.params;

    return (
                  <Card
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'NotMine',user:user})}
                 />
    )
  }

  renderRow3 = ({ item }) => {
    const {user} = this.props.route.params;
    return (
                  <Card
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'Verify',user:user})}
                 />
    )
  }


  deleteUser = () => {

    const {user} = this.props.route.params;  
    
    console.log(user);


    Firebase.database().ref('/properties/'+user.uid).remove().then(() => {
  
      Toast.show('User deleted successfully 👋', Toast.SHORT, [
  'UIAlertController',
  ]);
  
    }).catch((error) => {
        console.log(error);
    });
  
    Firebase.database().ref('/users/renters/'+user.uid).remove().then(() => {
  
      Toast.show('User deleted successfully 👋', Toast.SHORT, [
  'UIAlertController',
  ]);
  
    }).catch((error) => {
        console.log(error);
    });


  this.props.navigation.goBack();


  }

  getData = () => {

    const {user} = this.props.route.params;

    // console.log(user);

    var temp = user.wishlist;
    if(temp!=null && Object.keys(temp).length!=0)
    {
        var keys = Object.keys(temp);
        var x = [];
        for (var index = 0; index < keys.length; index++) {
        var key = keys[index];

        x.push(temp[key]);
        }

        this.setState({wishlist:x});
    }


    let dbRef = Firebase.database().ref('/properties/'+user.uid);
      if (dbRef) {
        dbRef.on('value', (data) => {

          // console.log(data.val());
          if (data.val()) {
            var temp2 = data.val();
            var keys2 = Object.keys(temp2);
            var x2 = [];
            var x3 = [];
            for (var index = 0; index < keys2.length; index++) {
              var key = keys2[index];
              if(temp2[key].isVerified)
              {
                x2.push(temp2[key]);
              }
              else if(temp2[key].isVerified==false)
              {
                x3.push(temp2[key]);
              }
              // x[index]['propID'] = key;
              //console.log(x[index]);
            }


this.setState({myProperties:x2,isLoading1:false});
this.setState({unverifiedProps:x3,isLoading3:false});
          }
          else {
        
          }
        });
      }


 


  }


  render () {
    const buttons = [{ element: component1 }, { element: component2 },{element:component3}]
     
    // console.log(this.state.user.uid);
    const navigation = this.props.navigation;

   

    return (

      <ScrollView keyboardShouldPersistTaps="handled">
    <View style={{padding:16}}>
                          <FormButton
                           buttonTitle="DELETE USER"
                           onPress={this.deleteUser}
                          />
                          </View>
      <View style={{ padding: 10 }}>
       

      </View>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.propType
        }
        buttons={buttons}
        containerStyle={{height: 40}} />

        {this.state.propType == 0 ?


               this.state.myProperties!=null && this.state.myProperties.length!=0 ? 

               <View style={{
                flex: 1,
                width: '90%',
                alignSelf: 'center'
            }}>
            <FlatList
                data={this.state.myProperties}
                renderItem={this.renderRow2}
                refreshing={this.state.isLoading1}
                onRefresh={this.getData}
                keyExtractor={(item) => item.propID}
            />
            </View>

            :

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
                }}>No properties has been posted by user</Text>
              </View>


          :

                this.state.propType==1 ? 

                this.state.wishlist!=null && this.state.wishlist.length!=0 ? 

                <View style={{
                  flex: 1,
                  width: '90%',
                  alignSelf: 'center'
                }}>
                <FlatList
                  data={this.state.wishlist}
                  renderItem={this.renderRow2}
                  refreshing={this.state.isLoading2}
                  onRefresh={this.getData}
                  keyExtractor={(item) => item.propID}
                />
              </View>
      
      :
      
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
          }}>No properties has been wished by user</Text>
        </View>
      
      


                :


                this.state.unverifiedProps!=null && this.state.unverifiedProps.length!=0 ? 

                <View style={{
                  flex: 1,
                  width: '90%',
                  alignSelf: 'center'
                }}>
                <FlatList
                  data={this.state.unverifiedProps}
                  renderItem={this.renderRow3}
                  refreshing={this.state.isLoading3}
                  onRefresh={this.getData}
                  keyExtractor={(item) => item.propID}
                />
              </View>
      
      :
      
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
          }}>No properties has been wished by user</Text>
        </View>
      
      


         
           }

</ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  textInputStyle: {
      height: 42,
      borderColor: '#2e64e5',
      borderWidth: 1,
      width: '75%',
      paddingHorizontal: 10,
      marginTop: 20
    },

  scrollView: {


  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f5e7ea',
    padding: 10,
    marginBottom: 10
  },categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 55,
    backgroundColor: '#87ceeb' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#000',
  },
  text: {
   fontSize: 21,
 },
 row: { flexDirection: 'row' },
 image: { width: 300, height: 300, backgroundColor: 'gray' },
 button: {
   padding: 13,
   margin: 15,
   backgroundColor: '#dddddd',
 },
})

export default R1add;