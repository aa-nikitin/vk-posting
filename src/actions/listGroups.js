import { createActions } from 'redux-actions';

const {
    groups: {
        add: groupsAdd,
        del: groupsDel,
        active: groupsActiveItem,
        set: {
            request: setGroupsRequest,
            success: setGroupsSuccess,
            failure: setGroupsFailure
        },
        fetch: {
            request: fetchGroupsRequest,
            success: fetchGroupsSuccess,
            failure: fetchGroupsFailure
        }
    }
} = createActions(
    {
        GROUPS: {
            ADD: null,
            DEL: null,
            ACTIVE: null,
            SET: {
                REQUEST: null,
                SUCCESS: null,
                FAILURE: null
            },
            FETCH: {
                REQUEST: null,
                SUCCESS: null,
                FAILURE: null
            }
        }
    },
    { namespace: '_' }
);

export {
    groupsAdd,
    groupsDel,
    groupsActiveItem,
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure
};
