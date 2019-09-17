import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { fetchFriendsRequest } from '../actions/actions1';

const isLoading = handleActions(
    {
        [fetchFriendsRequest]: () => true
    },
    false
);

const rootReducers = combineReducers({ isLoading });

export default rootReducers;
