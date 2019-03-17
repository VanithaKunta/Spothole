import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Styles, {AppColors, AppFonts} from './AppStyles';
import MapStyles from './MapStyles';
import MapViewDirections from 'react-native-maps-directions';
import firebase from 'react-native-firebase';

 
const GOOGLE_API_KEY = 'AIzaSyAdf-ZOJMrnQtZt-VPP7ZhEPvIi3pU16NM';
const USE_METHODS = false;


export default class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            origin: {latitude: 0, longitude: 0},
            destination: ' ',
            makArray: []
        }
    }

    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
            origin: {longitude: position.coords.longitude, latitude: position.coords.latitude}
            }); 
        });
        var markArray = new Array();
            c = 0;
            var lca = new Array();
            var dist = new Array();
            var data = firebase.database().ref('/markers/').once('value', (snapshot) => {
            var stores = snapshot.val();
            for(var i=8; i < stores['count']['c'];i++){
                loc = stores['m' + i ]['obj']['loc']
                p = stores['m' + i]['obj']['pothole']
                // <View>
                //     <Text style={styles.text}> New pothole is detected at {this.loc}</Text>
                    
                lca.push(loc);
                if(p == true){
                    markArray.push(<Marker coordinate = {loc} key={i}/>);
                }
                lo = this.getCurrentLocation();
            }
            this.setState({makArray : markArray})
            this.setState({loca: lca})
            
        })
        
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
                          <TextInput style={Styles.input} underlineColorAndroid="transparent" 
                          onChangeText={destination => {
                              this.setState({destination}); 
                              this.setState({displayPath:false})}} 
                              value={this.state.destination}/>  
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
                    >
                        {this.state.displayPath ?<MapViewDirections
                            origin={this.getCurrentLocation()}
                            destination={this.state.destination}
                            strokeWidth={10}
                            strokeColor="royalblue"
                            apikey={"AIzaSyAdf-ZOJMrnQtZt-VPP7ZhEPvIi3pU16NM"}
                        />
                         : null }
                         {this.state.makArray}
                    </MapView>
                </View>
          </View>
        )
    }
}



