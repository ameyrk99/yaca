import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { Text, List } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { WebBrowser } from 'expo';

import Colors from '../../constants/Colors'

export default class UserLogPage extends React.Component {

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    _goBack = () => {
        this.props.navigation.navigate('HomeStack');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.upperSec}
                    onPress={() => WebBrowser.openBrowserAsync('https://github.com/ameyrk99/yaca')}
                >
                    <Image
                        source={require('./icon.png')}
                    />
                    <Text style={{ margin: 10, textAlign: 'center' }}>
                        Yet Another Calendar App
                    </Text>
                </TouchableOpacity>
                <List.Section style={{ flex: 1 }}>
                    <List.Item
                        title='Sign-in with Google'
                        left={() => 
                            <Ionicons style={{ paddingLeft: 22 }}
                            name="logo-google" size={35} color={Colors.tintColor} />
                        }
                        style={styles.listStyle}
                        onPress={this._goBack}
                    />
                </List.Section>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    upperSec: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    listStyle: {
        margin: 50,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: '#d6d7da',
    }
})
