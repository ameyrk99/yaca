import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    ToastAndroid,
} from 'react-native';
import { Button, Text, Title } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WebBrowser, Google } from 'expo';

import { db } from '../../database/config';
import firebase from 'firebase';

import Colors from '../../constants/Colors'
import { white } from 'ansi-colors';

export default class UserLogPage extends React.Component {

    state = {
        userID: firebase.auth().currentUser,
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    _goBack = () => {
        this.props.navigation.navigate('HomeStack');
    }

    _signIn = async () => {
        try {
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
                                this.setState({
                                    userID: userID,
                                })
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

        if (this.state.userID) {
            this._goBack()
            return <View></View>
        } else {
            return (
                <ImageBackground source={require('./loginSplash.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={styles.upperSec}
                            onPress={() => WebBrowser.openBrowserAsync('https://github.com/ameyrk99/yaca')}
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
