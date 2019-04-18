// Shared preferences
import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Modal,
    Button,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SettingsList from 'react-native-settings-list';
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
    }
});

let eventsProp = {
    classes: {
        'CSE 3320': 'red',
        'CSE 3310': 'blue',
        'IE 2320': 'green',
        'COMS 2302': 'pink',
    },
    'Meetings': 'orange',
    'Misc. Events': 'yellow'
}

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
        events: eventsProp,
        paletteVis: false,
        toChangeName: '-1',
        toChangeColor: '#000',
        addingClass: false,
        text: ' '
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

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

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {(this.state.toChangeName !== 'Misc. Events' && this.state.toChangeName !== 'Meetings') && <TextInput
                                style={{ height: 40 }}
                                placeholder={this.state.addingClass ? 'Tap to add class name' : 'Tap to edit class name'}
                                onChangeText={(text) => this.setState({ text })}
                                maxLength={15}
                                multiline={false}
                            />}

                            <View style={{ flexDirection: 'row', paddingTop: 10, alignContent: 'space-around' }}>
                                <Ionicons style={styles.iconStyle}
                                    name="md-arrow-back"
                                    size={32} color={'black'}
                                    onPress={() => {
                                        this.setState({
                                            toChangeName: '-1',
                                            toChangeColor: '#000',
                                            text: ' ',
                                            addingClass: false,
                                        })
                                        this.setpaletteVis(false);
                                    }}
                                />

                                <Ionicons style={styles.iconStyle}
                                    name={this.state.addingClass ? 'md-add-circle' : 'md-build'}
                                    size={32} color={Colors.tintColor}
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
                                />

                                {(this.state.toChangeName !== 'Meetings' && this.state.toChangeName !== 'Misc. Events' && !this.state.addingClass) &&
                                    <Ionicons style={styles.iconStyle}
                                        name="md-trash"
                                        size={32} color={'red'}
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
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </Modal>

                <SettingsList>
                    <SettingsList.Header headerText='Classes' headerStyle={{ color: 'black', marginTop: 10 }} />

                    {
                        Object.keys(classes).reverse().map((c, i) => {
                            return (
                                <SettingsList.Item
                                    key={i}
                                    title={c}
                                    arrowIcon={<Ionicons style={styles.iconStyle}
                                        name="md-square"
                                        size={32} color={classes[c]}
                                    />}
                                    hasNavArrow={false}
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

                    {(Object.keys(this.state.events.classes).length < 8) && <SettingsList.Item
                        title='Add Class'
                        icon={<Ionicons style={styles.iconStyle} name='md-add-circle' size={32} color={Colors.tintColor} />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChangeName: '!!!tempname!!!',
                                addingClass: true,
                            })
                            this.setpaletteVis(true)
                        }}
                    />}

                    <SettingsList.Header headerText='Other Events' headerStyle={{ color: 'black', marginTop: 20 }} />
                    <SettingsList.Item
                        key={6}
                        title='Meetings'
                        arrowIcon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={this.state.events['Meetings']}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChangeName: 'Meetings'
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={7}
                        title='Misc. Events'
                        arrowIcon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={this.state.events['Misc. Events']}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChangeName: 'Misc. Events'
                            })
                            this.setpaletteVis(true);
                        }}
                    />
                </SettingsList>
            </ScrollView>
        )
    }
}

