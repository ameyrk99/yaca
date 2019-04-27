import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { Title, List, Text } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import { CalendarList } from 'react-native-calendars';

import Colors from '../../constants/Colors';

const eventProps = {
    classes: {
        'CSE 3320': 'red',
        'CSE 3310': 'blue',
        'IE 3310': 'green',
    },
    'Meetings': 'orange',
    'Misc Events': 'blue',
}

const items = {
    '2019-04-26': {
        dots: [
            { key: 'CSE 3320', color: eventProps.classes['CSE 3320'], text: 'Test 1', done: false },
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 2', done: false }
        ]
    },
    '2019-04-05': {
        dots: [
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Quiz 4', done: true }
        ]
    },
    '2019-04-20': {
        dots: [
            { key: 'IE 3310', color: eventProps.classes['IE 3310'], text: 'Quiz 3', done: false },
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 3', done: true }
        ]
    },
}

export default class HomeCalendar extends React.Component {
    constructor(props) {
        super(props)
        var d = new Date()
        this.state = {
            selected: d.toISOString().split('T')[0],
            items: items
        };
        this.onDayPress = this.onDayPress.bind(this)
        // this.tempObject = this.tempObject.bind(this);
    }

    // tempObject = () => {
    //     const temp = this.state.items
    //     const temp2 = Object.assign(temp,
    //         {
    //             [this.state.selected]: {
    //                 selected: true,
    //                 disableTouchEvent: true,
    //                 selectedDotColor: 'orange'
    //             }
    //         }
    //     )

    //     return temp2
    // }

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

                    // markedDates={{
                    //     [this.state.selected]: {
                    //         selected: true,
                    //         disableTouchEvent: true,
                    //         selectedDotColor: 'orange'
                    //     }
                    // }}

                    markedDates={this.state.items}

                    theme={{
                        selectedDayBackgroundColor: Colors.tintColor,
                        selectedDayTextColor: '#ffffff',
                        monthTextColor: Colors.tintColor,
                        textMonthFontWeight: 'bold',
                    }}
                />

                <Title style={{ padding: 5, color: 'white', backgroundColor: Colors.tintColor }}>{this.state.selected}</Title>

                <ScrollView style={{ flex: 1, flexDirection: 'column', }}>

                    <List.Section>
                        {
                            items[this.state.selected] ? (items[this.state.selected].dots.map((item, i) =>
                                <List.Item
                                    key={i}
                                    title={<Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
                                        {item.text} {item.done && <Text style={{ fontStyle: 'italic', color: 'gray' }}>(complete)</Text>}
                                    </Text>}
                                    right={() => <View style={{ alignSelf: 'center' }}>
                                        <Text style={{
                                            alignSelf: 'center',
                                            color: eventProps.classes[item.key],
                                            paddingRight: 80,
                                        }}>
                                            {item.key}
                                        </Text>
                                    </View>}
                                    style={styles.listStyle}
                                />)
                            ) : (
                                    <List.Item
                                        left={() => <Text>Nothing here! <Emoji name={'grinning'} /></Text>}
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
        height: 215
    },
    listStyle: {
        paddingVertical: -20,
    }
});
