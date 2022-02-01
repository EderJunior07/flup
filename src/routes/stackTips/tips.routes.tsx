import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from '../../screens/Explore';
import Tips from '../../screens/tips';

enableScreens();
const { Navigator, Screen } = createNativeStackNavigator();

const TipsStack = () => {
  return (
    <Navigator
      initialRouteName={'ExploreInitial'}
      screenOptions={{ animation: 'fade', headerShown: false }}
    >
      <Screen name="Tips" component={Tips} />
    </Navigator>
  );
};

export default TipsStack;
