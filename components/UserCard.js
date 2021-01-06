import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../firebaseConfig';

const UserCard = ({itemData, onPress}) => {

const [isBlacklisted,setIsBlacklisted] = React.useState(itemData.isBlacklisted);



const handle = (flag) => {
  setIsBlacklisted(flag);
  Firebase.database().ref('/users/renters/'+itemData.uid+"/isBlacklisted").set(flag);
}



  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={require('../assets/user.jpg')}
            resizeMode="cover"
            style={styles.cardImg}
          />
        </View>
        <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{itemData.uid}</Text>


        <Text style={styles.cardDetails}>{itemData.email}</Text>
        <View style= {{alignItems: 'flex-end'}}>
        <MaterialCommunityIcons
          name='star'
          size={35}
          color={isBlacklisted == true ? "#000" : '#FF6347'}
          onPress = {() => {handle(!isBlacklisted)}}
        />
</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
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
    fontSize:15
  },
  cardDetails: {
    fontSize: 15,
    color: '#444',
  },
});
