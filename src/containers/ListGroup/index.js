import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchFriendsRequest } from '../../actions/actions1';
import { groupsAdd } from '../../actions/listGroups';

import MaterialInput from '../../components/MaterialInput';

class ListGroup extends PureComponent {
    state = {
        idGroup: { name: '', error: '' },
        nameGroup: { name: '', error: '' },
        typeGroup: 'group'
    };

    handleValid = (name, value) => {
        const validId = _.toInteger(value);
        if (value.length === 0) {
            return 'Не должно быть пустым';
        }
        switch (name) {
            case 'idGroup':
                if (validId === 0 || value.indexOf('.') > 0) {
                    return 'Должно быть целым числом';
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
        this.setState({ typeGroup: value });
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
            groupsAdd({ idCommunity, nameGroup });
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
                <MaterialInput
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
    return state;
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest, groupsAdd }
)(ListGroup);
