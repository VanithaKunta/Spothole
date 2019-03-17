import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import Dimensions from 'Dimensions';
import Mappers from './Mappers';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {

  constructor(props) {
    super(props);
    state = {
      userID: '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  signIn(){
    if(this.state.userID =='spot' && this.state.password =='spothole'){
      Actions.Mappers()
      console.log('logged in')
    }else{
      console.log('Invalid Login')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="UserID"
              underlineColorAndroid='transparent'
              onChangeText={(userID) => this.setState({userID})}/>
        </View>
         <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>
        
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signIn()}>
          <Text style={styles.signUpText}>Submit</Text> 
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  inputContainer: {
      borderBottomColor: '#303030',
      backgroundColor: '#ffff',
      borderRadius:30,
      borderBottomWidth: 1,
      height:40,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center',
      marginLeft:30,
      marginRight:30,
  },
  inputs:{
      height:45,
      marginLeft:30,
      marginRight:30,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color : '#000000',
      fontSize:20, 
      width: 200,
      shadowColor:'#505050',
  },
  inputIcon:{
    width:20,
    height:20,
    marginLeft:15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
    backgroundColor: '#000000',
    marginLeft:15,
  },

  signUpText: {
    color: 'white',
    fontSize:20,
  }
});