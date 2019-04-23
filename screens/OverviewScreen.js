import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import Emoji from 'react-native-emoji';

import Colors from '../constants/Colors';

const eventProps = {
    classes: {
        'CSE 3320': 'red',
        'CSE 3310': 'blue',
        'IE 3310': 'green',
    },
    'Meetings': 'orange',
    'Misc. Events': 'blue',
}

const items = {
    '2019-04-26': [
        { key: 'CSE 3320', color: eventProps.classes['CSE 3320'], text: 'Test 1', done: false, important: true },
        { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 2', done: false, important: false }
    ],
    '2019-04-05': [
        { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Quiz 4', done: true, important: false }
    ],
    '2019-04-20': [
        { key: 'IE 3310', color: eventProps.classes['IE 3310'], text: 'Quiz 3', done: false, important: true },
        { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 3', done: true, important: false }
    ],
}

export default class HomeCalendar extends Component {

    static navigationOptions = {
        headerTitle: 'Overview',
    };

    constructor(props) {
        super(props);
        this.state = {
            items: items,
        };
    }

    componentDidMount = () => {
        var d = new Date()
        const date = d.toISOString().split('T')[0]
        const temp = this.state.items
        if (!temp[date]) {
            temp[date] = []

            this.setState({
                items: temp,
            })
        }
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                selected={Date()}

                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                renderEmptyData={this.renderEmptyData.bind(this)}

                onDayPress={(day) => {
                    const temp = this.state.items
                    const date = day.dateString
                    if (!temp[date]) {
                        temp[date] = []

                        this.setState({
                            items: temp,
                        })
                    }
                }}

                theme={{
                    agendaTodayColor: Colors.tintColor,
                    agendaKnobColor: Colors.tintColor,
                    selectedDayBackgroundColor: Colors.tintColor,
                    selectedDayTextColor: '#ffffff',
                }}
            />
        );
    }

    renderItem = (item) => {
        return (
            <View style={[ styles.item, { backgroundColor: item.important ? 'red' : 'white' }]}>
                <Text style={{ 
                    alignSelf: 'flex-start',
                    textDecorationLine: item.done ? 'line-through' : 'none',
                    color: item.important ? 'white' : 'black'
                }}>
                    {item.text} {item.done && <Text style={{ fontStyle: 'italic', color: 'gray' }}>(complete)</Text>}
                </Text>
                <Text style={{
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    color: item.important ? 'white' : eventProps.classes[item.key],
                }}>
                    {item.key}
                </Text>
            </View>
        );
    }

    renderEmptyData = () => {
        return (
            <View style={styles.emptyData}><Text>Nothing here! <Emoji name={'grinning'} /></Text></View>
        );
    }

    renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}><Text>Nothing here! <Emoji name={'grinning'} /></Text></View>
        );
    }

    rowHasChanged = (r1, r2) => {
        return r1.key !== r2.key;
    }

    timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        // backgroundColor: 'white',
        alignContent: 'space-around',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyData: {
        marginTop: 200,
        marginBottom: 100,
        padding: 20,
        alignSelf: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'center'
    },
    emptyDate: {
        paddingTop: 45,
        alignSelf: 'center',
        flexDirection: 'column',
        // backgroundColor: 'white',
        alignContent: 'center'
    }
});