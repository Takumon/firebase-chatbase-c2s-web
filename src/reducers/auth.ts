import {
  SET_USER_ID,
  CLEAR_USER_ID,
  AuthActionTypes,
} from '../constants/ActionTypes';

export interface AuthState {
  userId: string | null
}

const initialState: AuthState = {
  userId: null,
};

export default function auth(state: AuthState = initialState, action: AuthActionTypes): AuthState {
  switch(action.type) {
    case SET_USER_ID:
      return {
        userId: action.payload.userId,
      };
    case CLEAR_USER_ID:
      return {
        userId: null,
      };
    default:
      return state;
  }
}
