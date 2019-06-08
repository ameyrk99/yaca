import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { ActivityIndicator } from 'react-native-paper';
import Emoji from 'react-native-emoji';

import Colors from '../constants/Colors';

import { db } from '../database/config';
import firebase from 'firebase';


export default class HomeCalendar extends Component {

    static navigationOptions = {
        headerTitle: 'Overview',
    };

    state = {
        userID: firebase.auth().currentUser.uid,
        items: {},
        events: {
            classes: {},
            'Meetings': null,
            'Misc Events': null,
        },
        isLoadingData: true,
    }

    /* Get the classes and their color properties for the user */
    fetchClasses = () => {
        firebase.database().ref('/users/'+this.state.userID).child('classProps').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                /* Because of react, we can't can't just change the events in state, thus create a copy and replace
                 * in state */
                const tempc = this.state.events
                tempc.classes[childSnapshot.key] = childSnapshot.val()
                this.setState({
                    events: tempc,
                })
            })
        })
    }

    /* Get the events and their color properties for the user */
    fetchEvents = () => {
        firebase.database().ref('/users/'+this.state.userID).child('eventProps').once('value', snapshot => {
            /* Because of react, we can't can't just change the events in state, thus create a copy and replace
             * in state */
            const tempe = this.state.events
            tempe['Meetings'] = snapshot.child('Meetings').val()
            tempe['Misc Events'] = snapshot.child('Misc Events').val()
            this.setState({
                events: tempe,
            })
        })
    }

    /* Fetch all the events for that user */
    fetchAgendaEvents = () => {
        firebase.database().ref('/users/'+this.state.userID).child('events').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const tempc = this.state.items
                const date_now = childSnapshot.child('date').val()

                if (tempc[date_now] == undefined) {
                    tempc[date_now] = []
                }

                const tempData = childSnapshot.val()
                tempData['color'] = (tempData.key === 'Meetings' || tempData.key == 'Misc Events') ?
                    this.state.events[tempData.key] : this.state.events.classes[tempData.key]
                tempc[date_now].push(tempData)
                this.setState({
                    items: tempc,
                })
            })
        })
    }

    /* Reset all values and fetch everything again */
    update = () => {
        this.setState({
            items: {},
            events: {
                classes: {},
                'Meetings': null,
                'Misc Events': null,
            },
            isLoadingData: true,
        })
        this.fetchEvents()
        this.fetchClasses()
        this.fetchAgendaEvents()

        setTimeout(() => {
            this.setState({
                isLoadingData: false,
            })
        }, 100)
    }

    /* Call the update function to get all the values at the start */
    componentDidMount = () => {
        this.update()

        var d = new Date()
        const date = d.toISOString().split('T')[0]

        /* If there is no event for that day in DB, create an empty event array */
        const temp = this.state.items
        if (!temp[date]) {
            temp[date] = []

            this.setState({
                items: temp,
            })
        }
    }

    render() {

        let agendaEvents = JSON.parse(JSON.stringify(this.state.items))

        return this.state.isLoadingData ?
            (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={Colors.tintColor} />
                </View>
            ) : (
                <Agenda
                    items={agendaEvents}
                    selected={Date()}

                    renderItem={this.renderItem.bind(this)
                    }
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
                    }
                    }

                    theme={{
                        agendaTodayColor: Colors.tintColor,
                        agendaKnobColor: Colors.tintColor,
                        selectedDayBackgroundColor: Colors.tintColor,
                        selectedDayTextColor: '#ffffff',
                    }}
                />
            )
        // }
    }

    /* Function to render an event item */
    renderItem = (item) => {
        return (
            <View style={[styles.item, { backgroundColor: item.important ? 'red' : 'white' }]}>
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
                    color: item.important ? 'white' : item.color,
                }}>
                    {item.key}
                </Text>
            </View>
        );
    }

    /* Function to render for empty data */
    renderEmptyData = () => {
        return (
            <View style={styles.emptyData}><Text>Nothing here! <Emoji name={'grinning'} /></Text></View>
        );
    }

    /* Function to render no date */
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
        alignContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
});
