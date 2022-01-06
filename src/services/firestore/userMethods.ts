import { IUser } from './types/user';
import firestore from '@react-native-firebase/firestore'

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
      socialMedia: [],
      avatarURL: '',
      bannerURL: '',
      displayName: user.displayName,
      profileRole: '',
      peopleDescription: '',
      status: 1,
    };
    await firestore().collection('USER').doc(user.userId).set(newUser);
  } catch (error) {
    console.log('\x1b[31mCREATE USER ERROR:', error);
  }
};

export const UpdateUser = async (user: IUser, userId: string) => {
  console.log('\x1b[36mUPDATE USER', user);

  // const { userId...rest } = user;

  // console.log('\x1b[36mUPDATED THE USER-ID >>> ', userId);

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

export const ExistUser = async (userId: string) => {
  const response = await firestore().collection('USER').doc(userId).get();
  return response.data();
};

const getHigherResProviderPhotoUrl = ({ photoURL, providerId }: any) => {
  //workaround to get higer res profile picture
  let result = photoURL;
  if (providerId.includes('google')) {
    result = photoURL.replace('s96-c', 's400-c');
  } else if (providerId.includes('facebook')) {
    result = `${photoURL}?type=large`;
  }
  return result;
};
