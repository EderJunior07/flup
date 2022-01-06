import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import BottomNav from './bottom.routes';
import { createStackNavigator } from '@react-navigation/stack';

enableScreens();
const { Navigator, Screen } = createStackNavigator();

const AppRoutes = () => {

  return (
    <Navigator
      screenOptions={{  headerShown: false, cardStyle: { opacity: 1 }}}
      initialRouteName={'BottomNav'}
    >
      <Screen name="BottomNav" component={BottomNav} />
    </Navigator>
  );
};

export default AppRoutes;
