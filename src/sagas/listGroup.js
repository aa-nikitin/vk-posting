import { takeLatest, put, select } from 'redux-saga/effects';

import {
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure
} from '../actions/listGroups';

import { getGroups as receiveGroups } from '../reducers';

export function* setGroups() {
    try {
        const groups = yield select(receiveGroups);
        const groupsString = JSON.stringify(groups);

        yield localStorage.setItem('groups', groupsString);
        yield put(setGroupsSuccess());
    } catch (error) {
        yield put(setGroupsFailure(error.message));
    }
}

export function* getGroups() {
    try {
        const groupsString = yield localStorage.getItem('groups');
        const groups = JSON.parse(groupsString);
        if (groups) yield put(fetchGroupsSuccess(groups));
    } catch (error) {
        yield put(fetchGroupsFailure(error.message));
    }
}

export function* groupsWatch() {
    yield takeLatest(setGroupsRequest, setGroups);
    yield takeLatest(fetchGroupsRequest, getGroups);
}
