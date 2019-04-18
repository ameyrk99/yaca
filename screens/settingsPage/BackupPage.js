import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsList from 'react-native-settings-list';

import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: 10,
        marginRight: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    touchStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    loginStyle: {
        fontWeight: 'bold',
        fontSize: 40,
        alignSelf: 'center',
        color: Colors.tintColor
    }
});

export default class BackupPage extends React.Component {

    state = {
        userIsLogged: true,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Backup/Restore',
            headerLeft: (
                <Ionicons style={{ paddingLeft: 22 }} onPress={navigation.getParam('goBack')}
                    name="md-arrow-back" size={32} color={Colors.tintColor} />
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    _goBack = () => {
        this.props.navigation.navigate('SettingsStack');
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 15 }}>
                {!this.state.userIsLogged &&
                    <TouchableOpacity
                        style={styles.touchStyle}
                        onPress={() => {
                            ToastAndroid.show('User logged in', ToastAndroid.SHORT)
                            this.setState({
                                userIsLogged: true,
                            })
                        }}
                    >
                        <Text style={styles.loginStyle}>Login</Text>
                        <Ionicons style={styles.iconStyle} name="logo-google" size={100} color={Colors.tintColor} />
                    </TouchableOpacity>
                }
                {this.state.userIsLogged &&
                    <SettingsList>
                        <SettingsList.Item
                            titleInfo='user.name@gmail.com'
                            hasNavArrow={false} title='Logout'
                            icon={<Ionicons style={styles.iconStyle} name="logo-google" size={32} color={Colors.tintColor} />}
                            delayLongPress={1000}
                            onLongPress={() => {
                                ToastAndroid.show('User logged out', ToastAndroid.SHORT)
                                this.setState({
                                    userIsLogged: false,
                                })
                            }}
                        />
                        <SettingsList.Item
                            hasArrow={false}
                            title='Backup'
                            icon={<Ionicons style={styles.iconStyle} name="md-cloud-upload" size={32} color={Colors.tintColor} />}
                            onPress={() => ToastAndroid.show('Backup Complete', ToastAndroid.SHORT)}
                        />
                        <SettingsList.Item
                            hasArrow={false}
                            title='Restore'
                            icon={<Ionicons style={styles.iconStyle} name="md-cloud-download" size={32} color={Colors.tintColor} />}
                            onPress={() => ToastAndroid.show('Restoration Complete', ToastAndroid.SHORT)}
                        />
                    </SettingsList>
                }
            </View>
        )
    }
}
