import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { groupsAdd, setGroupsRequest } from '../../actions/listGroups';
import {
    fetchFindIdRequest,
    aliasFindId,
    clearFindId,
    clearFindError
} from '../../actions/findId';
import GroupAdd from '../../components/GroupAdd';
import { getGroups, getFindId } from '../../reducers/';
import { ERROR_MESSAGES } from '../../constants';

const { errorEmpty, errorType, errorSame } = ERROR_MESSAGES;

class GroupAddContain extends PureComponent {
    state = {
        aliasGroup: { name: '', error: '' },
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
            return errorEmpty;
        }
        switch (name) {
            case 'idGroup':
                if (validId === 0 || value.indexOf('.') > 0) {
                    return errorType;
                }
                if (checkSuit.length) {
                    return errorSame;
                }
                break;
            default:
                return '';
        }
        return '';
    };
    handleChange = ({ name, check }, { target: { value } }) => {
        const error = check ? this.handleValid(name, value) : '';

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

    handleFindId = () => {
        const { fetchFindIdRequest, aliasFindId } = this.props;
        const {
            typeGroup,
            aliasGroup: { name: aliasName }
        } = this.state;
        if (aliasName) {
            aliasFindId({ name: aliasName, type: typeGroup });
            fetchFindIdRequest();
        }
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

    componentDidUpdate() {
        const {
            clearFindId,
            clearFindError,
            findId: { id: findedId, error: findedError }
        } = this.props;
        const {
            aliasGroup: { name: aliasName }
        } = this.state;
        if (findedId) {
            this.setState({
                idGroup: { name: String(findedId), error: '' },
                aliasGroup: { name: '', error: '' }
            });
            clearFindId();
        }
        if (findedError) {
            this.setState({
                aliasGroup: { name: aliasName, error: findedError },
                idGroup: { name: '', error: '' }
            });
            clearFindError();
        }
    }
    render() {
        const { idGroup, nameGroup, typeGroup, aliasGroup } = this.state;
        return (
            <GroupAdd
                aliasGroup={aliasGroup}
                idGroup={idGroup}
                nameGroup={nameGroup}
                handleGroupsAdd={this.handleGroupsAdd}
                onChange={name => this.handleChange.bind(this, name)}
                typeGroup={typeGroup}
                handleTypeGroup={this.handleTypeGroup}
                handleFindId={this.handleFindId}
            />
        );
    }
}

export { GroupAddContain };

const mapStateToProps = state => {
    return {
        groups: getGroups(state),
        findId: getFindId(state)
    };
};

export default connect(
    mapStateToProps,
    {
        groupsAdd,
        setGroupsRequest,
        fetchFindIdRequest,
        aliasFindId,
        clearFindId,
        clearFindError
    }
)(GroupAddContain);
