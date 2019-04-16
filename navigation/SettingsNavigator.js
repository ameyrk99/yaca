import { createStackNavigator, createAppContainer } from 'react-navigation';

import AboutPage from '../screens/settingsPage/AboutPage';

const SettingsNavigator = createStackNavigator({
    About: { screen: AboutPage },
});

export default SettingsNavigator;