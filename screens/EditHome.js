// import React, { useContext } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import FormButton from '../components/FormButton';
// import { AuthContext } from '../navigation/AuthProvider';

// const EditHome = () => {
//   const {user, logout} = useContext(AuthContext);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome {user.uid}</Text>
//       <FormButton buttonTitle='Logout' onPress={() => logout()} />
//     </View>
//   );
// }

// export default EditHome;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f9fafd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 20,
//     color: '#333333'
//   }
// });

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-simple-toast';
import FormButton from '../components/FormButton';
import Firebase from '../firebaseConfig';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const categories1 = [
    {
      name : 'Apartment',
      icon : 'home-group',
      color : '#fff',
      index : 0,
      isSelected : false,
      cat : 1,
    },
  
    {
      name : 'Villa',
      icon : 'home-outline',
      color : '#fff',
      index : 1,
      isSelected : false,
      cat : 1,
    },
    {
      name : 'Building',
      icon : 'home-city-outline',
      color : '#fff',
      index : 2,
      isSelected : false,
      cat : 1,
    },
    {
      name : 'Hotel',
      icon : 'food-fork-drink',
      color : '#fff',
      index : 3,
      isSelected : false,
      cat : 1,
    }
   
  ];

const categories2 = [
    
    {
      name : 'Office',
      icon : 'office-building',
      color : '#fff',
      index : 0,
      isSelected : false,
      cat : 2,
    },
    
    {
      name : 'Warehouse',
      icon : 'warehouse',
      color : '#fff',
      index : 1,
      isSelected : false,
      cat : 2,
    },
    
    {
      name : 'Shop',
      icon : 'cart-arrow-up',
      color : '#fff',
      index : 2,
      isSelected : false,
      cat : 2,
    },
    {
        name : 'Showroom',
        icon : 'shopping-search',
        color : '#fff',
        index : 3,
        isSelected : false,
        cat : 2,
    }
];

  class Category extends React.Component
  {
  
    constructor(props)
    {
  
        super(props);
  
        this.state = {
          name : this.props.name,
          icon : this.props.icon,
          index : this.props.index,
          color : '#fdeae7',
          isSelected : false,
          cat : this.props.cat,
        }
  
  this.save = this.save.bind(this)
  
  
    }
  
  save = () => {
  
    if(!this.state.isSelected)
    {
      this.setState({isSelected:true,color:'#008000'});
    }
    else {
      this.setState({isSelected:false,color:'#fdeae7'});
    }
  
  
  
  
  
  
  
  }
  
  
      render()
      {
  
  
        if(this.state.cat==1)
            categories1[this.state.index].isSelected = this.state.isSelected;
        else
            categories2[this.state.index].isSelected = this.state.isSelected;
      
       
        return (
            <TouchableOpacity
            style={[styles.categoryBtn,]}
            onPress={this.save}>
            <View style={[styles.categoryIcon,{backgroundColor: this.state.color}]}>
            <MaterialCommunityIcons
              name={this.state.icon}
              size={35}
              color="#FF6347"
            />
            </View>
            <Text style={styles.categoryBtnTxt}>{this.state.name}</Text>
          </TouchableOpacity>
        );
      }
  }
  
  
  


export default class EditHome extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            imagesDeck: [],
            cards: [],
            imageIndex: 0,
            header: '',
            image: require('../assets/add.png'),
            smallText: '',
            bigText: '',
            showCardModal: false,
            showImageModal: false,
            deleteImageNames: [],
            flag: false,
            alertflag: true,
        };

    }

    componentDidMount() {

        this._isMounted = true;
        Firebase.database().ref('/admin/imagesDeck').on('value', (data) => {
            if (this._isMounted) {
                if (data.val()) {
                    this.setState({
                        imagesDeck: data.val(),
                    });
                }
            }
        }
        );

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    AddImageHandler = async (key) => {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }
        let URI = pickerResult.uri;
        const imageName = URI.substring(URI.lastIndexOf('/') + 1);
        const response = await fetch(URI);
        const blob = await response.blob();

        if(blob != null)
        {
          Toast.show('Wait for some seconds for uploading image 👋', Toast.SHORT, [
        'UIAlertController',
        ]);
        }

        Firebase
            .storage()
            .ref(imageName)
            .put(blob)
            .then((snapshot) => {
              Toast.show('Image uploaded successfully 👋', Toast.SHORT, [
        'UIAlertController',
        ]);
                snapshot.ref.getDownloadURL().then((url) => {
                    if (key == 'deck') {
                        this.setState({
                            imagesDeck: [...this.state.imagesDeck, {
                                imgName: imageName,
                                uri: url,
                            }],
                        });

                    }

                });
            })
            .catch((e) => console.log('uploading image error => ', e));
        // console.log(this.state.imagesDeck);
    };

    DeleteImageHandler = index => {
        if (this.state.imagesDeck.length > 0) {
            const imageDeckArray = this.state.imagesDeck;
            const imageRef = imageDeckArray.splice(index, 1);
            if (imageRef[0]) {
                const imageName = imageRef[0].imgName;
                this.setState({
                    deleteImageNames: [...this.state.deleteImageNames, imageName],
                    imagesDeck: imageDeckArray,
                });
            }
        }
    };





    closeModal = () => {
        this.setState({
            showImageModal: false,
            showCardModal: false,
            header: '',
        });
    };

    SaveToDatabase = () => {
        this.setState({
            alertflag: true,
        });

       

        
        if (this.state.flag) {
            if (this.state.deleteImageNames.length > 0) {
                this.state.deleteImageNames.map(imageName =>
                    Firebase.storage().ref(imageName).delete().then(() => {
                        console.log(`${imageName} has been deleted successfully.`);
                    })
                        .catch((e) => console.log('error on image deletion => ', e)));
                this.setState({
                    deleteImageNames: [],
                })
            }
        }
        if (this.state.alertflag) {
            Toast.show('Contents updated', Toast.LONG);
        }
        else {
            Toast.show('Error occured while updating', Toast.LONG);
        }


        if (this.state.imagesDeck.length > 0) {

            Firebase.database().ref('/admin/imagesDeck').set(this.state.imagesDeck).then(() => {
            }).catch((error) => {
                console.log(error);
            });

            

          

            this.props.navigation.navigate('HomeScreen',{

            gallery: this.state.imagesDeck,

            })
        }
        else {
            Alert.alert('Slider Deck Error', 'Choose atleast one image for image Slider');
            this.setState({ alertflag: false, });
        }


    };


    render() {
        return (
            <View style={styles.screen}>

                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={this.AddImageHandler.bind(this, 'deck')}>
                        <Image source={require('../assets/add.png')} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Image Deck </Text>
                    <TouchableOpacity onPress={this.DeleteImageHandler.bind(this, this.state.imageIndex)}>
                        <Image source={require('../assets/delete.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageDeck}>
                    <SliderBox
                        images={this.state.imagesDeck}
                        sliderBoxHeight={195}
                        
                        circleLoop={true}
                        resizeMode={'contain'}
                        currentImageEmitter={index => {
                            this.setState({
                                imageIndex: index,
                            });
                        }
                        } />
                </View>


              <View style={{padding:30}}>
             <FormButton
               buttonTitle="DONE"
               onPress={this.SaveToDatabase}
             />
             </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    screen: {
        paddingTop: 0,
        flex: 1,
    },

    iconContainer: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    image: {
        height: 30,
        width: 30,
        paddingHorizontal: 10
    },

    imageDeck: {
        elevation: 5,
        height: 195,
        borderColor: 'black',
        borderWidth: 1,
    },

    bottomContainer: {
        alignItems: 'center',
        marginVertical: 40,
        marginBottom: 60,
    },

    addImage: {
        height: 50,
        width: 50,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardModalScreen: {
        height: 200,
        width: '85%',
        borderRadius: 15,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    imageModalScreen: {
        height: 400,
        width: '85%',
        borderRadius: 20,
        justifyContent: 'center',
        elevation: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },

    cardImageContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardImage: {
        height: 80,
        width: 80,
        marginVertical: 20,
        resizeMode: 'contain',
        justifyContent: 'center',
    },

    modalText: {
        paddingLeft: 15,
        marginTop: 10,
    },

    modalTextInput: {
        width: '90%',
        marginVertical: 10,
        padding: 5,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },

    modalTextInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15,
    },

    modalButton: {
        padding: 10,
        width: '30%',
    },

    footer: {
        backgroundColor: '#ec2F4B',
        padding: 15,
        elevation: 10,
        borderRadius: 10,
        margin: 5,
        alignItems: 'center',
      },

      footerText: {
        color: 'white',
      },

      categoryContainer: {
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
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
      },
      categoryBtnTxt: {
        alignSelf: 'center',
        marginTop: 5,
        color: '#de4f35',
      },
      sectionTitle: {
        fontSize: 20,
        paddingBottom:15,
        fontWeight: 'bold',
        color:'#000',
        marginTop:30,
        marginLeft:20,
      }    

});