import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { getVkPost } from '../../reducers/';
import PostVk from '../../components/PostVk';
import { addVkPost, setVkGroupRequest } from '../../actions/vkGroups';
// import { setVkGroupRequest } from '../../actions/vkGroups';

class PostsVkContain extends PureComponent {
    handleAddPost = post => {
        const { addVkPost, setVkGroupRequest } = this.props;

        addVkPost(post);
        setVkGroupRequest();
    };
    render() {
        const { posts } = this.props;

        return (
            <Grid container spacing={0}>
                {posts.map(item => {
                    const {
                        id,
                        text,
                        attachments,
                        photosLink,
                        shortText
                    } = item;
                    const photoPreview =
                        attachments && attachments[0].type === 'photo'
                            ? attachments[0].sizes[1].url
                            : '';
                    return (
                        <PostVk
                            key={id}
                            text={text}
                            shortText={shortText}
                            photoPreview={photoPreview}
                            attachments={photosLink}
                            handleAddPost={this.handleAddPost}
                        />
                    );
                })}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: getVkPost(state)
        // post: getVkPost(state)
    };
};

export default connect(
    mapStateToProps,
    { addVkPost, setVkGroupRequest }
)(PostsVkContain);
