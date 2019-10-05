import { combineReducers } from 'redux';
import groups from './groups';
import vkPosts from './vkPosts';
import findId from './findId';

const rootReducers = combineReducers({ groups, vkPosts, findId });
export default rootReducers;
export * from './groups';
export * from './vkPosts';
export * from './findId';
