import { createActions } from 'redux-actions';

const {
    find: {
        id: {
            fetch: {
                request: fetchFindIdRequest,
                success: fetchFindIdSuccess,
                error: fetchFindIdFailure
            },
            alias: aliasFindId,
            clear: clearFindId,
            clearerror: clearFindError
        }
    }
} = createActions(
    {
        FIND: {
            ID: {
                FETCH: {
                    REQUEST: null,
                    SUCCESS: null,
                    ERROR: null
                },
                ALIAS: null,
                CLEAR: null,
                CLEARERROR: null
            }
        }
    },
    { namespace: '_' }
);

export {
    fetchFindIdRequest,
    fetchFindIdSuccess,
    fetchFindIdFailure,
    aliasFindId,
    clearFindId,
    clearFindError
};
