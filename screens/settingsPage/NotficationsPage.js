import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Caption, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { db } from '../../database/config';
import firebase from 'firebase';

const styles = StyleSheet.create({
    listStyle: {
        borderRadius: 0,
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
    }

    /* Get notification preference for user from the DB */
    fetchInfo = () => {
        firebase.database().ref('/users/' + this.state.userID).once('value', snapshot => {
            let tempe = this.state.switchValue
            tempe = snapshot.child('notifications').val()
            this.setState({
                switchValue: tempe,
            })
        })
    }

    /* Get info once screen loads */
    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
        this.fetchInfo()
    }

    /* Go back to settings screen from this screen */
    _goBack = () => {
        this.props.navigation.navigate('SettingsStack');
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', flexDirection: 'column', paddingTop: 15 }}>
                <List.Section style={{flex: 5}}>
                    <List.Item
                        title={!this.state.switchValue ? 'Turn on reminders?' : 'Turn off reminders?'}
                        right={() => <List.Icon icon={this.state.switchValue ? 'notifications-active' : 'notifications-off'} />}
                        style={[styles.listStyle, { paddingVertical: -25 }]}
                        onPress={() => {
                            this.setState({
                                switchValue: !this.state.switchValue
                            })
                            firebase.database().ref('/users/' + this.state.userID).update({ notifications: !this.state.switchValue })
                        }}
                    />
                </List.Section>
                <View style={{ flex: 2, margin: 100, marginTop: 20 }}>
                    <Caption>If turned on, app will notify user about next day's events at 4:00 PM CDT</Caption>
                </View>
            </View>
        )
    }
}
