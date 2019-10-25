import React from 'react';
import { GroupIdContain } from './index';
import { mount } from 'enzyme';
import {
    addGroupId,
    fetchGroupIdRequest,
    openGroupIdRequest
} from '../../actions/groupId';
import { getGroupIdState } from '../../reducers/';
import { stateTest } from '../../reducers/tests/constants';

const idGroupS = getGroupIdState(stateTest);

const wrapper = mount(
    <GroupIdContain
        idGroupState={idGroupS}
        addGroupId={addGroupId}
        fetchGroupIdRequest={fetchGroupIdRequest}
        openGroupIdRequest={openGroupIdRequest}
    />
);
describe('Тест', () => {
    it('Проверка ввода в поле count', () => {
        const nameField = 'group-alias';
        const valueInput = 'factura';

        wrapper.find(`input[name="${nameField}"]`).simulate('change', {
            target: { name: `${nameField}`, value: valueInput }
        });
        expect(wrapper.state().idGroup).toEqual(valueInput);
    });
    it('Проверка handleTypeGroup', () => {
        const typeGroup = 'group';

        wrapper.instance().handleTypeGroup(typeGroup);
        expect(wrapper.state().typeGroup).toEqual(typeGroup);
    });
});
