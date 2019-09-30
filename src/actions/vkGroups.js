import { createActions } from 'redux-actions';

const {
    vk: {
        groups: {
            add: addVkPost,
            fetch: {
                request: fetchVkGroupRequest,
                success: fetchVkGroupSuccess,
                error: fetchVkGroupFailure
            },
            set: {
                request: setVkGroupRequest,
                success: setVkGroupSuccess,
                error: setVkGroupFailure
            }
        }
    }
} = createActions(
    {
        VK: {
            GROUPS: {
                ADD: null,
                FETCH: {
                    REQUEST: null,
                    SUCCESS: null,
                    ERROR: null
                },
                SET: { REQUEST: null, SUCCESS: null, ERROR: null }
            }
        }
    },
    { namespace: '_' }
);

export {
    fetchVkGroupRequest,
    fetchVkGroupSuccess,
    fetchVkGroupFailure,
    setVkGroupRequest,
    setVkGroupSuccess,
    setVkGroupFailure,
    addVkPost
};
