import { IStatus, IUser } from './types/user';
import firestore from '@react-native-firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyDqbiQOK8RPLmYfWogfPfiDhGZTIk-4q1c',
  authDomain: 'flup-d4990.firebaseapp.com',
  projectId: 'flup-d4990',
  storageBucket: 'flup-d4990.appspot.com',
  messagingSenderId: '907126516221',
  appId: '1:907126516221:web:7ccbc8a1895bbfeb33d194',
  measurementId: 'G-7K21S5V2EY',
});

export interface ICreateUser {
  userId: string;
  displayName: string;
}

export const CreateUserCollection = async (user: ICreateUser) => {
  try {
    const { userId, ...rest } = user;
    const response = await firestore().collection('USER').doc(userId).get();

    if (response.data()) {
      return;
    }
    console.log('\x1b[36mCREATED User Collection', user);

    const newUser: IUser = {
      ...user,
      name: user?.displayName,
      description: '',
      phoneNumber: null,
      id: user?.userId,
      photoUrl: '',
      formatted_city: '',
      status: IStatus.ACTIVE,
    };
    await firestore().collection('USER').doc(user.userId).set(newUser);
  } catch (error) {
    console.log('\x1b[31mCREATE USER ERROR:', error);
  }
};

export const UpdateUser = async (user: IUser, userId: string) => {
  console.log('\x1b[36mUPDATE USER', user);
  await firestore()
    .collection('USER')
    .doc(userId)
    .update({ ...user });
};

export const GetCurrentUser = async (userId: string) => {
  console.log('\x1b[36mGET THE USER >>> ', userId);

  const response = await firestore().collection('USER').doc(userId).get();
  return response.data();
};
