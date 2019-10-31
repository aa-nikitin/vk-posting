import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import produce from 'immer';
import {
    groupsAdd,
    groupsDel,
    groupsActiveItem,
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure,
    groupsDisplayCount,
    groupsDisplayPage
} from '../actions/listGroups';

const count = handleActions(
    {
        [groupsDisplayCount]: (_state, { payload }) => payload
    },
    8
);

const page = handleActions(
    {
        [groupsDisplayPage]: (_state, { payload }) => payload
    },
    1
);

const active = handleActions(
    {
        [groupsActiveItem]: (_state, { payload }) => payload,
        [fetchGroupsRequest]: () => ''
    },
    ''
);

const groups = handleActions(
    {
        [groupsAdd]: (state, { payload }) =>
            produce(state, draftState => {
                draftState.push(payload);
            }),
        [groupsDel]: (state, { payload }) =>
            produce(
                state,
                _draftState =>
                    (_draftState = state.filter(
                        item => item.idCommunity !== payload
                    ))
            ),
        [fetchGroupsSuccess]: (_state, { payload }) => payload,
        [fetchGroupsRequest]: () => []
    },
    []
);

const isLoading = handleActions(
    {
        [setGroupsRequest]: () => true,
        [setGroupsSuccess]: () => false,
        [setGroupsFailure]: () => false,
        [fetchGroupsRequest]: () => true,
        [fetchGroupsSuccess]: () => false,
        [fetchGroupsFailure]: () => false
    },
    false
);

const error = handleActions(
    {
        [setGroupsRequest]: () => null,
        [setGroupsFailure]: (_state, { payload }) => payload,
        [fetchGroupsRequest]: () => null,
        [fetchGroupsFailure]: (_state, { payload }) => payload
    },
    null
);

export const getGroupsAll = state => state.groups;
export const getGroups = state => state.groups.groups;
export const getGroupActive = state => state.groups.active;
export const getGroupCount = state => state.groups.count;
export const getGroupPage = state => state.groups.page;

export default combineReducers({
    groups,
    active,
    count,
    page,
    isLoading,
    error
});
