import {
  SET_USER_ID,
  CLEAR_USER_ID,
  AuthActionTypes,
} from '../constants/ActionTypes'

export const setUserId = (userId: string): AuthActionTypes => ({
  type: SET_USER_ID,
  payload: { userId },
});

export const clearUserId = (): AuthActionTypes => ({
  type: CLEAR_USER_ID,
});
