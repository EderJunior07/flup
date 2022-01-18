
import { ISpotDetailsPage } from '@src/screens/Home';
import { IUser } from '../services/firestore/types/user';

export interface AppStore {
  user: IUser;
  spots: ISpotDetailsPage;
  newUsersAtTheCity: IUser[];
}
