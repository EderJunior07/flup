import { ISpotDetailsPage } from '@src/screens/Home';
import { IUser } from '../../../services/firestore/types/user';
import { Types } from './types';

const INITIAL_STATE: IUser[] = [];

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.SET_NEW_USERS_AT_THE_CITY:
      return { ...state, ...action.payload.newUsersAtTheCity };
    default:
      return state;
  }
};

export default reducer;
