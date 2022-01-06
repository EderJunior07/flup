import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { Poppins_600SemiBold, Poppins_100Thin} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';

import Routes from './src/routes';
import { AuthContext, AuthProvider, useAuth } from './src/hooks/auth';
import theme from './src/theme';
import { StatusBar } from 'react-native';

const App = () => {
  const [fontsLoaded] = useFonts({
    DMSans_Regular:  DMSans_400Regular,
    DMSans_Medium:  DMSans_500Medium,
    DMSans_Bold: DMSans_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="#000"/>
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
