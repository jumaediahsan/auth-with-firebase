import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase'; //*mengimport firebas dari firebas
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
        //<-email dan password nya tersedia di state ini
                                //*dengan menggunakan methode pada object firebase tersebut
    onButtonPress() {
      //#Bagian ini adalah fungsi u/ acces ke variabel email dan password
      const { email, password } = this.state;
        this.setState({ error: '', loading: true });
      //#dan di teruskan ke methode bawah ini
      firebase.auth().signInWithEmailAndPassword(email, password)
      //akan menangkap supaya akunnya sama dengan yang di buat
        .then(this.onLoginSucces.bind(this))
        .catch(() => {
              firebase.auth().createUserWithEmailAndPassword(email, password)
          //menangkap ketidak cocokan akun yang di buat
            .then(this.onLoginSucces.bind(this))
            .catch(this.onLoginFail.bind(this));
        });
    }

    onLoginFail() {
      this.setState({ error: 'Authentication failed', loading: false });
    }
    //ini adalah untuk mengembalikan tampilan ke semula setelah salah memasukan akunnya
    //dan memberhentika reload
    onLoginSucces() {
      this.setState({
        email: '',
        password: '',
        loading: false,
        error: ''
      });
    }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
  }

  return (
    <Button onPress={this.onButtonPress.bind(this)}>
        Log In
    </Button>
  );
}

  render() {
    return (
      <Card>
          <CardSection>
              <Input
                placeholder="user@gmail.com"
                label="email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}

              />
          </CardSection>

          <CardSection>
              <Input
              secureTextEntry
              placeholder="password"
              label="password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />

          </CardSection>

            <Text style={styles.errorTextStyle}>
              {this.state.error}
            </Text>

          <CardSection>
            {this.renderButton()}
          </CardSection>

      </Card>
    );
  }
}

const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
};

export default LoginForm;
