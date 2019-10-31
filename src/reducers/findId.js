import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
    fetchFindIdRequest,
    fetchFindIdSuccess,
    fetchFindIdFailure,
    aliasFindId,
    clearFindId,
    clearFindError
} from '../actions/findId';

const id = handleActions(
    {
        [fetchFindIdSuccess]: (state, { payload }) => payload,
        [fetchFindIdRequest]: () => 0,
        [clearFindId]: () => 0
    },
    0
);

const alias = handleActions(
    {
        [aliasFindId]: (_state, { payload: { name, type } }) => ({
            name: name,
            type: type
        }),
        [clearFindId]: _state => ({ name: '', ..._state })
    },
    { name: '', type: 'group' }
);

const isLoading = handleActions(
    {
        [fetchFindIdRequest]: () => true,
        [fetchFindIdSuccess]: () => false,
        [fetchFindIdFailure]: () => false
    },
    false
);

const error = handleActions(
    {
        [fetchFindIdRequest]: () => null,
        [fetchFindIdFailure]: (_state, { payload }) => payload,
        [clearFindError]: () => null
    },
    null
);

export const getAliasFindId = state => state.findId.alias;
export const getFindId = state => state.findId;

export default combineReducers({ id, isLoading, error, alias });
