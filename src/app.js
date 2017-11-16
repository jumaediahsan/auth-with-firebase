import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCiPS181-cP2dgz7E04_taAtDqfoHyjnYs',
      authDomain: 'authentication-c7aa2.firebaseapp.com',
      databaseURL: 'https://authentication-c7aa2.firebaseio.com',
      projectId: 'authentication-c7aa2',
      storageBucket: 'authentication-c7aa2.appspot.com',
      messagingSenderId: '1079326235570'
  });

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  });
  }

renderContent() {
switch (this.state.loggedIn) {
  case true:
    return (
      <CardSection>
        <Button onPress={() => firebase.auth().signOut()}>
        Log Out
        </Button>
      </CardSection>
    );
  case false:
    return <LoginForm />;
  default:
    return <Spinner size="large" />;
  }
}

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>

    );
  }
}
export default App;
