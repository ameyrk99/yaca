import React from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import AboutPage from '../screens/settingsPage/AboutPage';
import NotificationsPage from '../screens/settingsPage/NotficationsPage';
import ColorsPage from '../screens/settingsPage/ColorsPage'
import BackupPage from '../screens/settingsPage/BackupPage'
import HomeScreen from '../screens/HomeScreen'
import AddEventScreen from '../screens/addEvents/AddEventScreen'
import AddActualEventScreen from '../screens/addEvents/AddActualEventScreen'
import AddClassScreen from '../screens/addEvents/AddClassScreen'
import { create } from 'uuid-js';

/* We could simplify this by doing: 
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},

  const App = createAppContainer(MainNavigator);
});
*/


// Settings Stacks
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

// Home Stacks
const AddEventStack = createStackNavigator({
    AddEvent: { screen: AddEventScreen }
});

const AddActualEventStack = createStackNavigator({
    AddActualEvent: { screen: AddActualEventScreen }
});

const AddClassStack = createStackNavigator({
    AddClass: { screen: AddClassScreen }
})


export default createAppContainer(createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
        Main: MainTabNavigator,
        About: AboutStack,
        Notifications: NotificationStack,
        Color: ColorsStack,
        Backup: BackupStack,
        AddEvent: AddEventStack,
        AddActualEvent: AddActualEventStack,
        AddClass: AddClassStack,
    }
));