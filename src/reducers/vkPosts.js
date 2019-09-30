import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import _ from 'lodash';

import {
    fetchVkGroupRequest,
    fetchVkGroupSuccess,
    fetchVkGroupFailure,
    addVkPost
} from '../actions/vkGroups';

const vkPosts = handleActions(
    {
        [fetchVkGroupRequest]: () => [],
        [fetchVkGroupSuccess]: (state, action) => action.payload
    },
    []
);

const sendPost = handleActions(
    {
        [fetchVkGroupRequest]: () => {},
        [addVkPost]: (state, action) => action.payload
    },
    {}
);

const isLoading = handleActions(
    {
        [fetchVkGroupRequest]: () => true,
        [fetchVkGroupSuccess]: () => false,
        [fetchVkGroupFailure]: () => false
    },
    false
);

const error = handleActions(
    {
        [fetchVkGroupRequest]: () => null,
        [fetchVkGroupFailure]: (state, action) =>
            action.payload ? action.payload : null
    },
    ''
);

export const getSendPost = state => state.vkPosts.sendPost;

export const getVkPost = createSelector(
    state => state.vkPosts.vkPosts,
    items =>
        items.map(
            ({ id, date, from_id, owner_id, post_type, text, attachments }) => {
                const newFormatPost = {
                    id,
                    date,
                    from_id,
                    owner_id,
                    post_type,
                    text
                };
                let photosLink = '';
                if (!attachments) return newFormatPost;
                return {
                    ...newFormatPost,
                    attachments: attachments.map(attach => {
                        const {
                            type,
                            photo: { id, owner_id, date, sizes } = {}
                        } = attach;
                        const typesPhotoValid = ['m', 'q', 'z'];
                        if (type === 'photo') {
                            photosLink = photosLink + `photo${owner_id}_${id},`;
                            return {
                                id,
                                owner_id,
                                date,
                                type,
                                namePhoto: `photo-${owner_id}_${id}`,
                                sizes: sizes.filter(
                                    image =>
                                        _.indexOf(
                                            typesPhotoValid,
                                            image.type
                                        ) >= 0
                                )
                            };
                        }
                        return attach;
                    }),
                    photosLink
                };
            }
        )
);

export default combineReducers({ vkPosts, isLoading, error, sendPost });
