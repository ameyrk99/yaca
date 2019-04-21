import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

import { db } from '../../database/config'

const styles = StyleSheet.create({
    tempView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 45
    }
});

export default class AddActualEvent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            date: '',
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Add An Event',
            headerLeft: (
                <Ionicons style={{ paddingLeft: 22 }} onPress={navigation.getParam('goBack')}
                    name="md-arrow-back" size={32} color={Colors.tintColor} />
            ),
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    _goBack = () => {
        this.props.navigation.navigate('AddEvent');
    }

    _handlePress() {
        if (this.state.name !== '')
        {
            Alert.alert('Event added!');
            db.ref('/events/name').push({name: this.state.name});
            db.ref('/events/date').push({date: this.state.date});
            this.props.navigation.navigate('AddEvent');
        }

        else
        {
            Alert.alert('Please enter an event.');
        }
     }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput style={{height: 40}} placeholder="Add a homework, tests, quizzes, etc." onChangeText={(text) => this.setState({name:text})}/>
                <TextInput style={{height: 40}} placeholder="Add the data it's due" onChangeText={(text) => this.setState({date:text})}/>
                <Button onPress={() => this._handlePress()} style={styles.buttonStyle} title="Enter"></Button>
            </View>
        )
    }
}
