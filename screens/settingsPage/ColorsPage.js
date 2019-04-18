import React from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Modal,
    TouchableHighlight,
    Button,
} from 'react-native';
import update from 'react-addons-update';
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
    'CSE 3320 - Operating Systems': 'red',
    'CSE 3310 - Fundamentals of SE': 'blue',
    'IE 2320 - Stats and Probability': 'green',
    'Class 4': 'black',
    'Class 5': 'black',
    'Class 6': 'black',
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
        toChange: -1,
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
        // let ClassList = [];
        const names = Object.keys(this.state.events)
        const ccolors = Object.values(this.state.events)
        // for (var i = 0; i < 6; i++) {
        //     ClassList.push(
        //         <SettingsList.Item
        //             key={i}
        //             title={names[i]}
        //             icon={<Ionicons style={styles.iconStyle}
        //                 name="md-square"
        //                 size={32} color={ccolors[i]}
        //             />}
        //             hasNavArrow={false}
        //             onPress={() => {
        //                 this.setState({
        //                     toChange: i,
        //                 })
        //                 this.setpaletteVis(true);
        //             }}
        //         />
        //     );
        // }

        const ControlledColorPicker = () => {
            let selectedColor = Colors.colorPalette[0];
            return (
                <View style={styles.tempView}>
                    <ColorPalette
                        onChange={(color) => {
                            selectedColor = color;
                            let tempC = this.state.events
                            tempC[names[this.state.toChange]] = selectedColor
                            this.setState({
                                events: tempC,
                                toChange: -1,
                            })
                            this.setpaletteVis(false);
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

        return (
            <ScrollView style={{ flex: 1 }}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.paletteVis}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={[styles.tempView, { padding: 100 }]}>
                        <View>
                            <Text style={styles.tempText}>Select new color</Text>

                            <ControlledColorPicker style={{ flex: 1 }} />

                            <Button
                                onPress={() => {
                                    this.setpaletteVis(!this.state.paletteVis);
                                    this.setState({
                                        toChange: -1,
                                    })
                                }}
                                title='Cancel'
                                color={Colors.tintColor}
                                accessibilityLabel='Cancel new selection of color.'
                            />
                        </View>
                    </View>
                </Modal>

                <SettingsList>
                    <SettingsList.Header headerText='Classes (Hold to delete class)' headerStyle={{ color: 'black', marginTop: 10 }} />
                    
                    <SettingsList.Item
                        key={0}
                        title={names[0]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[0]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 0
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={1}
                        title={names[1]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[1]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 1
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={2}
                        title={names[2]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[2]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 2
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={3}
                        title={names[3]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[3]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 3
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={4}
                        title={names[4]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[4]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 4
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={5}
                        title={names[5]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[5]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 5
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Header headerText='Other Events' headerStyle={{ color: 'black', marginTop: 20 }} />
                    <SettingsList.Item
                        key={6}
                        title={names[6]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[6]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 6
                            })
                            this.setpaletteVis(true);
                        }}
                    />

                    <SettingsList.Item
                        key={7}
                        title={names[7]}
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={ccolors[7]}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setState({
                                toChange: 7
                            })
                            this.setpaletteVis(true);
                        }}
                    />
                </SettingsList>
            </ScrollView>
        )
    }
}

