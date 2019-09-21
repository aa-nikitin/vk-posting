import { combineReducers } from 'redux';
import isLoading from './test';
import groups from './groups';

const rootReducers = combineReducers({ isLoading, groups });
export default rootReducers;
export * from './groups';
