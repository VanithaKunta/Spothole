import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
 import notify from './notify';
 import p50 from './pot50.png';
 
const GOOGLE_API_KEY = 'AIzaSyCqvLtLx5qH6ZJanAv0kMveEuQ4v08pDhM';
const USE_METHODS = false;

export default class Mappers extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            origin: {latitude: 0, longitude: 0},
            destination: ' ',
        }
    }

    // renderMarkers(){
    //     return(<Marker coordinate={this.state.origin}
    //     image = {require('./mark.png')}
    //     />);
    // }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        var markArray = new Array();
            c = 0;
            var lca = new Array();
            var data = firebase.database().ref('/markers/').once('value', (snapshot) => {
            var stores = snapshot.val();
            //console.log(stores['count']['c']);
            for(var i=8; i < stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                p = stores['m' + i]['obj']['pothole']
                lca.push(loc);
                if(p == true){
                    markArray.push(<Marker coordinate = {loc} image={p50} key={i}/>);
                }
                lo = this.getCurrentLocation();
            }
            this.setState({makArray : markArray})
            this.setState({loca: lca})
        })
        // var data = firebase.database().ref('/markers/count').once('value',(snapshot) => {
        //     firebase.database().ref.endAt().limitToLast(1).on('child_added',function(snapshot){
        //         console.log(snapshot.name(),snapshot.val());
        //     });
        // })
    }

    getCurrentLocation(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        return this.state.origin;
    }

    render()
    {
      return (
          <View style={Styles.appContainer}>
              {this.state.isNavigation ? null : (
                  <View style={Styles.appHeader}>
                      <Text style={Styles.inputLabel}>Where do you want to go?</Text>
                      <View style={Styles.inputContainer}>
                          <TextInput style={Styles.input} underlineColorAndroid="transparent" onChangeText={destination => {this.setState({destination}); this.setState({displayPath:false})}} value={this.state.destination}/>  
                          <TouchableOpacity style={Styles.button} onPress={()=>{this.setState({displayPath:true})}}>
                                <Image 
                                    style={Styles.logo1}
                                    source={require('./nav.png')}
                                />
                          </TouchableOpacity>
                            <View>
                            <TouchableOpacity onPress={()=>{Actions.notify()}}>
                                <Image
                                    style={Styles.logo}
                                    source={require('./notif.png')}
                                /> 
                                <Badge
                                    status="primary"
                                    containerStyle={{ top:-37,right:-10}}
                                />
                                </TouchableOpacity>
                            </View>
                            {/* const BadgedIcon = withBadge(1)(Icon)
                            <BadgedIcon type="ionicon" name="ios-chatbubbles" /> */}
                      </View>
                  </View>
                )}
                <View style={{flex:1}}>
                    <MapView
                        ref={ref => this.refMap = ref}
                        provider={PROVIDER_GOOGLE}
                        style={Styles.map}
                        customMapStyle={MapStyles}
                        initialRegion={{
                            latitude: this.state.origin.latitude,
                            longitude: this.state.origin.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        showsUserLocation={true}
                        followUserLocation={true}                    
                    >
                        {/* {this.renderMarkers()} */}
                        {this.state.displayPath ?<MapViewDirections
                            origin={this.getCurrentLocation()}
                            destination={this.state.destination}
                            strokeWidth={10}
                            strokeColor="royalblue"
                            apikey={"AIzaSyCqvLtLx5qH6ZJanAv0kMveEuQ4v08pDhM"}
                        />
                         : null }
                         {this.state.makArray}
                        {/* { this.state.displayPath ? (this.renderMarkers()) : null} */}
                    </MapView>
                </View>
          </View>
        )
    }
}
