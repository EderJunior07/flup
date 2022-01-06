import Button from '../../components/Button';
import React from 'react';
import { Text, View } from 'react-native';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

import {  } from '@react-native-firebase/auth';

// import { GoogleSignin } from '@react-native-google-signin/google-signin';



import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

const SignIn = () => {
  const { signInWithGoogle } = useAuth();


  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '778336797649-9b5na6h2gakf1qsgab36bjkvbgh8ru3b.apps.googleusercontent.com',
      },
  );

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;
      
  //     const auth = getAuth();
  //     const provider = new GoogleAuthProvider();
  //     const credential = provider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      console.log(authentication)
      }
  }, [response]);

  return (
    <>
      <Container>
        <Button
          onPress={() => promptAsync()}
          title="Entrar"
          type="secondary"
        ></Button>
      </Container>
    </>
  );
};

export default SignIn;
