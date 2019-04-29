import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ToastAndroid,
} from 'react-native';
import { Text, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WebBrowser, Google } from 'expo';

import { db } from '../../database/config';
import firebase from 'firebase';

import Colors from '../../constants/Colors'

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
            const { type, idToken, accessToken } = await Google.logInAsync({ clientId: "644929303024-9ot2ihq96nl2ee49iv95a2jgsjnkthj6.apps.googleusercontent.com" });

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
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.upperSec}
                        onPress={() => WebBrowser.openBrowserAsync('https://github.com/ameyrk99/yaca')}
                    >
                        <Image
                            source={require('./icon.png')}
                        />
                        <Text style={{ margin: 10, textAlign: 'center' }}>
                            Yet Another Calendar App
                    </Text>
                    </TouchableOpacity>
                    <List.Section style={{ flex: 1 }}>
                        <List.Item
                            title='Sign-in with Google'
                            left={() =>
                                <Ionicons style={{ paddingLeft: 22 }}
                                    name="logo-google" size={35} color={Colors.tintColor} />
                            }
                            style={styles.listStyle}
                            onPress={this._signIn}
                        />
                    </List.Section>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    upperSec: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    listStyle: {
        margin: 50,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#d6d7da',
    }
})
