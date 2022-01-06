

import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator();

const RoutesAuth = () => {
 

  return (
    <Navigator
      initialRouteName={'SignIn'}
      screenOptions={{animation: 'slide_from_right', headerShown: false}}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};

export default RoutesAuth;