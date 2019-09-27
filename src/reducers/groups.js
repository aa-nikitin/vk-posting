import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
    groupsAdd,
    groupsDel,
    groupsActiveItem,
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure
} from '../actions/listGroups';
import produce from 'immer';

const groups = handleActions(
    {
        // [groupsAdd]: () => true,
        [groupsAdd]: (state, action) =>
            produce(state, draftState => {
                draftState.push(action.payload);
            }),
        [groupsDel]: (state, action) =>
            produce(
                state,
                draftState =>
                    (draftState = state.filter(
                        item => item.idCommunity !== action.payload
                    ))
            ),
        [fetchGroupsSuccess]: (state, action) => action.payload
    },
    []
);

const active = handleActions(
    {
        [groupsActiveItem]: (state, action) => action.payload
    },
    ''
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
        [setGroupsFailure]: () => (_state, action) => action.payload,
        [fetchGroupsRequest]: () => null,
        [fetchGroupsFailure]: () => (_state, action) => action.payload
    },
    false
);

export const getGroups = state => state.groups.groups;
export const getGroupActive = state => state.groups.active;

export default combineReducers({ groups, active, isLoading, error });
