import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen';
// import AddEventScreen from '../screens/AddEventScreen';
// import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import NotepadScreen from '../screens/NotepadScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) =>
    <TabBarIcon
      color={tintColor}
      name='md-home'
    />
};

const OverviewStack = createStackNavigator({
  Overview: OverviewScreen,
});

OverviewStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarIcon: ({ tintColor }) =>
    <TabBarIcon
      color={tintColor}
      name='md-calendar'
    />
};

// const AddEventStack = createStackNavigator({
//   AddEvent: AddEventScreen,
// });

// AddEventStack.navigationOptions = {
//   tabBarLabel: 'Add Event',
//   tabBarIcon: (
//     <TabBarIcon
//       name='md-add'
//     />
//   ),
// };

const NoteStack = createStackNavigator({
  Note: NotepadScreen,
});

NoteStack.navigationOptions = {
  tabBarLabel: 'Notepad',
  tabBarIcon: ({ tintColor }) =>
    <TabBarIcon
      color={tintColor}
      name='md-create'
    />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ tintColor }) =>
    <TabBarIcon
      color={tintColor}
      name='md-settings'
    />
};

export default createMaterialBottomTabNavigator({
  HomeStack,
  OverviewStack,
  NoteStack,
  SettingsStack,
}, {
    resetOnBlur: true,
    shifting: true,
    barStyle: {
      backgroundColor: '#FFFFFF',
    },
    activeTintColor: Colors.tintColor
  }
);
