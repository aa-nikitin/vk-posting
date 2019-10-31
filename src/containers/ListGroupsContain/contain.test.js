import React from 'react';
import { ListGroupsContain } from './index';
import { mount } from 'enzyme';
import {
    setGroupsRequest,
    fetchGroupsRequest,
    groupsDel,
    groupsActiveItem,
    groupsDisplayCount,
    groupsDisplayPage
} from '../../actions/listGroups';
import { fetchVkGroupRequest } from '../../actions/vkGroups';
import { getGroups, getGroupActive, getGroupsAll } from '../../reducers/';
import { stateTest } from '../../reducers/tests/constants';
import { COUNT_STEP } from '../../constants';

const groupsState = getGroups(stateTest);
const activeState = getGroupActive(stateTest);
const groupsAllState = getGroupsAll(stateTest);

const wrapper = mount(
    <ListGroupsContain
        groups={groupsState}
        active={activeState}
        groupsAll={groupsAllState}
        setGroupsRequest={setGroupsRequest}
        fetchGroupsRequest={fetchGroupsRequest}
        groupsDel={groupsDel}
        groupsActiveItem={groupsActiveItem}
        groupsDisplayCount={groupsDisplayCount}
        groupsDisplayPage={groupsDisplayPage}
        fetchVkGroupRequest={fetchVkGroupRequest}
    />
);
describe('тестирование контейнера ListGroupsContain', () => {
    it('Проверка ввода в поле count', () => {
        const nameField = 'counts';
        const valueInput = COUNT_STEP;

        wrapper.find(`input[name="${nameField}"]`).simulate('change', {
            target: { name: `${nameField}`, value: valueInput }
        });
        expect(wrapper.state().counts).toEqual(valueInput);
    });
    it('Проверка ввода в поле page', () => {
        const nameField = 'pages';
        const valueInput = 2;

        wrapper.find(`input[name="${nameField}"]`).simulate('change', {
            target: { name: `${nameField}`, value: valueInput }
        });
        expect(wrapper.state().page).toEqual(valueInput);
    });
});
