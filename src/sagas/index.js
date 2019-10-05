import { fork } from 'redux-saga/effects';

import { groupsWatch } from './listGroup';
import { vkPostsWatch } from './vkPosts';
import { findIdWatch } from './findId';

export function* sagas() {
    yield fork(groupsWatch);
    yield fork(vkPostsWatch);
    yield fork(findIdWatch);
}
