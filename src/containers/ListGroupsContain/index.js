import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TableGroup from '../../components/TableGroup';
import { getGroups } from '../../reducers/';

class ListGroup extends PureComponent {
    state = {};

    render() {
        const { groups } = this.props;
        // console.log(groups);
        return <TableGroup groups={groups} />;
    }
}

const mapStateToProps = state => {
    return {
        groups: getGroups(state)
    };
};

export default connect(
    mapStateToProps,
    {}
)(ListGroup);
