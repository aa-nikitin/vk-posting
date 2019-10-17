import { takeLatest, call, put, select } from 'redux-saga/effects';
import { auth, callAPI } from '../api';
import { ID_APP } from '../constants';
import {
    fetchVkGroupRequest,
    fetchVkGroupSuccess,
    fetchVkGroupFailure,
    setVkGroupRequest,
    setVkGroupSuccess,
    setVkGroupFailure
} from '../actions/vkGroups';
import {
    getGroupActive,
    getGroupCount,
    getGroupPage,
    getSendPost,
    getGroupIdState
} from '../reducers';

export function* getVkPosts() {
    try {
        yield call(auth, ID_APP, 2);
        const activeId = yield select(getGroupActive);
        const countPosts = yield select(getGroupCount);
        const pagePosts = yield select(getGroupPage);
        const pageOffset = countPosts * pagePosts - countPosts;
        const posts = yield call(callAPI, 'wall.get', {
            owner_id: activeId,
            count: countPosts,
            offset: pageOffset,
            v: '5.100'
        });
        yield put(fetchVkGroupSuccess(posts.items));
    } catch (error) {
        yield put(fetchVkGroupFailure(error.message));
    }
}

export function* sendVkPost() {
    try {
        const { attachments, text } = yield select(getSendPost);
        const { id, typeGroup } = yield select(getGroupIdState);
        const {
            session: { mid }
        } = yield call(auth, ID_APP, 2);
        const typeGroupPost = typeGroup === 'group' ? '-' : '';
        const idGroupPost = id ? id : mid;

        yield call(callAPI, 'wall.post', {
            owner_id: `${typeGroupPost}${idGroupPost}`,
            attachments: attachments,
            message: text,
            v: '5.100'
        });
        yield put(setVkGroupSuccess());
    } catch (error) {
        yield put(setVkGroupFailure(error.message));
    }
}

export function* vkPostsWatch() {
    yield takeLatest(fetchVkGroupRequest, getVkPosts);
    yield takeLatest(setVkGroupRequest, sendVkPost);
}
