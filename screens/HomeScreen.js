import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Text, Button, TextInput, FAB } from 'react-native-paper';
import { Constants } from 'expo';

import Colors from '../constants/Colors';
import HomeCalendar from '../components/screenComponents/HomeCalendar';

const styles = StyleSheet.create({
    tempView: {
        flex: 1,
        marginTop: Constants.statusBarHeight + 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    fab: {
        backgroundColor: Colors.tintColor,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.tempView}>
                <HomeCalendar />

                <FAB
                    style={styles.fab}
                    color={Colors.noticeText}
                    icon="add"
                    onPress={() => console.log('Pressed')}
                />
            </View>
        )
    }
}
