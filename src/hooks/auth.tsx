import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import {
  CreateUserCollection,
  GetCurrentUser,
} from '../services/firestore/userMethods';
import { useDispatch } from 'react-redux';
import { SetUser } from '../store/ducks/user/actions';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

interface AuthProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUser;
  signInWithGoogle(): Promise<void>;
  // signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();

  const [user, setUser] = useState<IUser>({} as IUser);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@wigoo:user';

  const googleSignIn = async () => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId:
        ' 778336797649-9b5na6h2gakf1qsgab36bjkvbgh8ru3b.apps.googleusercontent.com',
      androidClientId:
        '778336797649-9b5na6h2gakf1qsgab36bjkvbgh8ru3b.apps.googleusercontent.com',
      webClientId:
        '778336797649-n2n6johh54ha07vf5boigpnu6ke1c7d7.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    try {
      console.log('cu');

      if (response?.type === 'success') {
        const { authentication } = response;

        Alert.alert('Deu certo!');
      }

      //                                                            SOLUÇÃO APROVADA COM MODALZINHA LISA
      //   await askForPlayServicesAsync();
      //   const { type, user } = await signInAsync();

      //   if (type === "success") {
      //     const credential = firebase.auth.GoogleAuthProvider.credential(
      //         user?.auth?.idToken,
      //       );

      //     const response = await firebase
      //       .auth()
      //       .signInWithCredential(credential);

      //   }

      //OPTION 1 OF GOOGLE LOGIN
      // const { type, accessToken, user } = await Google.logInAsync({
      //     redirectUrl: 'https://auth.expo.io/@ederrosa/band',
      //     scopes: ['profile', 'email'],
      //     clientId: '83997214436-t9o1bua5r7sd320mthb9rr8oi5iis8gn.apps.googleusercontent.com'
      //   });
      //   if (type === 'success') {
      //     /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      //     console.log(user);
      //   }j

      //   const CLIENT_ID = '778336797649-n2n6johh54ha07vf5boigpnu6ke1c7d7.apps.googleusercontent.com'
      //   const REDIRECT_URI = 'https://auth.expo.io/@anonymous/flup'
      //   const RESPONSE_TYPE = 'token';
      //   const SCOPE = encodeURI('profile email');

      //   const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      //   const response= await AuthSession.startAsync( {authUrl} ) as AuthorizationResponse

      //     const {params, type} = response;
      //     if(type === 'success'){
      //         const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
      //         const userInfo = await response.json();

      //         const userLogged = {
      //             id: userInfo.id,
      //             email: userInfo.email,
      //             name: userInfo.given_name,
      //             photo: userInfo.picture,
      //         }
      //         console.log('USER LOGGED::: ', userLogged)

      //         const userCollectionData:any = {
      //             userId: userInfo.id,
      //             displayName: userInfo.given_name,
      //         }
      //         CreateUserCollection(userCollectionData);

      //         setUser(userLogged);
      //         const reduxUser = await GetCurrentUser(userLogged.id);

      //         console.log('REDUX USER :', reduxUser)

      //         dispatch(SetUser(reduxUser));
      //         await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

      //     }
    } catch (message) {
      console.log('googleSignIn err', message);
    }
  };

  async function signInWithGoogle() {
    try {
      // const CLIENT_ID = '83997214436-t9o1bua5r7sd320mthb9rr8oi5iis8gn.apps.googleusercontent.com';
      // const REDIRECT_URI = 'https://auth.expo.io/@ederrosa/band';
      // const RESPONSE_TYPE = 'token';
      // const SCOPE = encodeURI('profile email');

      // const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&
      // response_type${RESPONSE_TYPE}&scope=${SCOPE}`;

      // const response = await AuthSession.startAsync({authUrl});

      // console.log(response);

      await googleSignIn();
      // Alert.alert('Deu certo! ');
    } catch (error) {
      throw Alert.alert('Deu certo!');
    }
  }

  // async function signOut() {
  //     setUser({} as IUser);
  //     dispatch(SetUser({}))
  //     dispatch(SetProfile({ownerId: '',
  //     name,
  //     status:
  //     // avatarURL: '',
  //     }))
  //     await AsyncStorage.removeItem(userStorageKey);
  // }

  // useEffect(() =>{
  //     async function loadUserStorageDate() {
  //         const userStoraged = await AsyncStorage.getItem(userStorageKey);

  //         if(userStoraged){
  //             const userLogged = JSON.parse(userStoraged) as IUser;
  //             setUser(userLogged);
  //         }
  //         setUserStorageLoading(false)

  //     }

  //     loadUserStorageDate();
  // },[])

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        // signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
