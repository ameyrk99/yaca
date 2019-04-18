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


let classNames = ['CSE 3320 - Operating Systems', 'CSE 3310 - Fundamentals of SE', 'IE 2320 - Stats and Probability', ' ', ' ', ' '];
let classColors = ['red', 'blue', 'green', 'black', 'black', 'black'];
let meetingColor = 'orange';
let miscEventsColor = 'yellow';

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
        names: classNames,
        ccolors: classColors,
        mcolor: meetingColor,
        micolor: miscEventsColor,
        paletteVis: false,
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

        let ClassList = [];
        for (var i = 0; i < 6; i++) {
            ClassList.push(
                <SettingsList.Item
                    key={i}
                    title={this.state.names[i]}
                    icon={<Ionicons style={styles.iconStyle}
                        name="md-square"
                        size={32} color={this.state.ccolors[i]}
                    />}
                    hasNavArrow={false}
                    onPress={() => {
                        this.setpaletteVis(true);
                    }}
                />
            );
        }

        const ControlledColorPicker = () => {
            let selectedColor = Colors.colorPalette[0];
            return (
                <View style={styles.tempView}>
                    <ColorPalette
                        onChange={color => selectedColor = color}
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
                    {ClassList}
                    <SettingsList.Header headerText='Other Events' headerStyle={{ color: 'black', marginTop: 20 }} />
                    <SettingsList.Item
                        key={6}
                        title='Meetings'
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={this.state.mcolor}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setpaletteVis(true);
                        }}
                    />
                    <SettingsList.Item
                        key={7}
                        title='Misc. Events'
                        icon={<Ionicons style={styles.iconStyle}
                            name="md-square"
                            size={32} color={this.state.micolor}
                        />}
                        hasNavArrow={false}
                        onPress={() => {
                            this.setpaletteVis(true);
                        }}
                    />
                </SettingsList>
            </ScrollView>
        )
    }
}

