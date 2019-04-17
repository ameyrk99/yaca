import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import SettingsList from 'react-native-settings-list';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

export default class NotificationsPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Notification Settings',
            headerLeft: (
                <Ionicons style={{paddingLeft: 22}} onPress={navigation.getParam('goBack')}
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
                <SettingsList>
                    <SettingsList.Item
                        hasNavArrow={false}
                        switchState={this.state.switchValue}
                        switchOnValueChange={(value) => { this.setState({ switchValue: value }) }}
                        hasSwitch={true}
                        title={this.state.switchValue ? 'Turn on reminders?' : 'Turn off reminders?'}
                    />
                    {this.state.switchValue &&
                        <SettingsList.Item onPress={this._showDateTimePicker} titleInfo={this.state.time} hasNavArrow={false} title='Information Example' />
                    }
                </SettingsList>

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
