import React, { useEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';
import BottomNav from './bottom.routes';
import { createStackNavigator } from '@react-navigation/stack';
import { GetCurrentUser } from '../services/firestore/userMethods';
import { useAuth } from '../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { AppStore } from '../store/types';

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
