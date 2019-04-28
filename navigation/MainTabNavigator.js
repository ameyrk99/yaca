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

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: (
    <TabBarIcon
      name='md-home'
    />
  ),
};

const OverviewStack = createStackNavigator({
  Overview: OverviewScreen,
});

OverviewStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarIcon: (
    <TabBarIcon
      name='md-calendar'
    />
  ),
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

// const SearchStack = createStackNavigator({
//   Search: SearchScreen,
// });

// SearchStack.navigationOptions = {
//   tabBarLabel: 'Search',
//   tabBarIcon: (
//     <TabBarIcon
//       name='md-search'
//     />
//   ),
// };

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: (
    <TabBarIcon
      name='md-settings'
    />
  ),
};

export default createMaterialBottomTabNavigator({
  HomeStack,
  OverviewStack,
  SettingsStack,
}, {
    shifting: true,
    barStyle: {
      backgroundColor: Colors.tintColor,
    },
    activeColor: '#FFFFFF',
  }
);
