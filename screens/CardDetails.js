import React, {useRef,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import qs from 'qs';
import call from 'react-native-phone-call';
import FormButton from '../components/FormButton';
import { SliderBox } from 'react-native-image-slider-box';
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

import Firebase from '../firebaseConfig';

 async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;

    let url = `mailto:${to}`;

    // Create email link query
    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if (query.length) {
        url += `?${query}`;
    }

    // check if we can use this link
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
        throw new Error('Provided URL can not be handled');
    }

    return Linking.openURL(url);
}

function Amenities ({ name,icon,index,color,category })  {


  return (
    <TouchableOpacity style = {styles.categoryContainer}>


      <MaterialCommunityIcons
        name={icon}
        size={16}
        color='#fff'

      />
      <Text style={styles.category}>{name}</Text>

    </TouchableOpacity>
  );

};



const CardItemDetails = ({navigation,route}) => {


const [imageIndex,setImageIndex] = useState(null);
  const itemData = route.params.itemData;
  // console.log("ID>>>>>>>>>>>>>" +itemData.propID )
  const type = route.params.type;
  const navTitleView = useRef(null);

  // console.log("region  "+itemData.markers[0].latlng.latitude);

  var locations = itemData.locations;

  var description = `Furnished Apartment For Rent In A Residential Complex, Al Olaya, North Riyadh
The Residence located in Al Olaya district. Nearby kingdom tower

It offers gym 24 hours, high-speed Wi-Fi, with private entrance and security CCTV cameras 24-hour, BBQ area.\n
The apartment designed for Executive and senior it is suitable for corporate and travelers' leisure with hospitality service.\n`;

const miscellaneous = itemData.amenities[0];
const HealthFitness = itemData.amenities[1];
const RecreationFamily = itemData.amenities[2];
const Building = itemData.amenities[3];
const Security = itemData.amenities[4];
const TransportationTechnology = itemData.amenities[5];
const Services = itemData.amenities[6];

const frequency = itemData.frequency==null ? 'Only' : itemData.frequency;



const updateStatus = (status) => {

    const user = route.params.user;

    console.log("Update status!!!!!!!1"+status);

    if(status==true)
    {
      Firebase.database().ref('/properties/'+user.uid+"/"+itemData.propID+"/isVerified").set(true);
    }
    else if(status==false)
    {
      Firebase.database().ref('/properties/'+user.uid+"/"+itemData.propID+"/isVerified").set(false);
    }
    else if(status=='blacklist')
    {
      Firebase.database().ref('/properties/'+user.uid+"/"+itemData.propID+"/isVerified").set('blacklisted');
    }

    navigation.goBack();

};

const initiateCall = () => {
    // Check for perfect 10 digit length

var mobileNumber = itemData.contactNo;

    if (mobileNumber.length != 10) {
      Alert.alert('Please insert correct contact number');
      return;
    }

    const args = {
      number: mobileNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };


const initiateMail = () => {

  var mailto = itemData.mailId;

  sendEmail(
    mailto,
    'Request for proposal!',
    "Hey there! I'm interested in buying/selling/leasing the property you posted,which is located in "+locations
).then(() => {
    console.log('Our email successful provided to device mail ');
});

};



const initiateWhatsApp = () => {
  var mobileNumber = itemData.whatsappNo;

var whatsAppMsg = "Hey there! I'm interested in buying/selling/leasing the property you posted,which is located in "+locations;
    // Check for perfect 10 digit length

   

    if (mobileNumber.length != 10) {
      Alert.alert('Please insert correct WhatsApp number');
      return;
    }


    console.log(whatsAppMsg);


    // Using 91 for India
    // You can change 91 with your country code
    let url =
      'whatsapp://send?text=' +
       whatsAppMsg +
      '&phone=91' + mobileNumber;
    Linking.openURL(url)
      .then((data) => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        Alert. alert('Make sure Whatsapp installed on your device');
      });
};




const deleteProperty = () => {

  const user = route.params.user;

  Firebase.database().ref('/properties/'+user.uid+"/"+itemData.propID).remove().then(() => {

    Toast.show('Property deleted successfully 👋', Toast.SHORT, [
'UIAlertController',
]);

  }).catch((error) => {
      console.log(error);
  });

navigation.navigate('Home');

};



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{ uri: itemData.imageURL}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>

            <Text style={styles.imageTitle}>{itemData.propType+"    |   "+itemData.propSubtype}</Text>

          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.propType+"    |   "+itemData.propSubtype}</Text>

          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>${itemData.propPrice+" "+frequency} </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.title}>{locations}</Text>


            </View>

          </View>
        </TriggeringView>



        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Specifications</Text>
                  <View style={styles.categories}>

                      <View style={styles.categoryContainer}>
                        <MaterialCommunityIcons
                          name="bed-empty"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.category}>{itemData.bedCount+" Beds"}</Text>
                      </View>


                      <View style={styles.categoryContainer}>
                        <MaterialCommunityIcons
                          name="toilet"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.category}>{itemData.bathroomCount+" Baths"}</Text>
                      </View>

                      <View style={styles.categoryContainer}>
                      <MaterialCommunityIcons
                        name="vector-square"
                        size={16}
                        color="#fff"
                      />
                        <Text style={styles.category}>{itemData.propArea+" Sq ft"}</Text>
                      </View>
                  </View>
                </View>




                <View style={[styles.section,styles.sectionLarge]}>

                <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.sectionContent}>{itemData.propDescription}</Text>
                </View>


                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Amenities / Features</Text>
                          <View style={styles.categories}>

                          {miscellaneous!=null ?

                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>Miscellaneous</Text>
                                      <View style={[styles.categories]}>

                                      {miscellaneous.map((am,index)=> (
                                        <Amenities
                                          name={am.name}
                                          icon={am.icon}
                                          key={am.index}
                                          index={am.index}
                                          color={am.color}
                                          category= {am.category}
                                        />
                                      ))}
                                      </View>
                                    </View>
                              :
                              null

                          }


                          {HealthFitness != null  ?

                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>Health and Fitness</Text>
                                      <View style={styles.categories}>

                                      {HealthFitness.map((am,index)=> (
                                        <Amenities
                                          name={am.name}
                                          icon={am.icon}
                                          key={am.index}
                                          index={am.index}
                                          color={am.color}
                                          category= {am.category}
                                        />
                                      ))}
                                      </View>
                                    </View>

                              :
                              null
                          }

                          {RecreationFamily != null ?

                            <View style={styles.section}>
                                                <Text style={styles.sectionTitle}>Recreation and Family</Text>
                                      <View style={styles.categories}>


                                        {RecreationFamily.map((am,index)=> (
                                          <Amenities
                                            name={am.name}
                                            icon={am.icon}
                                            key={am.index}
                                            index={am.index}
                                            color={am.color}
                                            category= {am.category}
                                          />
                                        ))}

                                      </View>
                                    </View>

                                    : null
                          }

                          {Building != null ?

                            <View style={styles.section}>
                                      <Text style={styles.sectionTitle}>Building</Text>
                            <View style={styles.categories}>


                                {Building.map((am,index)=> (
                                  <Amenities
                                    name={am.name}
                                    icon={am.icon}
                                    key={am.index}
                                    index={am.index}
                                    color={am.color}
                                    category= {am.category}
                                  />
                                ))}
                            </View>
                          </View>

                          :

                          null

                          }

                            {Security != null ?

                              <View style={styles.section}>
                                                  <Text style={styles.sectionTitle}>Security</Text>
                                        <View style={styles.categories}>


                                        {Security.map((am,index)=> (
                                          <Amenities
                                            name={am.name}
                                            icon={am.icon}
                                            key={am.index}
                                            index={am.index}
                                            color={am.color}
                                            category= {am.category}
                                          />
                                        ))}
                                        </View>
                                      </View>

                                    : null

                            }


                            {TransportationTechnology!=null ?

                              <View style={styles.section}>
                                                  <Text style={styles.sectionTitle}>Transportation & Technology</Text>
                                        <View style={styles.categories}>

                                        {TransportationTechnology.map((am,index)=> (
                                          <Amenities
                                            name={am.name}
                                            icon={am.icon}
                                            key={am.index}
                                            index={am.index}
                                            color={am.color}
                                            category= {am.category}
                                          />
                                        ))}

                                        </View>
                                      </View>

                                      :

                                      null
                            }


                              {Services != null ?

                                <View style={styles.section}>
                                                    <Text style={styles.sectionTitle}>Services</Text>
                                          <View style={styles.categories}>

                                          {Services.map((am,index)=> (
                                            <Amenities
                                              name={am.name}
                                              icon={am.icon}
                                              key={am.index}
                                              index={am.index}
                                              color={am.color}
                                              category= {am.category}
                                            />
                                          ))}

                                          </View>
                                        </View>

                                          :
                                          null

                              }



                          </View>
                        </View>

                        <View style={{paddingTop: 0,
                        flex: 1}}>

<Text style={[styles.sectionTitle,{padding:20}]}>Gallery</Text>
                        <SliderBox
                            images={itemData.gallery}
                            sliderBoxHeight={400}
                            autoplay
                            circleLoop
                            dotColor="#2e64e5"
                            currentImageEmitter={index => {

                                setImageIndex(index)
                            }
                            } />


                          </View>

        <View style={[styles.section, {height: 250}]}>

  <Text style={styles.sectionTitle}>Geo Locations</Text>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: itemData.markers[0].latlng.latitude,
              longitude: itemData.markers[0].latlng.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}>

          {  itemData.markers.map((m, i) => (
                <MapView.Marker key={i} coordinate={m.latlng} />
            ))
}

          </MapView>
        </View>


                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Contact Details</Text>
                          <View style={{
                            flexDirection: 'row',


                          }}>
<TouchableOpacity style = {styles.categoryContainer2}>

                                <MaterialCommunityIcons
                                  name="phone"
                                  size={28}
                                  color="#fff"
                                  onPress={initiateCall}
                                />

                          </TouchableOpacity>


                            <TouchableOpacity style = {styles.categoryContainer2}>
                                <MaterialCommunityIcons
                                  name="whatsapp"
                                  size={28}
                                  color="#fff"
                                  onPress={initiateWhatsApp}
                                />

                                  </TouchableOpacity>

                              <TouchableOpacity style = {styles.categoryContainer2} >
                              <MaterialCommunityIcons
                                name="email"
                                size={28}
                                color="#fff"
                                onPress={initiateMail}
                              />

                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={{padding:16}}>
                          <FormButton
                           buttonTitle="DELETE PROPERTY"
                           onPress={deleteProperty}
                          />
                          </View>
                         


                        {
                          type == 'Verify' ?

                          <View style={styles.section}>
                                    
                          <View style={{
                            flexDirection: 'row',


                          }}>


<View style={{padding:12,paddingHorizontal:10}}>
                          <FormButton
                           buttonTitle="APPROVE"
                           onPress={() =>{updateStatus(true)}}
                          />

                          </View>

                          <View style={{padding:12,paddingHorizontal:10}}>
                          <FormButton
                           buttonTitle="DECLINE"
                           onPress={() => {updateStatus(false)}}
                          />

                          </View>
                          
                          <View style={{padding:12,paddingHorizontal:1}}>
                          <FormButton
                           buttonTitle="BLACKLIST"
                           onPress={() =>{updateStatus('blacklist')}}
                          />

                          </View>

                          </View>
                        </View>


                        :

                        null


                        }




      </HeaderImageScrollView>
    </View>
  );
};

export default CardItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 25,
    paddingBottom:15,
    fontWeight: 'bold',
    color:'#000'
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  categoryContainer2: {
    flexDirection: 'row',
    backgroundColor: '#008000',
padding: 12,
margin: 1,
paddingHorizontal: 38,
  },

  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
