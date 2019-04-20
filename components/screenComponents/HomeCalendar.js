import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { Divider, Title, List, Text, Button, TextInput } from 'react-native-paper';
import { CalendarList } from 'react-native-calendars';

import Colors from '../../constants/Colors';

const eventProps = {
    classes: {
        'CSE 3320': 'red',
        'CSE 3310': 'blue',
        'IE 3310': 'green',
    },
    'Meetings': 'orange',
    'Misc. Events': 'blue',
}

const cse3320 = { key: 'CSE 3320', color: eventProps.classes['CSE 3320'] };
const cse3310 = { key: 'CSE 3310', color: eventProps.classes['CSE 3310'] };
const ie2320 = { key: 'IE 3310', color: eventProps.classes['IE 3310'] };
const items = {
    '2019-04-26': [{ cname: 'CSE 3320', text: 'Test 1', done: false }, { cname: 'CSE 3310', text: 'Homework 2', done: false }],
    '2019-04-05': [{ cname: 'CSE 3310', text: 'Quiz 4', done: true }],
    '2019-04-20': [{ cname: 'IE 3310', text: 'Quiz 3', done: false }, { cname: 'CSE 3310', text: 'Homework 3', done: true }],
}

export default class HomeCalendar extends React.Component {
    constructor(props) {
        super(props)
        var d = new Date()
        this.state = {
            selected: d.toISOString().slice(0, 10)
        };
        this.onDayPress = this.onDayPress.bind(this);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CalendarList
                    onDayPress={this.onDayPress}
                    style={styles.calendar}
                    hideExtraDays
                    horizontal
                    pagingEnabled
                    markingType={'multi-dot'}

                    markedDates={{
                        [this.state.selected]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedDotColor: 'orange'
                        },
                        '2019-04-26': { dots: [cse3320, cse3310] },
                        '2019-04-05': { dots: [cse3310] },
                        '2019-04-20': { dots: [ie2320, cse3310] },
                    }}

                    theme={{
                        selectedDayBackgroundColor: Colors.tintColor,
                        selectedDayTextColor: '#ffffff',
                        monthTextColor: Colors.tintColor,
                        textMonthFontWeight: 'bold',
                    }}
                />

                <Divider />

                <Title style={{ padding: 10, color: 'white', backgroundColor: Colors.tintColor }}>{this.state.selected}</Title>

                <ScrollView style={{ flex: 1, flexDirection: 'column', }}>

                    <List.Section>
                        {
                            items[this.state.selected] && items[this.state.selected].map((item, i) =>
                                <List.Item
                                    key={i}
                                    title={ <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
                                    {item.text} {item.done && <Text style={{ fontStyle: 'italic', color: 'gray' }}>(complete)</Text>}
                                    </Text>}
                                    right={() => <View style={{ alignSelf: 'center' }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            color: eventProps.classes[item.cname],
                                            paddingRight: 12,
                                        }}>
                                            {item.cname}
                                        </Text>
                                    </View>}
                                    style={styles.listStyle}
                                />
                            )
                        }
                    </List.Section>
                </ScrollView>
            </View>
        );
    }

    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}

const styles = StyleSheet.create({
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 120
    },
    listStyle: {
        paddingVertical: -20,
    }
});
