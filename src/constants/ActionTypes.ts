export const SET_USER_ID = 'SET_USER_ID';
export const CLEAR_USER_ID = 'CLEAR_USER_ID';


interface SetUserId {
    type: typeof SET_USER_ID
    payload: {
      userId: string | null
    }
  }
  
interface ClearUserId {
  type: typeof CLEAR_USER_ID
}
  
export type AuthActionTypes = SetUserId | ClearUserId
