import { fork } from 'redux-saga/effects';

import { groupsWatch } from './listGroup';
import { vkPostsWatch } from './vkPosts';
import { findIdWatch } from './findId';
import { groupIdWatch } from './groupId';

export function* sagas() {
    yield fork(groupsWatch);
    yield fork(vkPostsWatch);
    yield fork(findIdWatch);
    yield fork(groupIdWatch);
}
