import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AboutPage from '../screens/settingsPage/AboutPage';
import NotificationsPage from '../screens/settingsPage/NotficationsPage';
import ColorsPage from '../screens/settingsPage/ColorsPage'
import UserLogPage from '../screens/settingsPage/UserLogPage'

const AboutStack = createStackNavigator({
    About: { screen: AboutPage }
});

const NotificationStack = createStackNavigator({
    Notifications: { screen: NotificationsPage }
});

const ColorsStack = createStackNavigator({
    Color: { screen: ColorsPage }
});

const UserLogStack = createStackNavigator(
    {
        LogOn: { screen: UserLogPage }
    }, {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        Main: MainTabNavigator,
        About: AboutStack,
        Notifications: NotificationStack,
        Color: ColorsStack,
        LogOn: UserLogStack,
    },
    {
        initialRouteName: 'LogOn',
    }
));