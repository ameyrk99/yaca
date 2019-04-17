import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AboutPage from '../screens/settingsPage/AboutPage';
import NotificationsPage from '../screens/settingsPage/NotficationsPage';

const AboutStack = createStackNavigator({
    About: {
        screen: AboutPage,
        navigationOptions: {
            headerBackTitle: 'SettingsStack',
        }
    }
});

const NotificationStack = createStackNavigator({
    Notifications: {
        screen: NotificationsPage,
        navigationOptions: {
            headerBackTitle: 'SettingsStack',
        }
    },
});

export default createAppContainer(createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
        Main: MainTabNavigator,
        About: AboutStack,
        Notification: NotificationStack,
    }
));