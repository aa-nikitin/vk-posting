import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TableGroup from '../../components/TableGroup';
import { getGroups, getGroupActive } from '../../reducers/';
import {
    setGroupsRequest,
    fetchGroupsRequest,
    groupsDel,
    groupsActiveItem
} from '../../actions/listGroups';
import { fetchVkGroupRequest } from '../../actions/vkGroups';

class ListGroupsContain extends PureComponent {
    state = {};

    handleDel = id => {
        const { setGroupsRequest, groupsDel } = this.props;

        groupsDel(id);
        setGroupsRequest();
    };

    handleClickTableRow = id => {
        const { fetchVkGroupRequest, groupsActiveItem } = this.props;

        groupsActiveItem(id);
        fetchVkGroupRequest();
    };

    componentDidMount() {
        const { fetchGroupsRequest } = this.props;

        fetchGroupsRequest();
    }

    render() {
        const { groups, active, groupsActiveItem } = this.props;

        return (
            <TableGroup
                groups={groups}
                handleDel={this.handleDel}
                handleClickTableRow={this.handleClickTableRow}
                groupsActiveItem={groupsActiveItem}
                active={active}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        groups: getGroups(state),
        active: getGroupActive(state)
    };
};

export default connect(
    mapStateToProps,
    {
        setGroupsRequest,
        fetchGroupsRequest,
        groupsDel,
        groupsActiveItem,
        fetchVkGroupRequest
    }
)(ListGroupsContain);
