import initialState from './initialState';
import { BEGIN_API_CALL } from '../actions/actionTypes';

export default function apiCallInProgressReducer(
  state = initialState.apiCallInProgress,
  action
) {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  }

  return state;
}
