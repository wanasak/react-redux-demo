import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutable from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhance(applyMiddleware(reduxImmutable()))
  );
}
