import React from 'react';
import {enableScreens} from 'react-native-screens'
import {createStackNavigator} from '@react-navigation/stack'

import { useTheme } from '@react-navigation/native';
import { View } from 'react-native';
import Perfil from '../../screens/Perfil';

enableScreens();

const {Navigator, Screen} = createStackNavigator();

const PerfilStack = () => {

  return (
    <View style={{ flex:1, backgroundColor: '#000' }}>
      <Navigator
        initialRouteName={'PerfilInitial'}
        screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#000000', opacity: 1}}}>
        <Screen name="PerfilInitial" component={Perfil} />
       
      </Navigator>
    </View>
  );
};

export default PerfilStack;
