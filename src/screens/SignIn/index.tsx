import Button from '../../components/Button';
import React from 'react';
import { Alert, Text, View } from 'react-native';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
// Initialize Firebase

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const { signIn, user } = useAuth();

  function handleSignIn() {
    signIn('ederjr6@gmail.com', '12345678');
  }


  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     '778336797649-9b5na6h2gakf1qsgab36bjkvbgh8ru3b.apps.googleusercontent.com',
  // });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;

  //     signInWithGoogle(id_token);
  //   }else if (response?.type === 'error') {
  //     Alert.alert('erro');
  //   }
  // }, [response]);

  return (
    <>
      <Container>
        <Button
          onPress={() => handleSignIn()}
          title="Entrar"
          type="secondary"
        ></Button>

        <Text>{JSON.stringify(user)}</Text>
      </Container>
    </>
  );
};

export default SignIn;
