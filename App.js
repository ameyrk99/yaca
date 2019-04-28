import React from 'react';
import { View } from 'react-native'
// import { Platform, StatusBar, StyleSheet, View, ToastAndroid, TouchableOpacity } from 'react-native';
// import { AppLoading, Asset, Font, Icon, Google } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
// import { Ionicons } from '@expo/vector-icons';
// import Colors from './constants/Colors'
// import { Text, Caption, Title, List } from 'react-native-paper';

// //
// import { db } from './database/config';
// import firebase from 'firebase';
//

// import UserData from './components/UserDataProvider'

import { GlobalContextProvider } from './GlobalContext'

import Index from './index'

export default class App extends React.Component {

    render() {
        return (
            // <View>
                <GlobalContextProvider>
                    <Index />
                </GlobalContextProvider>
            // </View>
        )
    }
}
