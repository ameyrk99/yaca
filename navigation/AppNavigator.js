import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AboutPage from '../screens/settingsPage/AboutPage';
import NotificationsPage from '../screens/settingsPage/NotficationsPage';
import ColorsPage from '../screens/settingsPage/ColorsPage'
import BackupPage from '../screens/settingsPage/BackupPage'

const AboutStack = createStackNavigator({
    About: { screen: AboutPage }
});

const NotificationStack = createStackNavigator({
    Notifications: { screen: NotificationsPage }
});

const ColorsStack = createStackNavigator({
    Color: { screen: ColorsPage }
});

const BackupStack = createStackNavigator({
    BackRes: { screen: BackupPage }
});

export default createAppContainer(createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
        Main: MainTabNavigator,
        About: AboutStack,
        Notifications: NotificationStack,
        Color: ColorsStack,
        Backup: BackupStack,
    }
));