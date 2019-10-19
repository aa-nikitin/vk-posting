import { takeLatest, put, call, select } from 'redux-saga/effects';

import {
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure
} from '../actions/listGroups';
import { auth, callAPI } from '../api';
import { ID_APP, GROUP_STORAGE_KEY } from '../constants';

import { getGroups as receiveGroups } from '../reducers';

export function* setGroups() {
    try {
        const groups = yield select(receiveGroups);
        const groupsString = JSON.stringify(groups);
        yield call(auth, ID_APP, 2);
        yield call(callAPI, 'storage.set', {
            key: GROUP_STORAGE_KEY,
            value: groupsString,
            v: '5.100'
        });

        // yield localStorage.setItem(GROUP_STORAGE_KEY, groupsString);
        yield put(setGroupsSuccess());
    } catch (error) {
        yield put(setGroupsFailure(error.message));
    }
}

export function* getGroups() {
    try {
        // const groupsString = yield localStorage.getItem(GROUP_STORAGE_KEY);
        yield call(auth, ID_APP, 2);
        const groupsString = yield call(callAPI, 'storage.get', {
            key: GROUP_STORAGE_KEY,
            v: '5.100'
        });
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
