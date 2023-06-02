import {combineReducers} from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import countersReducer from './countersSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
  counters: countersReducer,
});

export default rootReducer;
