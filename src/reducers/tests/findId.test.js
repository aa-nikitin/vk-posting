import produce from 'immer';
import rootReducers from '../';
import {
    fetchFindIdRequest,
    fetchFindIdSuccess,
    fetchFindIdFailure,
    aliasFindId,
    clearFindId,
    clearFindError
} from '../../actions/findId';
import { stateTest as INIT_STATE } from './constants';

// import { INIT_STATE, friends } from './constants.js';

describe('Тестирование редюсера FindId', () => {
    it('тестирование начального состояния state', () => {
        const state0 = rootReducers(undefined, {});
        expect(state0).toEqual(INIT_STATE);
    });

    it('тест fetchFindIdRequest', () => {
        const state0 = rootReducers(INIT_STATE, fetchFindIdRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.isLoading = true;
            _draftState.findId.id = 0;
            _draftState.findId.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchFindIdSuccess', () => {
        const payload = 123;
        const state0 = rootReducers(INIT_STATE, fetchFindIdSuccess(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.isLoading = false;
            _draftState.findId.id = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchFindIdFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, fetchFindIdFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.isLoading = false;
            _draftState.findId.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест aliasFindId', () => {
        const payload = { name: 'aaa', type: 'page' };
        const state0 = rootReducers(INIT_STATE, aliasFindId(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.alias = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест clearFindId', () => {
        const state0 = rootReducers(INIT_STATE, clearFindId());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.id = 0;
            _draftState.findId.alias.name = '';
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест clearFindError', () => {
        const state0 = rootReducers(INIT_STATE, clearFindError());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.findId.error = null;
        });
        expect(state0).toEqual(stateResult);
    });
});
