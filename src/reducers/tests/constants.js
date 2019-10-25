export const stateTest = {
    groups: {
        groups: [],
        active: '',
        count: 8,
        page: 1,
        isLoading: false,
        error: null
    },
    vkPosts: {
        vkPosts: [],
        isLoading: false,
        error: null,
        sendPost: {}
    },
    findId: {
        id: 0,
        isLoading: false,
        error: null,
        alias: { name: '', type: 'group' }
    },
    groupId: {
        id: '',
        isLoading: true,
        error: null,
        typeGroup: 'page'
    }
};
