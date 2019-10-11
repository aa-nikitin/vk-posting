import { combineReducers } from 'redux';
import groups from './groups';
import vkPosts from './vkPosts';
import findId from './findId';
import groupId from './groupId';

const rootReducers = combineReducers({ groups, vkPosts, findId, groupId });
export default rootReducers;
export * from './groups';
export * from './vkPosts';
export * from './findId';
export * from './groupId';
