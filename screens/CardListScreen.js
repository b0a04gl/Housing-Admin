import React from 'react';

import { View, Text, Button, FlatList, StyleSheet,ScrollView } from 'react-native';
import Firebase from '../firebaseConfig';
import Card from '../components/Card';
import { ButtonGroup } from 'react-native-elements';

const component1 = () => <Text>Verified Props</Text>
const component2 = () => <Text>Unverified Props</Text>

export default class CardListScreen extends React.Component {
  state = {
    myProperties: [],
    unverifiedProps: [],
    verifiedProps: [],
    isLoading2: false,
    isLoading1:false,
    isLoading3:false,
    propType: 0,


  }


constructor(props)
{

    super(props);
    this.updateIndex = this.updateIndex.bind(this)
}

  renderRow = ({ item }) => {

    var user = null;

    Firebase.database().ref('/users/renters/'+item.uid).on('value', (data) => {

        if (data.val()) {
           user = data.val();

        }


});


    return (
                  <Card
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'Verify',user:user})}
                 />
    )
  }


  updateIndex (selectedIndex) {

    // console.log(selectedIndex);

    this.setState({propType:selectedIndex})
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {


    const route = this.props.route;

    const propSubtype = route.params.title;



this.setState({propSubtype:propSubtype , isLoading:true});

    let allusers = Firebase.database().ref('/properties');
          var useruids = [];
          if (allusers) {
            allusers.on('value', (data) => {

              // console.log(data.val());
              if (data.val()) {
                var temp = data.val();
                var keys = Object.keys(temp);
                useruids = keys;
                }
              });
        }

    var required1 = [];
    var required2 = [];
    for(var i=0;i<useruids.length;i++)
    {
      // console.log(useruids[i]);
      var ref = Firebase.database().ref("/properties/"+useruids[i]);
      var query = ref.orderByChild("propSubtype").equalTo(propSubtype);
      query.once("value", (data) => {

          // console.log(data.val());
          if (data.val()) {
            var temp = data.val();
            var keys = Object.keys(temp);
            var x = [];
            for (var index = 0; index < keys.length; index++) {
              var key = keys[index];
               temp[key]['uid'] = useruids[i];
            if(temp[key].isVerified == true)
                  required1.push(temp[key]);
            else if(temp[key].isVerified == false)
                  required2.push(temp[key]);
            };
          }
        });
    }

    if(required1!=null && required2!=null)
    {
      this.setState({verifiedProps:required1,unverifiedProps:required2,isLoading:false});


    }
    else {
        this.setState({verifiedProps:required1,unverifiedProps:required2,isLoading:false});
    }


  }

  render()
  {

    const buttons = [{ element: component1 }, { element: component2 }];


        return(

            <ScrollView keyboardShouldPersistTaps="handled">
                <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={this.state.propType
                }
                buttons={buttons}
                containerStyle={{height: 40}} />

                {this.state.propType == 0 ?


                       this.state.verifiedProps!=null && this.state.verifiedProps.length!=0 ?

                       <View style={{
                        flex: 1,
                        width: '90%',
                        alignSelf: 'center'
                    }}>
                    <FlatList
                        data={this.state.verifiedProps}
                        renderItem={this.renderRow}
                        refreshing={this.state.isLoading1}
                        onRefresh={this.getData}
                        keyExtractor={item => item.propID.toString()}
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



                        this.state.unverifiedProps!=null && this.state.unverifiedProps.length!=0 ?

                        <View style={{
                          flex: 1,
                          width: '90%',
                          alignSelf: 'center'
                        }}>
                        <FlatList
                          data={this.state.unverifiedProps}
                          renderItem={this.renderRow}
                          refreshing={this.state.isLoading2}
                          onRefresh={this.getData}
                          keyExtractor={item => item.propID.toString()}
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
