import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Constants } from 'expo';

import HomeCalendar from '../components/screenComponents/HomeCalendar';

const styles = StyleSheet.create({
    tempView: {
        flex: 1,
        marginTop: Constants.statusBarHeight + 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
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
            </View>
        )
    }
}
