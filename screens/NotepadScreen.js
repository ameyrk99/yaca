import React from 'react';
import {
    StyleSheet,
    ToastAndroid,
    View,
} from 'react-native';
import { TextInput, FAB } from 'react-native-paper';

import Colors from '../constants/Colors'
import { db } from '../database/config';
import firebase from 'firebase';

const styles = StyleSheet.create({
    fab: {
        backgroundColor: Colors.tintColor,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default class NotepadScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Notepad',
    };

    state = {
        userID: firebase.auth().currentUser.uid,
        text: ''
    }

    /* Get the notes of particular user from firebase */
    fetchNotes = () => {
        firebase.database().ref('/users/'+this.state.userID).once('value', snapshot => {
            let tempn = this.state.text
            tempn = snapshot.child('notes').val()
            this.setState({
                text: tempn,
            })
        })
    }

    /* Call the fetchNotes function at the start */
    componentDidMount() {
        this.fetchNotes()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ height: 420, margin: 30 }}
                    theme={{
                        colors: {
                            primary: Colors.tintColor,
                        }
                    }}
                    label='Take notes here'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                    editable={true}
                    returnKeyType='none'
                    mode='outlined'
                    maxLength={1000}
                    multiline={true}
                    numberOfLines={10}
                />

                <FAB
                    style={styles.fab}
                    color={Colors.noticeText}
                    icon="save"
                    onPress={() => {
                        ToastAndroid.show('Note Saved', ToastAndroid.SHORT)
                        firebase.database().ref('/users/'+this.state.userID).update({notes: this.state.text})
                    }}
                />
            </View>
        )
    }
}
