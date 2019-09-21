import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchFriendsRequest } from '../../actions/actions1';
import { groupsAdd } from '../../actions/listGroups';

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
        // console.log(groups);
        // console.log(groups.indexOf(value));
        // console.log(name, value);
        const aaa = _.filter(groups, function(item) {
            const prefix = typeGroup === 'group' ? '-' : '';
            console.log(prefix + value);
            return item.idCommunity === prefix + value;
        });
        // console.log(aaa);
        if (value.length === 0) {
            return 'Не должно быть пустым';
        }
        switch (name) {
            case 'idGroup':
                if (validId === 0 || value.indexOf('.') > 0) {
                    return 'Должно быть целым числом';
                }
                if (aaa.length) {
                    return 'сообщество или страница с таким id существуют';
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
                const error = this.handleValid('idGroup', idGroup);
                this.setState({ idGroup: { name: idGroup, error: error } });
                // console.log(error);
            }
        );
    };

    handleGroupsAdd = () => {
        const { groupsAdd } = this.props;
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
    //     fetchFriendsRequest('sd');
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
    { fetchFriendsRequest, groupsAdd }
)(ListGroup);
