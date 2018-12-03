import { CHANGE_AUTH } from './types';


export * from './CommentActions';

export function changeAuth(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  }
}
