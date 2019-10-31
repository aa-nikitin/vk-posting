import produce from 'immer';
import rootReducers from '../';
import {
    addGroupId,
    fetchGroupIdRequest,
    fetchGroupIdSuccess,
    fetchGroupIdError,
    setGroupIdRequest,
    setGroupIdSuccess,
    setGroupIdFailure,
    openGroupIdRequest,
    openGroupIdSuccess,
    openGroupIdFailure
} from '../../actions/groupId';
import { stateTest as INIT_STATE } from './constants';

// import { INIT_STATE, friends } from './constants.js';

describe('Тестирование редюсера groupId', () => {
    it('тестирование начального состояния state', () => {
        const state0 = rootReducers(undefined, {});
        expect(state0).toEqual(INIT_STATE);
    });

    it('тест addGroupId', () => {
        const payload = 123;
        const state0 = rootReducers(INIT_STATE, addGroupId(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = true;
            _draftState.groupId.id = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupIdRequest', () => {
        const payload = 123;
        const state0 = rootReducers(INIT_STATE, fetchGroupIdRequest(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = true;
            _draftState.groupId.typeGroup = payload;
            _draftState.groupId.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupIdSuccess', () => {
        const payload = { findId: 123, type: 'page' };
        const state0 = rootReducers(INIT_STATE, fetchGroupIdSuccess(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.id = payload.findId;
            _draftState.groupId.typeGroup = payload.type;
            _draftState.groupId.isLoading = false;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupIdError', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, fetchGroupIdError(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.id = '';
            _draftState.groupId.isLoading = false;
            _draftState.groupId.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupIdRequest', () => {
        const state0 = rootReducers(INIT_STATE, setGroupIdRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = true;
            _draftState.groupId.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupIdSuccess', () => {
        const state0 = rootReducers(INIT_STATE, setGroupIdSuccess());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = false;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupIdFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, setGroupIdFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = false;
            _draftState.groupId.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест openGroupIdRequest', () => {
        const state0 = rootReducers(INIT_STATE, openGroupIdRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.id = '';
            _draftState.groupId.typeGroup = 'page';
            _draftState.groupId.isLoading = true;
            _draftState.groupId.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест openGroupIdSuccess', () => {
        const payload = { id: 123, typeGroup: 'page' };
        const state0 = rootReducers(INIT_STATE, openGroupIdSuccess(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.id = payload.id;
            _draftState.groupId.typeGroup = payload.typeGroup;
            _draftState.groupId.isLoading = false;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест openGroupIdFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, openGroupIdFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groupId.isLoading = false;
            _draftState.groupId.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });
});
