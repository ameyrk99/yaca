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

const libs = {
    'React': 'https://reactjs.org',
    'React Native': 'https://facebook.github.io/react-native/',
    'Expo': 'https://expo.io',
    'Firebase': 'https://firebase.google.com/',
    'react-navigation': 'https://reactnavigation.org/',
    'react-navigation-material-bottom-tabs': 'https://github.com/react-navigation/react-navigation-material-bottom-tabs',
    'react-native-paper': 'https://callstack.github.io/react-native-paper/',
    'react-native-calendars': 'https://github.com/wix/react-native-calendars',
    'react-native-color-palette': 'https://www.npmjs.com/package/react-native-color-palette',
    'react-native-emoji': 'https://github.com/EricPKerr/react-native-emoji',
    'react-native-modal-datetime-picker': 'https://github.com/mmazzarolo/react-native-modal-datetime-picker',
    'react-native-vector-icons': 'https://github.com/oblador/react-native-vector-icons',
}

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
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.upperSec}
                    onPress={() => WebBrowser.openBrowserAsync('https://github.com/ameyrk99/yaca')}
                >
                    <Image
                        source={require('./icon.png')}
                    />
                    <Text style={{ margin: 10, textAlign: 'center' }}>
                        YACA as in Yet Another Calendar Application is a app to help students manage
                        their school events easily.
                    </Text>
                </TouchableOpacity>
                <List.Subheader>Open Source Libraries/Frameworks</List.Subheader>
                <ScrollView style={{ flex: 5 }}>
                    <List.Section>
                        {
                            Object.keys(libs).map((l, i) => {
                                return (
                                    <List.Item
                                        key={i}
                                        title={l}
                                        right={() => <List.Icon icon='web' />}
                                        style={styles.listStyle}
                                        onPress={() => WebBrowser.openBrowserAsync(libs[l])}
                                    />
                                )
                            })
                        }
                    </List.Section>
                </ScrollView>
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
        paddingVertical: -20,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
})
