import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';

enableScreens();
const { Navigator, Screen } = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Navigator
      initialRouteName={'HomeInitial'}
      screenOptions={{ animation: 'fade', headerShown: false }}
    >
      <Screen name="HomeInitial" component={Home} />
    </Navigator>
  );
};

export default HomeStack;
