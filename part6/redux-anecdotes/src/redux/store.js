import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from '../reducers/notificationReducer';
import anecdoteReducer from '../reducers/anecdoteReducer';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});


const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;