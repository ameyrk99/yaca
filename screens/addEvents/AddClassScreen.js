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

export default class AddClass extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            //date: '',
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'About YACA',
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
            Alert.alert('Class added!');
            db.ref('/class/name').push({name: this.state.name});
            //db.ref('/class/date').push({date: this.state.date});
            this.props.navigation.navigate('AddEvent');
        }

        else
        {
            Alert.alert('Please enter a class.');
        }
     }

    render() {
        return (
            <View style={{padding: 10}}>
                <TextInput style={{height: 40}} placeholder="Add a class" onChangeText={(text) => this.setState({name:text})}/> 
                <Button onPress={() => this._handlePress()} style={styles.buttonStyle} title="Enter"></Button>
            </View>
        )
    }
}
