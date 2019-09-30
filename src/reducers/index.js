import { combineReducers } from 'redux';
import isLoading from './test';
import groups from './groups';
import vkPosts from './vkPosts';

const rootReducers = combineReducers({ isLoading, groups, vkPosts });
export default rootReducers;
export * from './groups';
export * from './vkPosts';
