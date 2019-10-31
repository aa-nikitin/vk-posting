import produce from 'immer';
import rootReducers from '../';
import {
    fetchVkGroupRequest,
    fetchVkGroupSuccess,
    fetchVkGroupFailure,
    addVkPost
} from '../../actions/vkGroups';
import { stateTest as INIT_STATE } from './constants';

// import { INIT_STATE, friends } from './constants.js';

describe('Тестирование редюсера groups', () => {
    it('тестирование начального состояния state', () => {
        const state0 = rootReducers(undefined, {});
        expect(state0).toEqual(INIT_STATE);
    });

    it('тест fetchVkGroupRequest', () => {
        const state0 = rootReducers(INIT_STATE, fetchVkGroupRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.vkPosts.vkPosts = [];
            _draftState.vkPosts.sendPost = {};
            _draftState.vkPosts.isLoading = true;
            _draftState.vkPosts.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchVkGroupSuccess', () => {
        const payload = [
            {
                id: 81,
                from_id: 551727482,
                owner_id: 551727482,
                date: 1562872749,
                post_type: 'post',
                text: 'text',
                is_pinned: 1
            }
        ];
        const state0 = rootReducers(INIT_STATE, fetchVkGroupSuccess(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.vkPosts.vkPosts = payload;
            _draftState.vkPosts.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchVkGroupFailure null', () => {
        const state0 = rootReducers(INIT_STATE, fetchVkGroupFailure());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.vkPosts.isLoading = false;
            _draftState.vkPosts.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchVkGroupFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, fetchVkGroupFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.vkPosts.isLoading = false;
            _draftState.vkPosts.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест addVkPost', () => {
        const payload = { text: 'text', attachments: 'text' };
        const state0 = rootReducers(INIT_STATE, addVkPost(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.vkPosts.sendPost = payload;
        });
        expect(state0).toEqual(stateResult);
    });
});
