import { createActions } from 'redux-actions';

const {
    group: {
        id: { add: addGroupId },
        fetch: {
            request: fetchGroupIdRequest,
            success: fetchGroupIdSuccess,
            error: fetchGroupIdError
        },
        set: {
            request: setGroupIdRequest,
            success: setGroupIdSuccess,
            failure: setGroupIdFailure
        },
        open: {
            request: openGroupIdRequest,
            success: openGroupIdSuccess,
            failure: openGroupIdFailure
        }
    }
} = createActions(
    {
        GROUP: {
            ID: {
                ADD: null
            },
            FETCH: {
                REQUEST: null,
                SUCCESS: null,
                ERROR: null
            },
            SET: {
                REQUEST: null,
                SUCCESS: null,
                ERROR: null
            },
            OPEN: {
                REQUEST: null,
                SUCCESS: null,
                ERROR: null
            }
        }
    },
    { namespace: '_' }
);

export {
    fetchGroupIdRequest,
    fetchGroupIdSuccess,
    fetchGroupIdError,
    addGroupId,
    setGroupIdRequest,
    setGroupIdSuccess,
    setGroupIdFailure,
    openGroupIdRequest,
    openGroupIdSuccess,
    openGroupIdFailure
};
