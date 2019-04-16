import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    tempView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 45
    }
});

export default class AboutPage extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={[styles.tempView, {flex: 1}]}>
                    <Text style={styles.tempText}>YACA</Text>
                </View>
                <View style={[styles.tempView, {flex: 2}]}>
                    <Text>
                        YACA as in Yet Another Calendar Application is a app to help students manage
                        their school events easily.
                    </Text>

                    <Ionicons onPress={() => this.props.navigation.navigate('SettingsStack')}
                     name="md-arrow-back" size={50} color={Colors.tintColor} />
                </View>
            </View>
        )
    }
}
