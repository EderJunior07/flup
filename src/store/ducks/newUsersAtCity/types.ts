import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  SET_NEW_USERS_AT_THE_CITY: '@newUsersAtCity/SET_NEW_USERS_AT_THE_CITY',
};
