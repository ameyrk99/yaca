import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ToastAndroid, TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font, Icon, Google } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Ionicons } from '@expo/vector-icons';
import Colors from './constants/Colors'
import { Text, Caption, Title, List } from 'react-native-paper';

// 
import Settings from '/screens/SettingsScreen.js'
import { db } from './database/config';
import firebase from 'firebase';
//

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    userIsLogged: false,
  };

  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        clientId:
        "112924563833-peanb5ek4rlnsin0e29rqsa402gllamc.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(() => {
          this.setState({
            userIsLogged: true,
          })

          var user = firebase.auth().currentUser;
          if (user) {
            firebase.database().ref('users')
              .update({
                name: result.user.name, 
                uid: user.uid, 
                now: "wut do"
              })
            ToastAndroid.show('User logged in', ToastAndroid.SHORT)
          } else {
          }

        });
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
        startAsync={this._loadResourcesAsync}
        onError={this._handleLoadingError}
        onFinish={this._handleFinishLoading}
        />
      );
    } else {
      if (this.state.userIsLogged === false)
      {
        return (
          <View style={{ flex: 1, flexDirection: 'column', paddingTop: 155 }}>
          <TouchableOpacity
          style={styles.touchStyle}
          onPress={this.signIn}
          >
          <Text style={{textAlign: "center",}}>  *test* Please Login Before Using *test* </Text>
          <Ionicons style={styles.iconStyle} name="logo-google" size={150} color={Colors.tintColor} />
          </TouchableOpacity>
          </View>

        );
      }
      else
      {
        return (
          <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
          </View>
        );
      }
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 10,
    marginRight: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  tempView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  tempText: {
    fontWeight: 'bold',
    fontSize: 45
  },
  listStyle: {
    paddingVertical: -20,
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const LogIn = props => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 155 }}>
    <TouchableOpacity
    style={styles.touchStyle}
    onPress={props.signIn}
    >
    <Text style={{textAlign: "center",}}>  *test* Please Login Before Using *test* </Text>
    <Ionicons style={styles.iconStyle} name="logo-google" size={150} color={Colors.tintColor} />
    </TouchableOpacity>
    </View>
  )
}

