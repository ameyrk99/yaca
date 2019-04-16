import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
/* import { Calendar, CalendarList, Agenda  } from 'react-native-calendars'; */
import { CalendarList } from 'react-native-calendars';

const cse3320 = {key:'cse3320', color: 'red'};
const cse3310 = {key:'cse3310', color: 'blue'};
const ie2320 = {key:'ie2320', color: 'green'};

export  default class HomeCalendar extends React.Component {
    render() {
        return (
            <CalendarList 
                markingType={'multi-dot'}
                horizontal={true}

                markedDates={{
                    '2019-04-06': {dots: [cse3310, ie2320]},
                    '2019-04-17': {dots: [cse3310, cse3320, ie2320]},
                    '2019-04-20': {dots: [cse3310, ie2320]},
                }}
            />
        )
    }
}
