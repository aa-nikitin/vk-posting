import { handleActions } from 'redux-actions';
// import { combineReducers } from 'redux';
import { groupsAdd } from '../actions/listGroups';
import produce from 'immer';

const groups = handleActions(
    {
        // [groupsAdd]: () => true,
        [groupsAdd]: (state, action) =>
            produce(state, draftState => {
                draftState.push(action.payload);
            })
    },
    []
);

// const rootReducers = combineReducers({ groups });

export const getGroups = state => state.groups;

export default groups;
