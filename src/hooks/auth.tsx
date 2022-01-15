import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetCurrentUser } from '../services/firestore/userMethods';
import { SetUser } from '../store/ducks/user/actions';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { StackActions, useNavigation } from '@react-navigation/native';

export type User = {
  id: string;
  email: string;
  name: string | null;
  photoUrl: string | null;
  phoneNumber: null;
};

export type AuthContextData = {
  googleSignIn: () => void;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLogging: boolean;
  user: User | undefined;
};

type AuthProvideProps = {
  children: ReactNode;
};

const USER_COLLECTION = '@flup:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProvideProps) {
  // const navigation = useNavigation();
  const [user, setUser] = useState<User>();
  const [isLogging, setIsLogging] = useState(false);

  const dispatch = useDispatch();

  const googleSignIn = useCallback(() => {
   
  }, []);


  async function loadUserStorageData() {
    setIsLogging(true);

    const storagedUser = await AsyncStorage.getItem(USER_COLLECTION);

    if (storagedUser) {
      const userData = JSON.parse(storagedUser) as User;
      console.log('Loaded User from StorageData', userData);
      setUser(userData);
    }

    setIsLogging(false);
  }

  async function signOut() {
    await auth().signOut();
    dispatch(SetUser(''));

    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(undefined);
  }

  async function forgotPassword(email: string) {
    if (!email) {
      return Alert.alert('Redefinir senha', 'Informe o e-mail.');
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        Alert.alert(
          'Redefinir senha',
          'Enviamos um link no seu e-mail para redefinir sua senha. '
        )
      )
      .catch(() =>
        Alert.alert('Não foi possível enviar o email para redefinir a senha.')
      );
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, signOut, forgotPassword, isLogging, user }}
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
