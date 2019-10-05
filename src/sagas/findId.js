import { takeLatest, put, call, select } from 'redux-saga/effects';
import { auth, callAPI } from '../api';
import { ID_APP } from '../constants';

import {
    fetchFindIdRequest,
    fetchFindIdSuccess,
    fetchFindIdFailure
} from '../actions/findId';

import { getAliasFindId } from '../reducers';

export function* getFindId() {
    try {
        yield call(auth, ID_APP, 2);

        const { name: aliasName, type: aliasType } = yield select(
            getAliasFindId
        );
        const findGroup =
            aliasType === 'group'
                ? yield call(callAPI, 'groups.getById', {
                      group_ids: aliasName,
                      v: '5.100'
                  })
                : yield call(callAPI, 'users.get', {
                      user_ids: aliasName,
                      v: '5.100'
                  });
        const findId = findGroup[0].id;
        yield put(fetchFindIdSuccess(findId));
    } catch (error) {
        const { type: aliasType } = yield select(getAliasFindId);
        const nameAlias = aliasType === 'group' ? 'Сообщество' : 'Страница';
        const errorMsg = error.error_msg ? `${nameAlias} не существует` : null;
        yield put(fetchFindIdFailure(errorMsg));
    }
}

export function* findIdWatch() {
    yield takeLatest(fetchFindIdRequest, getFindId);
}
