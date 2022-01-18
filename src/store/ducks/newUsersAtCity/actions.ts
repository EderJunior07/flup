import {Types} from './types';
import {action} from 'typesafe-actions';
import { IUser } from '../../../services/firestore/types/user';

export const SetNewUsersAtTheCity = (newUsersAtTheCity: IUser[] | {}) => {
  console.log('[REDUX] SET NEW USERS AT CITY ACTIVATED', !!newUsersAtTheCity)
  return action(Types.SET_NEW_USERS_AT_THE_CITY, {newUsersAtTheCity});
};
