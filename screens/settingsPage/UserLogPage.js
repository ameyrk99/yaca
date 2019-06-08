import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Permissions, Notifications, WebBrowser, Google } from 'expo';

import { db } from '../../database/config';
import firebase from 'firebase';

export default class UserLogPage extends React.Component {

    constructor() {
        super()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this._goBack()
            }
        });
    }

    /* Get push notification token for user's device */
    _getPushToken = async (userID) => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        )

        let finalStatus = existingStatus

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }

        if (finalStatus !== 'granted') {
            return
        }

        /* Update token in DB */
        let token = await Notifications.getExpoPushTokenAsync()
        firebase.database().ref('/users/' + userID).update({ pushToken: token })
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    /* Go back to settings screen from this screen */
    _goBack = () => {
        this.props.navigation.navigate('HomeStack');
    }

    /* Sign in with google from web */
    _signIn = async () => {
        try {
            /* Second one in the google-services.json file */
            const { type, idToken, accessToken } = await Google.logInAsync({ clientId: "<**Client ID**>" });

            if (type === "success") {
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)

                firebase.auth().signInAndRetrieveDataWithCredential(credential)
                    .then((user) => {
                        const userID = user.user.uid
                        firebase.database().ref('users').child(userID).update({
                            name: user.user.displayName,
                        })
                            .then(() => {
                                this._goBack()
                                this._getPushToken(userID)
                                ToastAndroid.show('User logged in', ToastAndroid.SHORT)
                            })
                            .catch((error) => {
                                ToastAndroid.show('Error logging in.', ToastAndroid.SHORT)
                                console.log("error", error)
                            })
                    })
                    .catch((error) => {
                        ToastAndroid.show('Error opening Auth' + error, ToastAndroid.SHORT)
                        console.log("error", error)
                    })
            }
        } catch (e) {
            console.log("error", e)
        }
    }

    render() {
        return (
            <ImageBackground source={require('./loginSplash.png')} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.upperSec}
                        onPress={() => WebBrowser.openBrowserAsync('http://ameyrk.me/yaca/')}
                    >
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Button color={'white'} mode="contained" style={{ margin: 75, shadowOpacity: 0, height: 70, paddingTop: 15 }}
                            onPress={this._signIn}
                            icon='person'>
                            GOOGLE LOGIN
                    </Button>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    upperSec: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    listStyle: {
        margin: 50,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#d6d7da',
    },
})
