import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import SettingsList from 'react-native-settings-list';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors'

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
    }
});

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Settings',
    };

    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <SettingsList>
                        <SettingsList.Item title='Backup/Restore' icon={<Ionicons style={styles.iconStyle} name="md-cloud" size={32} color={Colors.tintColor} />}
                            onPress={() => this.props.navigation.navigate('Backup')}
                        />
                        <SettingsList.Item 
                            title='Colors' icon={<Ionicons style={styles.iconStyle} name="md-color-palette" size={32} color={Colors.tintColor} />}
                            onPress={() => this.props.navigation.navigate('Color')}    
                        />
                        <SettingsList.Item 
                            title='Notifications' icon={<Ionicons style={styles.iconStyle} name="md-notifications" size={32} color={Colors.tintColor} />}
                            onPress={() => this.props.navigation.navigate('Notifications')}
                        />
                        <SettingsList.Item 
                            title='About' icon={<Ionicons style={styles.iconStyle} name="md-information-circle" size={32} color={Colors.tintColor} />}
                            onPress={() => this.props.navigation.navigate('About')}
                        />
                    </SettingsList>
                </View>
                <View style={styles.tempView} >
                    <Text style={styles.tempText}>YACA</Text>
                    <Text>alpha 0.2019.04.18</Text>
                </View>
            </View>
        );
    }
}
