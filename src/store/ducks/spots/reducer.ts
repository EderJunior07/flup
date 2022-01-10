import { ISpotDetailsPage } from '@src/screens/Home';
import { IUser } from '../../../services/firestore/types/user';
import { Types } from './types';

const INITIAL_STATE: ISpotDetailsPage = {
  description: '',
  id: '',
  location: { _latitude: 0, _longitude: 0 },
  name: '',
  spotPhotos: [''],
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Types.SET_SPOTS:
      return { ...state, ...action.payload.spots };
    default:
      return state;
  }
};

export default reducer;
