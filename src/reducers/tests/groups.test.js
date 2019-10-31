import produce from 'immer';
import rootReducers from '../';
import {
    groupsAdd,
    groupsDel,
    groupsActiveItem,
    setGroupsRequest,
    setGroupsSuccess,
    setGroupsFailure,
    fetchGroupsRequest,
    fetchGroupsSuccess,
    fetchGroupsFailure,
    groupsDisplayCount,
    groupsDisplayPage
} from '../../actions/listGroups';
import { stateTest as INIT_STATE } from './constants';

// import { INIT_STATE, friends } from './constants.js';

describe('Тестирование редюсера groups', () => {
    it('тестирование начального состояния state', () => {
        const state0 = rootReducers(undefined, {});
        expect(state0).toEqual(INIT_STATE);
    });

    it('тест groupsAdd', () => {
        const payload = {
            idCommunity: '-123',
            nameGroup: 'name',
            typeGroup: 'group'
        };
        const state0 = rootReducers(INIT_STATE, groupsAdd(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.groups = [payload];
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест groupsDel', () => {
        const payload = {
            idCommunity: '-123',
            nameGroup: 'name',
            typeGroup: 'group'
        };
        const state0 = rootReducers(INIT_STATE, groupsAdd(payload));
        const state1 = rootReducers(state0, groupsDel('-123'));
        const stateResult = produce(state0, _draftState => {
            _draftState.groups.groups = [];
        });
        expect(state1).toEqual(stateResult);
    });

    it('тест groupsActiveItem', () => {
        const payload = '123';
        const state0 = rootReducers(INIT_STATE, groupsActiveItem(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.active = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupsRequest', () => {
        const state0 = rootReducers(INIT_STATE, setGroupsRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.isLoading = true;
            _draftState.groups.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupsSuccess', () => {
        const state0 = rootReducers(INIT_STATE, setGroupsSuccess());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.isLoading = false;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест setGroupsFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, setGroupsFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.isLoading = false;
            _draftState.groups.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupsRequest', () => {
        const state0 = rootReducers(INIT_STATE, fetchGroupsRequest());
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.groups = [];
            _draftState.groups.isLoading = true;
            _draftState.groups.error = null;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupsSuccess', () => {
        const payload = [
            {
                idCommunity: '551727482',
                nameGroup: 'Moscow City',
                typeGroup: 'page'
            },
            {
                idCommunity: '496302483',
                nameGroup: 'Тиен Ван',
                typeGroup: 'page'
            }
        ];
        const state0 = rootReducers(INIT_STATE, fetchGroupsSuccess(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.groups = payload;
            _draftState.groups.isLoading = false;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест fetchGroupsFailure', () => {
        const payload = 'error';
        const state0 = rootReducers(INIT_STATE, fetchGroupsFailure(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.isLoading = false;
            _draftState.groups.error = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест groupsDisplayCount', () => {
        const payload = 4;
        const state0 = rootReducers(INIT_STATE, groupsDisplayCount(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.count = payload;
        });
        expect(state0).toEqual(stateResult);
    });

    it('тест groupsDisplayPage', () => {
        const payload = 2;
        const state0 = rootReducers(INIT_STATE, groupsDisplayPage(payload));
        const stateResult = produce(INIT_STATE, _draftState => {
            _draftState.groups.page = payload;
        });
        expect(state0).toEqual(stateResult);
    });
});
