import {Types} from './types';
import {action} from 'typesafe-actions';
import { IUser } from '../../../services/firestore/types/user';
import { ISpotDetailsPage } from '../../../screens/Home';

export const SetSpots = (spots: ISpotDetailsPage | {}) => {
  console.log('[REDUX] SET SPOTS ACTIVATED', !!spots)
  return action(Types.SET_SPOTS, {spots});
};
