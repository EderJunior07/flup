import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetCurrentUser } from '../services/firestore/userMethods';
import { SetUser } from '../store/ducks/user/actions';
import { useDispatch } from 'react-redux';

export type User = {
  id: string;
  name: string;
  description: string;
};

export type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<User>();
  const [isLogging, setIsLogging] = useState(false);

  const dispatch = useDispatch();

  async function signIn(email: string, password: string) {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe o e-mail e a senha.');
    }

    setIsLogging(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then((account) => {
        firestore()
          .collection('USER')
          .doc(account.user.uid)
          .get()
          .then(async (profile: any) => {
            const { name, description } = profile.data() as User;

            if (profile.exists) {
              const userData = {
                id: account.user.uid,
                name,
                description,
              };
              console.log('Usuário logado: ', userData);
              await AsyncStorage.setItem(
                USER_COLLECTION,
                JSON.stringify(userData)
              );
              setUser(userData);
              const reduxUser = await GetCurrentUser(userData.id);
              console.log('REDUX USER :', reduxUser);
              dispatch(SetUser(reduxUser));
            }
          })
          .catch(() => {
            return Alert.alert(
              'Login',
              'Não foi possível buscar os dados do usuário.'
            );
          });
      })
      .catch((error) => {
        const { code } = error;

        if (code === 'auth/user-not-found' || 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail e/ou senha inválida.');
        } else {
          return Alert.alert('Login', 'Não foi possível realizar o login.');
        }
      })
      .finally(() => setIsLogging(false));
  }

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
      value={{ signIn, signOut, forgotPassword, isLogging, user }}
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
