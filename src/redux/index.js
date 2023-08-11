import {combineReducers} from '@reduxjs/toolkit';
import {homeReducer} from './Home.slice';

const combinedReducer = combineReducers({
  homeReducer,
});

const rootReducers = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducers;
