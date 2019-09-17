import { handleActions } from 'redux-actions';
// import { combineReducers } from 'redux';
import { groupsAdd } from '../actions/listGroups';
import produce from 'immer';

const groups = handleActions(
    {
        // [groupsAdd]: () => true,
        [groupsAdd]: (state, action) => {
            const aaa = produce(state, draftState => {
                draftState.push(action.payload);
            });
            return aaa;
        }
    },
    []
);

// const rootReducers = combineReducers({ groups });

export default groups;
