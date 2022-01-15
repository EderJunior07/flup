import Button from '../../components/Button';
import React, { useCallback, useEffect } from 'react';
import { Alert, Text, View } from 'react-native';

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
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const USER_COLLECTION = '@flup:users';

const SignIn = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();


  const googleSignIn = async () => {
    GoogleSignin.signIn()
      .then(async ({ idToken, user }) => {
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
          dispatch(SetUser(userToDispatch));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <Button onPress={googleSignIn} title="Entrar" type="secondary"></Button>
        {/* <GooglePlacesAutocomplete
          placeholder="Para onde?"
          query={{
            key: 'AIzaSyD8oNI5P5nkaW_go0J4IXq_MUE6hIInKuM',
            language: 'pt-br',
          }}
          enablePoweredByContainer
          fetchDetails
        /> */}
        <Text>{JSON.stringify(user)}</Text>
      </Container>
    </>
  );
};

export default SignIn;
