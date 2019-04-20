import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native';
import { Caption, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

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
    },
    listStyle: {
        paddingVertical: -20,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
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

                    <List.Section>
                        <List.Item
                            title='Logout'
                            left={() => <List.Icon icon='account-circle' />}
                            right={() => <View style={{alignSelf: 'center'}}>
                                            <Text style={{ alignSelf: 'center', color: 'gray', paddingRight: 12}}>user.name@gmail.com</Text>
                                        </View>}
                            style={styles.listStyle}
                            delayLongPress={1000}
                            onLongPress={() => {
                                ToastAndroid.show('User logged out', ToastAndroid.SHORT)
                                this.setState({
                                    userIsLogged: false,
                                })
                            }}
                        />
                        <List.Item
                            title='Backup'
                            left={() => <List.Icon icon='cloud-upload' />}
                            style={styles.listStyle}
                            onPress={() => ToastAndroid.show('Backup Complete', ToastAndroid.SHORT)}
                        />
                        <List.Item
                            title='Restore'
                            left={() => <List.Icon icon='cloud-download' />}
                            style={styles.listStyle}
                            onPress={() => ToastAndroid.show('Backup Complete', ToastAndroid.SHORT)}
                        />
                    </List.Section>
                }
            </View>
        )
    }
}
