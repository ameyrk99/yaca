import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ScrollView,
    ToastAndroid
} from 'react-native';
import { Title, List, Text, Button, FAB, TextInput, Menu, Divider, Provider } from 'react-native-paper';
import Emoji from 'react-native-emoji';
import { CalendarList } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import { db } from '../database/config'
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
            items: items,
            visible: false,
            modalVisible: false,
            status: 'checked',
            newEvent: {
                key: '',
                text: '',
                done: false,
            }
        }
        this.onDayPress = this.onDayPress.bind(this)
    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    render() {

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
                                        style={styles.emptyEvent}
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
                            newEvent: {
                                key: '',
                                text: '',
                                done: false,
                            }
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
                            style={{ height: 50, margin: 10 }}
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

                        <Provider>
                            <Menu
                                visible={this.state.visible}
                                onDismiss={this._closeMenu}
                                anchor={
                                    <List.Section>
                                        <List.Item
                                            title={this.state.newEvent.key == '' ? 'Pick event type' : this.state.newEvent.key}
                                            left={() => <List.Icon icon='event-note' color={this.state.newEvent.key == '' ? 'black' : eventProps.classes[this.state.newEvent.key]} />}
                                            style={styles.listStyle}
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
                                                    const temp = this.state.newEvent
                                                    temp.key = c
                                                    this.setState({
                                                        newEvent: temp,
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
                                <Menu.Item
                                    title='Meetings'
                                    onPress={() => {
                                        const temp = this.state.newEvent
                                        temp.key = 'Meetings'
                                        this.setState({
                                            newEvent: temp,
                                            visible: false,
                                        })
                                    }}
                                    icon='event'
                                />
                                <Menu.Item
                                    title='Misc. Events'
                                    onPress={() => {
                                        const temp = this.state.newEvent
                                        temp.key = 'Misc. Events'
                                        this.setState({
                                            newEvent: temp,
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
                                    const temp = this.state.newEvent
                                    temp.text = this.state.eventTitle
                                    this.setState({
                                        newEvent: temp,
                                    })
                                    this.setModalVisible(!this.state.modalVisible);
                                    ToastAndroid.show('Event Added', ToastAndroid.SHORT)

                                    var newEventKey = firebase.database().ref().child('posts').push().key
                                    var updates = {}
                                    updates['/events/' + newEventKey] = this.state.newEvent
                                    firebase.database().ref().update(updates)
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
        paddingVertical: -20,
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
    'Misc. Events': 'blue',
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
