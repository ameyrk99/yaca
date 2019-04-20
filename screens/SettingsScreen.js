import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Caption, Title, List } from 'react-native-paper';

import Colors from '../constants/Colors'

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: 10,
        marginRight: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    tempView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    tempText: {
        fontWeight: 'bold',
        fontSize: 45
    },
    listStyle: {
        paddingVertical: -20,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
});

export default class HomeScreen extends React.Component {

    static navigationOptions = {
        headerTitle: 'Settings',
    };

    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 15 }}>
                <List.Section>
                    <List.Item
                        title='Backup/Restore'
                        left={() => <List.Icon icon='cloud' />}
                        right={() => <List.Icon icon='keyboard-arrow-right' />}
                        style={styles.listStyle}
                        onPress={() => this.props.navigation.navigate('Backup')}
                    />
                    <List.Item
                        title='Colors'
                        left={() => <List.Icon icon="color-lens" />}
                        right={() => <List.Icon icon='keyboard-arrow-right' />}
                        style={styles.listStyle}
                        onPress={() => this.props.navigation.navigate('Color')}
                    />
                    <List.Item
                        title='Notifications'
                        left={() => <List.Icon icon="notifications" />}
                        right={() => <List.Icon icon='keyboard-arrow-right' />}
                        style={styles.listStyle}
                        onPress={() => this.props.navigation.navigate('Notifications')}
                    />
                    <List.Item
                        title='About'
                        left={() => <List.Icon icon="info" />}
                        right={() => <List.Icon icon='keyboard-arrow-right' />}
                        style={styles.listStyle}
                        onPress={() => this.props.navigation.navigate('About')}
                    />
                </List.Section>
                <View style={styles.tempView} >
                    <Title>YACA</Title>
                    <Caption>alpha 0.2019.04.18</Caption>
                </View>
            </View>
        );
    }
}
