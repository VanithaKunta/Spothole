import React from 'react';
import { View, Text,Alert } from 'react-native';
import Mappers from './src/components/Mappers';
import Swipe from './src/components/Swipe';
import Connection from './src/components/Connection';
import Login from './src/components/Login';
import { Router, Scene } from 'react-native-router-flux';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Mappers"
            component={Mappers}
           // initial
            hideNavBar={true}
          />
          <Scene key="Swipe"
            component={Swipe}
            initial
            hideNavBar={true}
          />
          <Scene key="Connection"
            component={Connection}
            //initial
            hideNavBar={true}
          />
          <Scene key="Login"
            component={Login}
            //initial
            hideNavBar={true}
          />
        </Scene>
      </Router>
    );
  }
}

export default App;