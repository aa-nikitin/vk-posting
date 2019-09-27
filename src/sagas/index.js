import { takeLatest, call, fork } from 'redux-saga/effects';

import { auth, callAPI } from '../api';
import { ID_APP } from '../constants';
import { fetchFriendsRequest } from '../actions/actions1';

import { groupsWatch } from './listGroub.js';

export function* fetchSearch() {
    try {
        yield call(auth, ID_APP, 2);
        yield call(callAPI, 'wall.post', {
            owner_id: '-185844786',
            // from_group: '1',
            attachments: 'photo-23194645_457241203',
            message: `Отправка производится в день оплаты или на следующий день (кроме воскресенья)✅
            Отправка производится в день оплаты или на следующий день (кроме воскресенья)✅`,
            v: '5.100'
        });
        // console.log(friends);
    } catch (error) {}
}

export function* searchRequestWatch() {
    yield takeLatest(fetchFriendsRequest, fetchSearch);
}

export function* sagas() {
    yield fork(searchRequestWatch);
    yield fork(groupsWatch);
}
