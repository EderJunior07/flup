import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';


import RoutesAuth from './auth.routes';
import { useAuth } from '@hooks/auth';
import AppRoutes from './app.routes';

const Routes = () => {
  const { user } = useAuth();
  const navigationRef = useRef<any>();
  const routeNameRef = useRef();

  const { id } = user;

  return (
    <>
      <NavigationContainer
        theme={{ colors: { background: '#000' } as any } as any}
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
      >
        {!id ? <RoutesAuth /> : <AppRoutes/>}
      </NavigationContainer>
    </>
  );
};

export default Routes;
