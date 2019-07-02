import initialState from './initialState';
import { BEGIN_API_CALL, API_CALL_ERROR } from '../actions/actionTypes';

function actionTypeEndInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function apiCallInProgressReducer(
  state = initialState.apiCallInProgress,
  action
) {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === API_CALL_ERROR ||
    actionTypeEndInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
