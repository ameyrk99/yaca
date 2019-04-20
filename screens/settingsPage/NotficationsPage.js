import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Caption, Text, Checkbox, List } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    listStyle: {
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
});

export default class NotificationsPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Notification Settings',
            headerLeft: (
                <Ionicons style={{ paddingLeft: 22 }} onPress={navigation.getParam('goBack')}
                    name="md-arrow-back" size={32} color={Colors.tintColor} />
            ),
        }
    };

    state = {
        switchValue: false,
        isDateTimePickerVisible: false,
        time: '16:00'
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
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
        this._hideDateTimePicker();
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', paddingTop: 15 }}>
                <List.Section>
                    <List.Item
                        title={!this.state.switchValue ? 'Turn on reminders?' : 'Turn off reminders?'}
                        right={() => <List.Icon icon={this.state.switchValue ? 'notifications-active' : 'notifications-off'} />}
                        style={[styles.listStyle, {paddingVertical: -25}]}
                        onPress={() => {
                            this.setState({
                                switchValue: !this.state.switchValue
                            })
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
