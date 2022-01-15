import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Poppins_600SemiBold,
  Poppins_100Thin,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';

import Routes from './src/routes';
import { AuthProvider, useAuth } from './src/hooks/auth';
import theme from './src/theme';
import { StatusBar } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Geocoder from 'react-native-geocoding';

GoogleSignin.configure({
  webClientId:
    '907126516221-4qlpjsf9lcg7ch9e8023k9vsbqjqonkk.apps.googleusercontent.com',
});

Geocoder.init('AIzaSyD8oNI5P5nkaW_go0J4IXq_MUE6hIInKuM', { language: 'pt-br' });

const App = () => {
  const [fontsLoaded] = useFonts({
    DMSans_Regular: DMSans_400Regular,
    DMSans_Medium: DMSans_500Medium,
    DMSans_Bold: DMSans_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="#000" />
        <Provider store={store}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
