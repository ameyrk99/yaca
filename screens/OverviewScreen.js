import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

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
})

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <View style={styles.tempView}>
                <Text style={styles.tempText}>Overview</Text>
            </View>
        )
    }
}
