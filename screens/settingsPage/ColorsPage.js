// Shared preferences
import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Modal,
    AsyncStorage,
} from 'react-native';
import { Caption, Title, List, Text, Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ColorPalette from 'react-native-color-palette';

import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: 10,
        marginRight: 5,
        paddingRight: 30,
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
        alignSelf: 'center',
        fontSize: 15
    },
    listStyle: {
        paddingVertical: -20,
        borderRadius: 0,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    }
});

export default class ColorsPage extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Color Settings',
            headerLeft: (
                <Ionicons style={{ paddingLeft: 22 }} onPress={navigation.getParam('goBack')}
                    name="md-arrow-back" size={32} color={Colors.tintColor} />
            ),
        };
    };

    state = {
        events: {
            classes: {
                'Test Class': 'red'
            },
            'Meetings': 'orange',
            'Misc. Events': 'blue',
        },
        paletteVis: false,
        toChangeName: '-1',
        toChangeColor: '#000',
        addingClass: false,
        text: ' '
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
        // async () => {
        //     try {
        //         let value = await AsyncStorage.getItem('eventsProp');
        //         this.setState({
        //             events: value
        //         })
        //     } catch (error) {
        //         ToastAndroid.show('Error reading data', ToastAndroid.SHORT)
        //     }
        // }
    }

    // componentWillUnmount() {
    //     async () => {
    //         try {
    //             await AsyncStorage.setItem('eventsProp', JSON.stringify(this.state.events))
    //         } catch (error) {
    //             ToastAndroid.show('Error writing data', ToastAndroid.SHORT)
    //         }
    //     }
    // }

    _goBack = () => {
        this.props.navigation.navigate('SettingsStack');
    }

    setpaletteVis = (visible) => {
        this.setState({ paletteVis: visible });
    }

    render() {

        const ControlledColorPicker = () => {
            let selectedColor = Colors.colorPalette[0];
            return (
                <View style={styles.tempView}>
                    <ColorPalette
                        onChange={(color) => {
                            selectedColor = color

                            this.setState({
                                toChangeColor: selectedColor,
                            })
                        }}
                        value={selectedColor}
                        colors={Colors.colorPalette}
                        title={" "}
                        icon={
                            <Ionicons style={styles.iconStyle}
                                name="md-checkmark-circle-outline"
                                size={25} color={'black'}
                            />}
                        scaleToWindow={true}
                    />
                </View>
            )
        }

        const classes = this.state.events.classes

        return (
            <ScrollView style={{ flex: 1 }}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.paletteVis}
                    presentationStyle='pageSheet'
                    onRequestClose={() => {
                        this.setState({
                            toChangeName: '-1',
                            toChangeColor: '#000',
                            text: ' ',
                            addingClass: false,
                        })
                        this.setpaletteVis(false);
                    }}>
                    <View style={[styles.tempView, { padding: 50 }]}>
                        <View style={{ flex: 1, alignContent: 'center' }}>
                            <Text style={styles.tempText}>{this.state.addingClass ? 'Select color for new class' : 'Select new color'}</Text>

                            <ControlledColorPicker style={{ flex: 1 }} />
                        </View>

                        <View style={{ flex: 1 }}>
                            {(this.state.toChangeName !== 'Misc. Events' && this.state.toChangeName !== 'Meetings') &&
                                <TextInput
                                    style={{ height: 55 }}
                                    label={this.state.addingClass ? 'Tap to add class name' : 'Tap to edit class name'}
                                    value={this.state.text}
                                    mode='outlined'
                                    underlineColor={Colors.tintColor}
                                    multiline={false}
                                    onChangeText={text => this.setState({ text })}
                                />
                            }

                            <View style={{ flexDirection: 'row', paddingTop: 10, alignContent: 'space-around' }}>
                                <Button icon='arrow-back'
                                    mode="contained"
                                    color='black'
                                    style={{ marginHorizontal: 5 }}
                                    onPress={() => {
                                        this.setState({
                                            toChangeName: '-1',
                                            toChangeColor: '#000',
                                            text: ' ',
                                            addingClass: false,
                                        })
                                        this.setpaletteVis(false);
                                    }}
                                >
                                    BACK
                                </Button>

                                <Button icon={this.state.addingClass ? 'add' : 'edit'}
                                    mode="contained"
                                    color={Colors.tintColor}
                                    style={{ marginHorizontal: 5 }}
                                    onPress={() => {

                                        let tempC = this.state.events
                                        let name = this.state.toChangeName
                                        let color = this.state.toChangeColor

                                        if (name === 'Misc. Events' || name === 'Meetings') {
                                            tempC[name] = color
                                        } else {
                                            delete tempC.classes[name]
                                            if (this.state.text !== ' ') {
                                                name = this.state.text
                                            }
                                            tempC.classes[name] = color
                                        }

                                        this.setState({
                                            events: tempC,
                                            toChangeName: '-1',
                                            toChangeColor: '#000',
                                            text: ' ',
                                            addingClass: false,
                                        })

                                        this.setpaletteVis(false);
                                    }}
                                >
                                    {this.state.addingClass ? 'ADD' : 'EDIT'}
                                </Button>

                                {(this.state.toChangeName !== 'Meetings' && this.state.toChangeName !== 'Misc. Events' && !this.state.addingClass) &&
                                    <Button icon='delete'
                                        mode="contained"
                                        color='red'
                                        style={{ marginHorizontal: 5 }}
                                        onPress={() => {
                                            let tempC = this.state.events
                                            delete tempC.classes[this.state.toChangeName]
                                            this.setState({
                                                events: tempC,
                                                toChangeName: '-1',
                                                toChangeColor: '#000',
                                                text: ' ',
                                            })
                                            this.setpaletteVis(false);
                                        }}
                                    >
                                        DELETE
                                    </Button>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>

                <List.Section>
                    <List.Subheader>Classes</List.Subheader>
                    {
                        Object.keys(classes).reverse().map((c, i) => {
                            return (
                                <List.Item
                                    key={i}
                                    title={c}
                                    right={() => <List.Icon icon='format-color-fill' color={classes[c]} />}
                                    style={styles.listStyle}
                                    onPress={() => {
                                        this.setState({
                                            toChangeName: c
                                        })
                                        this.setpaletteVis(true)
                                    }}
                                />
                            )
                        })
                    }

                    {(Object.keys(this.state.events.classes).length < 8) &&
                        <List.Item
                            title='Add Class'
                            left={() => <List.Icon icon='add' />}
                            style={styles.listStyle}
                            onPress={() => {
                                this.setState({
                                    toChangeName: '!!!tempname!!!',
                                    addingClass: true,
                                })
                                this.setpaletteVis(true)
                            }}
                        />
                    }

                    <List.Subheader>Other Events</List.Subheader>
                    <List.Item
                        key={6}
                        title='Meetings'
                        right={() => <List.Icon icon='format-color-fill' color={this.state.events['Meetings']} />}
                        style={styles.listStyle}
                        onPress={() => {
                            this.setState({
                                toChangeName: 'Meetings'
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <List.Item
                        key={7}
                        title='Misc. Events'
                        right={() => <List.Icon icon='format-color-fill' color={this.state.events['Misc. Events']} />}
                        style={styles.listStyle}
                        onPress={() => {
                            this.setState({
                                toChangeName: 'Misc. Events'
                            })
                            this.setpaletteVis(true);
                        }}
                    />
                </List.Section>

                <Caption style={{ alignSelf: 'center' }}>Tap on class to edit it.</Caption>
            </ScrollView>
        )
    }
}

