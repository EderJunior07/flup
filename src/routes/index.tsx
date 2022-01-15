import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RoutesAuth from './auth.routes';
import { useAuth } from '@hooks/auth';
import AppRoutes from './app.routes';
import { useSelector } from 'react-redux';
import { AppStore } from '@src/store/types';

const Routes = () => {
  const {
    user: { id },
  } = useSelector((state: AppStore) => state);

  const navigationRef = useRef<any>();
  const routeNameRef = useRef();

  
  useEffect(() => {
    console.log('THE USER LOGGED IN ', id)
  }, [id])

  return (
    <>
      <NavigationContainer
        theme={{ colors: { background: '#000' } as any } as any}
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
      >
        {!id ? <RoutesAuth /> : <AppRoutes />}
      </NavigationContainer>
    </>
  );
};

export default Routes;
