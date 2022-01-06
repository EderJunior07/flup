import { IUser } from '../../../services/firestore/types/user';
import {Types} from './types';

const INITIAL_STATE: IUser = {
  userId: '',
  displayName: '',
  socialMedia: [],
  status: 2,
  avatarURL: '',
  profileRole: '',
  bannerURL: '',
  peopleDescription: '',
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.SET_USER:
      return {...state, ...action.payload.user};
    default:
      return state;
  }
};

export default reducer;
