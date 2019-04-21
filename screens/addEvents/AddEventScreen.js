import React from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    tempView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 30
    }
});

export default class AddEventScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Add Events',
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
        this.props.navigation.navigate('HomeStack');
    }

    render() {
        return (        
        <View style={{margin: 50, padding: 50, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <View style={{flex: 1}}>
               <Button onPress={() => this.props.navigation.navigate('AddActualEvent')} color='#00b8ff' title="Add Event"/>
            </View>

            <View style={{flex: 1}}>
                <Button onPress={() => this.props.navigation.navigate('AddClass')} color='#d600ff' title="Add Class"/>
            </View>
        </View>
        )
    }
}