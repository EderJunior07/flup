import { combineReducers } from 'redux';
import user from './user/reducer';
import spots from './spots/reducer';
import newUsersAtTheCity from './newUsersAtCity/reducer';

const reducers = combineReducers({
  user,
  spots,
  newUsersAtTheCity,
});

export default reducers;
