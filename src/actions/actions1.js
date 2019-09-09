import { createActions } from 'redux-actions';

const {
    friends: { request: fetchFriendsRequest }
} = createActions(
    {
        FRIENDS: {
            REQUEST: null
        }
    },
    { namespace: '_' }
);

export { fetchFriendsRequest };
