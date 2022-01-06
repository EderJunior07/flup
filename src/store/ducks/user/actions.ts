import {Types} from './types';
import {action} from 'typesafe-actions';
import { IUser } from '../../../services/firestore/types/user';

export const SetUser = (user: any | {}) => {
  console.log('[REDUX] SET USER ACTIVATED', !!user)
  return action(Types.SET_USER, {user});
};
