import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    addGroupId,
    fetchGroupIdRequest,
    openGroupIdRequest
} from '../../actions/groupId';
import { getGroupIdState } from '../../reducers';

import GroupId from '../../components/GroupId';

class GroupIdContain extends PureComponent {
    state = {
        idGroup: '',
        typeGroup: this.props.idGroupState.typeGroup
    };

    handleCheckId = id => {
        const { addGroupId, fetchGroupIdRequest } = this.props;

        addGroupId(id);
        fetchGroupIdRequest(this.state.typeGroup);
    };

    handleChange = ({ target: { value } }) => this.setState({ idGroup: value });

    handleTypeGroup = value => {
        this.setState({
            typeGroup: value
        });
    };

    componentDidMount() {
        const { openGroupIdRequest } = this.props;

        openGroupIdRequest();
    }

    render() {
        const { idGroup, typeGroup } = this.state;
        const {
            idGroupState: { id, isLoading, typeGroup: typeGroupSet, error }
        } = this.props;
        return (
            <GroupId
                idGroup={idGroup}
                idGroupSet={id}
                typeGroupSet={typeGroupSet}
                isLoading={isLoading}
                onChange={this.handleChange}
                handleCheckId={this.handleCheckId}
                typeGroup={typeGroup}
                handleTypeGroup={this.handleTypeGroup}
                idGroupError={error}
            />
        );
    }
}

export { GroupIdContain };

const mapStateToProps = state => {
    return {
        idGroupState: getGroupIdState(state)
    };
};

export default connect(
    mapStateToProps,
    { addGroupId, fetchGroupIdRequest, openGroupIdRequest }
)(GroupIdContain);
