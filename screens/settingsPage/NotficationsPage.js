import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Icon
} from 'react-native';
import { Caption, Text, Checkbox, List } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { Permissions, Notifications } from 'expo';

import Colors from '../../constants/Colors';
import { db } from '../../database/config';
import firebase from 'firebase';

const styles = StyleSheet.create({
    listStyle: {
        borderRadius: 0,
        // borderWidth: 0.5,
        // borderColor: '#d6d7da',
    }
});

export default class NotificationsPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Notification Settings',
            headerLeft: (
                <Ionicons style={{ paddingLeft: 22 }} onPress={navigation.getParam('goBack')}
                    name="ios-arrow-back" size={32} color={Colors.tintColor} />
            ),
        }
    };

    state = {
        userID: firebase.auth().currentUser.uid,
        switchValue: null,
        isDateTimePickerVisible: false,
        time: ''
    }
    
    getPushToken = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync()
        firebase.database().ref('/users/'+this.state.userID).update({pushToken: token})
    }

    fetchInfo = () => {
        firebase.database().ref('/users/'+this.state.userID).once('value', snapshot => {
            let tempe = this.state.switchValue
            let tempt = this.state.time
            tempe = snapshot.child('notifications').val()
            tempt = snapshot.child('time').val()
            this.setState({
                switchValue: tempe,
                time: tempt,
            })
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
        this.fetchInfo()
    }

    _goBack = () => {
        this.props.navigation.navigate('SettingsStack');
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (newTime) => {
        formatedTime = newTime.getHours() + ":" + newTime.getMinutes();
        this.setState({
            time: formatedTime,
        })
        let temptime = this.state.time
        firebase.database().ref('/users/'+this.state.userID).update({time: temptime})
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 15 }}>
                <List.Section>
                    <List.Item
                        title={!this.state.switchValue ? 'Turn on reminders?' : 'Turn off reminders?'}
                        right={() => <List.Icon icon={this.state.switchValue ? 'notifications-active' : 'notifications-off'} />}
                        style={[styles.listStyle, { paddingVertical: -25 }]}
                        onPress={() => {
                            this.setState({
                                switchValue: !this.state.switchValue
                            })
                            firebase.database().ref('/users/'+this.state.userID).update({notifications: !this.state.switchValue})
                            if (this.state.switchValue) {
                                this.getPushToken()
                            }
                        }}
                    />
                    {this.state.switchValue && <List.Item
                        title='Notified daily at'
                        right={() => <Text style={{ alignSelf: 'center', color: 'gray', paddingRight: 12 }}>{this.state.time}</Text>}
                        style={styles.listStyle}
                        onPress={this._showDateTimePicker}
                    />}
                </List.Section>

                <View style={{ flex: 1 }}>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        mode='time'
                    />
                </View>
            </View>
        )
    }
}
