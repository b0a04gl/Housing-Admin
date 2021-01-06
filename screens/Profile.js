import React, { useContext } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from '../firebaseConfig';
import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';

const currentUser = Firebase.auth().currentUser;

const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3"
};

const tasks = [

  {
    id:0,
    task: "Name",
    icon: "account-tie",
    theme: "#008b8b",
    stamp: "The name appears in welcome note!"
  },
  {
        id:1,
    task: "Email",
    icon: "email",
    theme: "#008b8b",
    stamp: "The email account synced with app!"
  },
  {
    id:2,
    task: "Phone",
    icon: "phone",
    theme: "#008b8b",
    stamp: "The name appears in welcome note!"
  }
  ,
  {
        id:3,
    task: "Transaction",
    icon: "lock-alert",
    theme: "#008b8b",
    stamp: "The Password synced with app!"
  },
  {
        id:4,
    task: "Subscription",
    icon: "delete",
    theme: "#008b8b",
    stamp: "Delete the user account created!"
  },
];

function Task ({ task, icon, theme, stamp,navigation,user })  {

var detail = '';

if(task == 'Name')
{
  detail =   user.displayName!=null ? user.displayName : "Anonymous";
}
else if(task == 'Email')
{
  detail = user.email;
}
else if(task == 'Phone')
{
  detail = user.phoneNumber!=null ? user.phoneNumber : 'Not Provided';
}
else {
  detail = task;
}


  return (
    <View
      style={{
        backgroundColor: colors.white,
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          style={{ color: theme, marginRight: 5 }}
        />
        <View>
          <Text style={{ fontSize: 20,paddingHorizontal:25}}>{detail}</Text>

        </View>
      </View>



    </View>
  );
};

export default function R1Profile(props) {

  const { logout} = useContext(AuthContext);
// const [initializing, setInitializing] = useState(user.);
const {navigation,route} = props;

const user = props.user;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.themeColor
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />


        <View
          style={{
            padding: 20,
            flexDirection: "row",
            backgroundColor: colors.background,
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: 20
          }}
        >
          <Text style={{ fontSize: 24 }}>Profile</Text>
           <AntDesign name="user" size={30} style={{ color: colors.themeColor }} />
        </View>

        <ScrollView
          style={{
            backgroundColor: colors.background
          }}
        >
          {tasks.map(task => (
            <Task
              task={task.task}
              icon={task.icon}
              theme={task.theme}
              stamp={task.stamp}
              navigation = {navigation}
              user = {user}
            />
          ))}
        </ScrollView>


      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },

});
