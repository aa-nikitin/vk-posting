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
import { getGroupActive } from '../reducers/groups';
import { getSendPost } from '../reducers/vkPosts';

export function* getVkPosts() {
    try {
        yield call(auth, ID_APP, 2);
        const activeId = yield select(getGroupActive);
        const posts = yield call(callAPI, 'wall.get', {
            owner_id: activeId,
            count: '10',
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
        // console.log(sendPost);
        yield call(auth, ID_APP, 2);
        yield call(callAPI, 'wall.post', {
            owner_id: '-185844786',
            // from_group: '1',
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