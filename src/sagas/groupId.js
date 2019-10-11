import { takeLatest, put, call, select } from 'redux-saga/effects';
import { auth, callAPI } from '../api';
import { ID_APP } from '../constants';

import {
    fetchGroupIdRequest,
    fetchGroupIdSuccess,
    fetchGroupIdError,
    setGroupIdRequest,
    setGroupIdSuccess,
    setGroupIdFailure,
    openGroupIdRequest,
    openGroupIdSuccess,
    openGroupIdFailure
} from '../actions/groupId';

import { getGroupId, getGroupType, getGroupIdState } from '../reducers';

export function* hendleGroupId() {
    try {
        const {
            session: { mid }
        } = yield call(auth, ID_APP, 2);
        const idGroup = yield select(getGroupId);
        const id = idGroup ? idGroup : mid;
        const typeGroup = yield select(getGroupType);
        const type = idGroup ? typeGroup : 'page';
        const findGroup =
            type === 'group'
                ? yield call(callAPI, 'groups.getById', {
                      group_ids: id,
                      v: '5.100'
                  })
                : yield call(callAPI, 'users.get', {
                      user_ids: id,
                      v: '5.100'
                  });
        const findId = String(findGroup[0].id);

        yield put(fetchGroupIdSuccess({ findId, type }));
        yield put(setGroupIdRequest());
    } catch ({ error_msg }) {
        const typeGroup = yield select(getGroupType);
        const nameAlias = typeGroup === 'group' ? 'Сообщества' : 'Страницы';
        const errorMsg = error_msg
            ? `${nameAlias} с таким id не существует`
            : null;
        yield put(fetchGroupIdError(errorMsg));
    }
}

export function* setGroupId() {
    try {
        const groupIdState = yield select(getGroupIdState);
        const groupIdStateString = JSON.stringify(groupIdState);

        yield localStorage.setItem('idGroup', groupIdStateString);
        yield put(setGroupIdSuccess());
    } catch (error) {
        yield put(setGroupIdFailure(error.message));
    }
}

export function* openGroupId() {
    try {
        const groupIdStateString = yield localStorage.getItem('idGroup');
        const groupIdState = JSON.parse(groupIdStateString);

        if (groupIdState) yield put(openGroupIdSuccess(groupIdState));
    } catch (error) {
        yield put(openGroupIdFailure(error.message));
    }
}

export function* groupIdWatch() {
    yield takeLatest(fetchGroupIdRequest, hendleGroupId);
    yield takeLatest(setGroupIdRequest, setGroupId);
    yield takeLatest(openGroupIdRequest, openGroupId);
}
