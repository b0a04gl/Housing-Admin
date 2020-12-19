// import React, { useContext } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import FormButton from '../components/FormButton';
// import { AuthContext } from '../navigation/AuthProvider';

// const HomeScreen = () => {
//   const {user, logout} = useContext(AuthContext);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome {user.uid}</Text>
//       <FormButton buttonTitle='Logout' onPress={() => logout()} />
//     </View>
//   );
// }

// export default HomeScreen;

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

{/* <View style={styles.slide}>
            
<Image
  source={require('../assets/banners/house-banner1.jpg')}
  resizeMode="cover"
  style={styles.sliderImage}
/>
</View>
<View style={styles.slide}>
<Image
  source={require('../assets/banners/house-banner2.jpg')}
  resizeMode="cover"
  style={styles.sliderImage}
/>
</View>
<View style={styles.slide}>
<Image
  source={require('../assets/banners/house-banner3.jpg')}
  resizeMode="cover"
  style={styles.sliderImage}
/>
</View>
<View style={styles.slide}>
<Image
  source={require('../assets/banners/house-banner4.jpg')}
  resizeMode="cover"
  style={styles.sliderImage}
/>
</View>
<View style={styles.slide}>
<Image
  source={require('../assets/banners/house-banner5.jpg')}
  resizeMode="cover"
  style={styles.sliderImage}
/>
</View> */}

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Firebase from '../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

const ImageUi = ({source}) => {
  return(
    <View style={styles.slide}>
            <Image
              source={{ uri: source}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
  );
}

const HomeScreen = ({navigation}) => {

  const [imagesDeck,setImagesDeck] = React.useState([]);

  React.useEffect(() => {
    Firebase.database().ref('/admin/imagesDeck').on('value', (data) => {
     
          if (data.val()) {
             setImagesDeck(data.val());
          }
      
  }
  );
  }, []);

  var user = Firebase.auth().currentUser;

  var currUser = {
    uid : user.uid,
    displayName : user.displayName,
    email : user.email,
    
  };




  Firebase.database().ref('/users/renters/'+user.uid).set(currUser).then(() => {

  }).catch((error) => {
      console.log(error);
  });


  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle='light-content' />
     
      <View style={styles.sliderContainer}>
      
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347">


                {imagesDeck.map((am,index)=> (
                              <ImageUi
                               source={am.uri}
                              />
                            ))}

         
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Apartment'})
          }>
          <View style={styles.categoryIcon}>
          <MaterialCommunityIcons
            name="home-group"
            size={35}
            color="#FF6347"
          />
          </View>
          <Text style={styles.categoryBtnTxt}>Apartment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate('CardListScreen', {title: 'Villa'})
          }>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="home-outline"
              size={35}
              color="#FF6347"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Villa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
          navigation.navigate('CardListScreen', {title: 'Office'})}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="office-building" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Office</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
          navigation.navigate('CardListScreen', {title: 'Hotel'})}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Hotel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
          navigation.navigate('CardListScreen', {title: 'Warehouse'})}>
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="warehouse" size={35} color="#FF6347"  />
          </View>
          <Text style={styles.categoryBtnTxt}>Warehouse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>
          navigation.navigate('CardListScreen', {title: 'Shop'})}>
          <View style={styles.categoryIcon}>
          <MaterialCommunityIcons
            name="cart-arrow-up"
            size={35}
            color="#FF6347"
          />
          </View>
          <Text style={styles.categoryBtnTxt}>Shop</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
          }}>
          Recently Added
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/house-banner2.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Place</Text>

            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/house-banner3.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Place</Text>

            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/house-banner4.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Place</Text>

            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
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
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});