

import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Explore from '../../screens/Explore';

enableScreens();
const {Navigator, Screen} = createNativeStackNavigator();

const ExploreStack = () => {
 

  return (
    <Navigator
      initialRouteName={'ExploreInitial'}
      screenOptions={{animation: 'fade', headerShown: false}}>
      <Screen name="ExploreInitial" component={Explore} />
    </Navigator>
  );
};

export default ExploreStack;
