import {ActionType} from 'typesafe-actions';
import * as actions from './actions';

export type ModalAction = ActionType<typeof actions>;

export const Types = {
  SET_SPOTS: '@spots/SET_SPOTS',
};
