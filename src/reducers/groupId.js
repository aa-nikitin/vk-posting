import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
    addGroupId,
    fetchGroupIdRequest,
    fetchGroupIdSuccess,
    fetchGroupIdError,
    setGroupIdRequest,
    setGroupIdSuccess,
    setGroupIdFailure,
    openGroupIdRequest,
    openGroupIdSuccess,
    openGroupIdFailure
} from '../actions/groupId';

const id = handleActions(
    {
        [addGroupId]: (_state, { payload }) => payload,
        [fetchGroupIdSuccess]: (state, { payload }) => payload.findId,
        [fetchGroupIdError]: () => '',
        [openGroupIdSuccess]: (_state, { payload }) => payload.id,
        [openGroupIdRequest]: () => ''
    },
    ''
);

const typeGroup = handleActions(
    {
        [fetchGroupIdRequest]: (_state, { payload }) => payload,
        [fetchGroupIdSuccess]: (state, { payload }) => payload.type,
        [openGroupIdSuccess]: (_state, { payload }) => payload.typeGroup,
        [openGroupIdRequest]: () => 'page'
    },
    'page'
);
const isLoading = handleActions(
    {
        [fetchGroupIdRequest]: () => true,
        [addGroupId]: () => true,
        [fetchGroupIdSuccess]: () => false,
        [fetchGroupIdError]: () => false,
        [setGroupIdRequest]: () => true,
        [setGroupIdSuccess]: () => false,
        [setGroupIdFailure]: () => false,
        [openGroupIdRequest]: () => true,
        [openGroupIdSuccess]: () => false,
        [openGroupIdFailure]: () => false
    },
    false
);

const error = handleActions(
    {
        [fetchGroupIdRequest]: () => null,
        [fetchGroupIdError]: (_state, { payload }) => payload,
        [setGroupIdRequest]: () => null,
        [setGroupIdFailure]: (_state, { payload }) => payload,
        [openGroupIdRequest]: () => null,
        [openGroupIdFailure]: (_state, { payload }) => payload
    },
    null
);

export const getGroupIdState = state => state.groupId;
export const getGroupId = state => state.groupId.id;
export const getGroupType = state => state.groupId.typeGroup;

export default combineReducers({ id, isLoading, error, typeGroup });
