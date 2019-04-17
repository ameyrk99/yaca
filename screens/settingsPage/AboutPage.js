import React from 'react';
import {
    StyleSheet,
    Text,
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
        fontSize: 45
    }
});

export default class AboutPage extends React.Component {

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
        this.props.navigation.navigate('SettingsStack');
    }

    render() {
        return (
            <View style={styles.tempView}>
                <Text>
                    YACA as in Yet Another Calendar Application is a app to help students manage
                    their school events easily.
                </Text>
            </View>
        )
    }
}
