import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { fetchFriendsRequest } from '../actions/actions1';

const isLoading = handleActions(
    {
        [fetchFriendsRequest]: () => true
    },
    false
);

const rootReducers = combineReducers({ isLoading });

export default rootReducers;
