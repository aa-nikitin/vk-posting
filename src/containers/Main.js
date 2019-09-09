import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsRequest } from '../actions/actions1';

class Main extends PureComponent {
    componentDidMount() {
        const { fetchFriendsRequest } = this.props;
        fetchFriendsRequest();
    }
    render() {
        return <div>as</div>;
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest }
)(Main);
