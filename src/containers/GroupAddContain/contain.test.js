import React from 'react';
import { GroupAddContain } from './index';
import { mount } from 'enzyme';
import {
    fetchFindIdRequest,
    aliasFindId,
    clearFindId,
    clearFindError
} from '../../actions/findId';
import { groupsAdd, setGroupsRequest } from '../../actions/listGroups';
import { getGroups, getFindId } from '../../reducers/';

import { stateTest } from '../../reducers/tests/constants';

import { ERROR_MESSAGES } from '../../constants';
const { errorEmpty, errorType, errorSame } = ERROR_MESSAGES;

const groupsState = getGroups(stateTest);
const findIdState = getFindId(stateTest);

const wrapper = mount(
    <GroupAddContain
        groups={groupsState}
        findId={findIdState}
        fetchFindIdRequest={fetchFindIdRequest}
        aliasFindId={aliasFindId}
        clearFindId={clearFindId}
        clearFindError={clearFindError}
        groupsAdd={groupsAdd}
        setGroupsRequest={setGroupsRequest}
    />
);

describe('тестирование контейнера GroupAddContain', () => {
    it('Проверка ввода в поле псевдоним', () => {
        const valueInput = 'factura';

        wrapper.find('input[name="group-alias"]').simulate('change', {
            target: { name: 'group-alias', value: valueInput }
        });
        expect(wrapper.state().aliasGroup.name).toEqual(valueInput);
    });
    it('Проверка ввода в поле ID', () => {
        const valueInput = '25817269';

        wrapper.find('input[name="group-id"]').simulate('change', {
            target: { name: 'group-id', value: valueInput }
        });
        expect(wrapper.state().idGroup.name).toEqual(valueInput);
    });
    it('Проверка ввода в поле наименование', () => {
        const valueInput = 'Factura — арт блог';

        wrapper.find('input[name="group-name"]').simulate('change', {
            target: { name: 'group-name', value: valueInput }
        });

        // console.log(wrapper.state());

        expect(wrapper.state().nameGroup.name).toEqual(valueInput);
    });
    it('Проверка вывода ошибок на пустоту в поле "наименование"', () => {
        const valueInput = '';

        wrapper.find('input[name="group-name"]').simulate('change', {
            target: { name: 'group-name', value: valueInput }
        });
        expect(wrapper.state().nameGroup.error).toEqual(errorEmpty);
    });
    it('Проверка вывода ошибок на пустоту в поле ID', () => {
        const valueInput = '';

        wrapper.find('input[name="group-id"]').simulate('change', {
            target: { name: 'group-id', value: valueInput }
        });
        expect(wrapper.state().idGroup.error).toEqual(errorEmpty);
    });
    it('Проверка вывода ошибок в поле ID на соответствие типу', () => {
        const valueInput = 'asd';

        wrapper.find('input[name="group-id"]').simulate('change', {
            target: { name: 'group-id', value: valueInput }
        });
        expect(wrapper.state().idGroup.error).toEqual(errorType);
    });
    it('Проверка на ввод дублей в поле ID', () => {
        const wrapper = mount(
            <GroupAddContain
                groups={[
                    {
                        idCommunity: '-123',
                        nameGroup: 'qwe',
                        typeGroup: 'group'
                    }
                ]}
                findId={findIdState}
                fetchFindIdRequest={fetchFindIdRequest}
                aliasFindId={aliasFindId}
                clearFindId={clearFindId}
                clearFindError={clearFindError}
                groupsAdd={groupsAdd}
                setGroupsRequest={setGroupsRequest}
            />
        );
        const valueInput = '123';

        wrapper.find('input[name="group-id"]').simulate('change', {
            target: { name: 'group-id', value: valueInput }
        });
        expect(wrapper.state().idGroup.error).toEqual(errorSame);
    });
    it('Проверка handleTypeGroup', () => {
        const typeGroup = 'page';

        wrapper.instance().handleTypeGroup(typeGroup);
        expect(wrapper.state().typeGroup).toEqual(typeGroup);
    });
});
