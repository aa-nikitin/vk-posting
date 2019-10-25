import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TableGroup from '../../components/TableGroup';
import { getGroups, getGroupActive, getGroupsAll } from '../../reducers/';
import {
    setGroupsRequest,
    fetchGroupsRequest,
    groupsDel,
    groupsActiveItem,
    groupsDisplayCount,
    groupsDisplayPage
} from '../../actions/listGroups';
import { fetchVkGroupRequest } from '../../actions/vkGroups';

import { COUNT_STEP } from '../../constants';

class ListGroupsContain extends PureComponent {
    state = {
        counts: this.props.groupsAll.count,
        page: this.props.groupsAll.page
    };

    handleCounts = ({ target: { value } }) => {
        const { counts } = this.state;
        const { groupsDisplayCount } = this.props;
        const step = COUNT_STEP;
        const newValue = (value - counts) * step + counts;
        const countValue = newValue > step ? newValue : step;

        this.setState({ counts: countValue });
        groupsDisplayCount(countValue);
    };
    handlePage = ({ target: { value } }) => {
        const { groupsDisplayPage } = this.props;
        const pageValue = Number(value > 0 ? value : 1);

        this.setState({ page: pageValue });
        groupsDisplayPage(pageValue);
    };

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
        const { counts, page } = this.state;
        const { groups, active, groupsActiveItem } = this.props;

        return (
            <TableGroup
                groups={groups}
                handleDel={this.handleDel}
                handleClickTableRow={this.handleClickTableRow}
                groupsActiveItem={groupsActiveItem}
                active={active}
                counts={Number(counts)}
                page={Number(page)}
                handleCounts={this.handleCounts}
                handlePage={this.handlePage}
            />
        );
    }
}

export { ListGroupsContain };

const mapStateToProps = state => {
    return {
        groups: getGroups(state),
        active: getGroupActive(state),
        groupsAll: getGroupsAll(state)
    };
};

export default connect(
    mapStateToProps,
    {
        setGroupsRequest,
        fetchGroupsRequest,
        groupsDel,
        groupsActiveItem,
        fetchVkGroupRequest,
        groupsDisplayCount,
        groupsDisplayPage
    }
)(ListGroupsContain);
