import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ScrollView,
    ToastAndroid
} from 'react-native';
import { Title, List, Text, Button, FAB, TextInput, Menu, Divider, Provider, Checkbox } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import { CalendarList } from 'react-native-calendars';

import Colors from '../constants/Colors';

// Don't delete db even though you never use it!!!!
// Firebase throws an error for some reason
// Dustin: importing db takes care of this block of code:
/*
    firebase.initializeApp(config); // Gets the data needed for correct database.
    var db = firebase.firestore(); // Invokes firebase before app is initialized.
*/

import { db } from '../database/config';
import firebase from 'firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Home',
    };

    constructor(props) {
        super(props)
        let d = new Date()
        this.state = {
            selected: d.toISOString().split('T')[0],
            items: tempItems,
            visible: false,
            modalVisible: false,
            checked: false,
            status: 'checked',
            newEventKey: '',
            refreshing: false,
        }
        this.onDayPress = this.onDayPress.bind(this)
    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    render() {

        let markedEvents = JSON.parse(JSON.stringify(this.state.items))

        return (
            <View style={{ flex: 1 }}>

                <View style={{ flex: 1 }}>
                    <CalendarList
                        onDayPress={this.onDayPress}
                        style={styles.calendar}
                        hideExtraDays
                        horizontal
                        pagingEnabled
                        markingType={'multi-dot'}
                        markedDates={markedEvents}

                        theme={{
                            selectedDayBackgroundColor: Colors.tintColor,
                            selectedDayTextColor: '#ffffff',
                            monthTextColor: Colors.tintColor,
                            textMonthFontWeight: 'bold',
                        }}
                    />

                    <Divider style={{ backgroundColor: Colors.tintColor }} />

                    <Title style={{ padding: 5, color: Colors.tintColor }}>{this.state.selected}</Title>

                    <ScrollView style={{ flex: 1, flexDirection: 'column', }}>

                        <List.Section>
                            {
                                this.state.items[this.state.selected] ? (this.state.items[this.state.selected].dots.map((item, i) =>
                                    <List.Item
                                        key={i}
                                        title={<Text style={{
                                            textDecorationLine: item.done ? 'line-through' : 'none',
                                            color: item.important ? 'white' : 'black',
                                        }}>
                                            {item.text} {item.done && <Text style={{ fontStyle: 'italic', color: item.important ? 'white' : 'gray' }}>(complete)</Text>}
                                        </Text>}
                                        right={() => <View style={{ alignSelf: 'center' }}>
                                            <Text style={{
                                                alignSelf: 'center',
                                                paddingRight: 80,
                                                color: item.important ? 'white' : eventProps.classes[item.key]
                                            }}>
                                                {item.key}
                                            </Text>
                                        </View>}
                                        onPress={() => {
                                            const temp = this.state.items
                                            temp[this.state.selected].dots[i].done = !this.state.items[this.state.selected].dots[i].done
                                            this.setState({
                                                items: temp,
                                            })
                                        }}
                                        delayLongPress={1000}
                                        onLongPress={() => {
                                            const temp = this.state.items
                                            delete temp[this.state.selected].dots[i]
                                            this.setState({
                                                items: temp,
                                                refreshing: true,
                                            })
                                        }}
                                        style={[
                                            styles.emptyEvent,
                                            { backgroundColor: item.important ? 'red' : 'white' }
                                        ]}
                                    />)
                                ) : (
                                        <List.Item
                                            left={() => <Text>Nothing here! <Emoji name={'grinning'} /></Text>}
                                            style={styles.emptyEvent}
                                        />
                                    )
                            }
                        </List.Section>
                    </ScrollView>
                </View>

                <FAB
                    style={styles.fab}
                    color={Colors.noticeText}
                    icon="add"
                    onPress={() => {
                        this.setState({
                            newEventKey: '',
                            checked: false,
                        })
                        this.setModalVisible(true);
                    }}
                />

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={{ marginTop: 22, flex: 1, flexDirection: 'column', alignContent: 'center', padding: 10 }}>
                        <Title>Add Event for {this.state.selected}</Title>

                        <TextInput
                            mode='outlined'
                            label='Add a title'
                            style={{ height: 60, margin: 5 }}
                            theme={{
                                colors: {
                                    primary: Colors.tintColor,
                                }
                            }}
                            underlineColor={Colors.tintColor}
                            value={this.state.eventTitle}
                            multiline={false}
                            onChangeText={eventTitle => this.setState({ eventTitle })}
                        />

                        <List.Section>
                            <List.Item
                                title='Is this event important?'
                                right={() =>
                                    <Checkbox
                                        status={this.state.checked ? 'checked' : 'unchecked'}
                                        onPress={() => { this.setState({ checked: !this.state.checked }); }}
                                    />}
                                style={[styles.listStyle, { margin: 5 }]}
                                onPress={this._openMenu}
                            />
                        </List.Section>

                        <Provider>
                            <Menu
                                visible={this.state.visible}
                                onDismiss={this._closeMenu}
                                anchor={
                                    <List.Section>
                                        <List.Item
                                            title={this.state.newEventKey == '' ? 'Pick event type' : this.state.newEventKey}
                                            left={() => <List.Icon icon='event-note' color={
                                                this.state.newEventKey == '' ?
                                                    'black' :
                                                    this.state.newEventKey == 'Meetings' ?
                                                        eventProps['Meetings'] :
                                                        this.state.newEventKey == 'Misc Events' ? eventProps['Misc Events'] :
                                                            eventProps.classes[this.state.newEventKey]
                                            } />}
                                            style={[styles.listStyle, { margin: 5, paddingVertical: -20 }]}
                                            onPress={this._openMenu}
                                        />
                                    </List.Section>
                                }
                            >
                                {
                                    Object.keys(eventProps.classes).reverse().map((c, i) => {
                                        return (
                                            <Menu.Item
                                                key={i}
                                                title={c}
                                                onPress={() => {
                                                    this.setState({
                                                        newEventKey: c,
                                                        visible: false,
                                                    })
                                                }}
                                                icon='class'
                                                style={{
                                                    textDecorationColor: eventProps.classes[c],
                                                }}
                                            />
                                        )
                                    })
                                }

                                <Divider />

                                <Menu.Item
                                    title='Meetings'
                                    onPress={() => {
                                        this.setState({
                                            newEventKey: 'Meetings',
                                            visible: false,
                                        })
                                    }}
                                    icon='event'
                                />
                                <Menu.Item
                                    title='Misc Events'
                                    onPress={() => {
                                        this.setState({
                                            newEventKey: 'Misc Events',
                                            visible: false,
                                        })
                                    }}
                                    icon='bookmark'
                                />
                            </Menu>
                        </Provider>

                        <View style={{ flexDirection: 'row', paddingTop: 10, alignContent: 'space-around' }}>
                            <Button
                                icon='arrow-back'
                                mode="contained"
                                color='black'
                                style={{ margin: 10 }}
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                BACK
                        </Button>
                            <Button
                                icon='add'
                                mode="contained"
                                color={Colors.tintColor}
                                style={{ margin: 10 }}
                                onPress={() => {

                                    const temp = {
                                        date: this.state.selected,
                                        key: this.state.newEventKey,
                                        text: this.state.eventTitle,
                                        done: false,
                                        important: this.state.checked,
                                    }

                                    var newEventKey = firebase.database().ref().child('events').push().key
                                    var updates = {}
                                    updates['/events/' + newEventKey] = temp
                                    firebase.database().ref().update(updates)

                                    this.setModalVisible(!this.state.modalVisible);
                                    ToastAndroid.show('Event Added', ToastAndroid.SHORT)
                                }}>
                                ADD
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View >
        )
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }
}


const styles = StyleSheet.create({
    fab: {
        backgroundColor: Colors.tintColor,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    tempView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 215
    },
    emptyEvent: {
        paddingVertical: -20,
    },
    listStyle: {
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
})

const eventProps = {
    classes: {
        'CSE 3320': 'red',
        'CSE 3310': 'blue',
        'IE 3310': 'green',
    },
    'Meetings': 'orange',
    'Misc Events': 'blue',
}

const tempItems = {
    '2019-04-26': {
        dots: [
            { key: 'CSE 3320', color: eventProps.classes['CSE 3320'], text: 'Test 1', done: false, important: true },
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 2', done: false, important: false }
        ]
    },
    '2019-04-05': {
        dots: [
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Quiz 4', done: true, important: false }
        ]
    },
    '2019-04-20': {
        dots: [
            { key: 'IE 3310', color: eventProps.classes['IE 3310'], text: 'Quiz 3', done: false, important: true },
            { key: 'CSE 3310', color: eventProps.classes['CSE 3310'], text: 'Homework 3', done: true, important: false }
        ]
    },
}
