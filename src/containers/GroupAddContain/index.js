import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchFriendsRequest } from '../../actions/actions1';
import { groupsAdd, setGroupsRequest } from '../../actions/listGroups';

import GroupAdd from '../../components/GroupAdd';
import { getGroups } from '../../reducers/';

class ListGroup extends PureComponent {
    state = {
        idGroup: { name: '', error: '' },
        nameGroup: { name: '', error: '' },
        typeGroup: 'group'
    };

    handleValid = (name, value) => {
        const validId = _.toInteger(value);
        const { groups } = this.props;
        const { typeGroup } = this.state;
        const checkSuit = _.filter(groups, function(item) {
            const prefix = typeGroup === 'group' ? '-' : '';

            return item.idCommunity === prefix + value;
        });

        if (value.length === 0) {
            return 'Не должно быть пустым';
        }
        switch (name) {
            case 'idGroup':
                if (validId === 0 || value.indexOf('.') > 0) {
                    return 'ID Должно быть целым числом';
                }
                if (checkSuit.length) {
                    return 'сообщество с таким id существуют';
                }
                break;
            default:
                return '';
        }
        return '';
    };
    handleChange = (name, { target: { value } }) => {
        const error = this.handleValid(name, value);

        this.setState({
            ...this.state,
            [name]: {
                ...this.state[name],
                name: value,
                error: error
            }
        });
    };

    handleTypeGroup = value => {
        const {
            idGroup: { name: idGroup }
        } = this.state;

        this.setState(
            {
                typeGroup: value
            },
            () => {
                const error = this.handleValid('idGroup', idGroup, true);
                this.setState({ idGroup: { name: idGroup, error: error } });
            }
        );
    };

    handleGroupsAdd = () => {
        const { groupsAdd, setGroupsRequest } = this.props;
        let {
            idGroup: { name: idGroup },
            nameGroup: { name: nameGroup },
            typeGroup
        } = this.state;
        const idCommunity = typeGroup === 'group' ? `-${idGroup}` : idGroup;
        const errorIdGroup = this.handleValid('idGroup', idGroup);
        const errorNameGroup = this.handleValid('nameGroup', nameGroup);

        if (!errorIdGroup && !errorNameGroup) {
            groupsAdd({ idCommunity, nameGroup, typeGroup });
            setGroupsRequest();
            idGroup = '';
            nameGroup = '';
        }

        this.setState({
            idGroup: { name: idGroup, error: errorIdGroup },
            nameGroup: { name: nameGroup, error: errorNameGroup }
        });
    };

    // componentDidMount() {
    //     const { fetchFriendsRequest } = this.props;
    //     fetchFriendsRequest();
    // }
    render() {
        const { idGroup, nameGroup, typeGroup } = this.state;
        return (
            <div>
                <GroupAdd
                    idGroup={idGroup}
                    nameGroup={nameGroup}
                    handleGroupsAdd={this.handleGroupsAdd}
                    onChange={name => this.handleChange.bind(this, name)}
                    typeGroup={typeGroup}
                    handleTypeGroup={this.handleTypeGroup}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        groups: getGroups(state)
    };
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest, groupsAdd, setGroupsRequest }
)(ListGroup);
