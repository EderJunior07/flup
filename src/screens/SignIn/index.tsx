import Button from '../../components/Button';
import React from 'react';
import { Text, View } from 'react-native';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <>
      <Container>
        <Button
          onPress={signInWithGoogle}
          title="Entrar"
          type="secondary"
        ></Button>
      </Container>
    </>
  );
};

export default SignIn;
