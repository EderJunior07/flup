import Button from '../../components/Button';
import React, { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from './styles';
import { useAuth, User } from '../../hooks/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { SetUser } from '../../store/ducks/user/actions';
import {
  CreateUserCollection,
  GetCurrentUser,
} from '../../services/firestore/userMethods';
import { useTheme } from 'styled-components/native';

const USER_COLLECTION = '@flup:user';

const SignIn = () => {
  const { COLORS } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const googleSignIn = async () => {
    GoogleSignin.signIn()
      .then(async ({ idToken, user }) => {
        setLoading(true);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        auth().signInWithCredential(googleCredential);

        if (user) {
          const userToDispatch: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            photoUrl: user.photo,
            phoneNumber: null,
          };

          console.log(userToDispatch);
          const userCollectionData: any = {
            userId: userToDispatch.id,
            displayName: userToDispatch.name,
          };
          CreateUserCollection(userCollectionData);

          const reduxUser = await GetCurrentUser(userToDispatch.id);

          dispatch(SetUser(reduxUser));
          console.log('REDUX USER :', reduxUser);
          dispatch(SetUser(reduxUser));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        {!loading ? (
          <Button
            onPress={googleSignIn}
            title="Entrar"
            type="secondary"
          ></Button>
        ) : (
          <ActivityIndicator size="large" color={COLORS.SUCCESS_900} />
        )}
      </Container>
    </>
  );
};

export default SignIn;
