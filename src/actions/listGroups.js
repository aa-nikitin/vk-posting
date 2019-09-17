import { createActions } from 'redux-actions';

const {
    groups: { add: groupsAdd }
} = createActions(
    {
        GROUPS: {
            ADD: null
        }
    },
    { namespace: '_' }
);

export { groupsAdd };
