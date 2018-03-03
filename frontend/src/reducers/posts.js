import {
    POSTS_LOADING, 
    POSTS_ERROR,
    POSTS_SUCCESS,
    POSTS_SORTBY_DATE_ASC,
    POSTS_SORTBY_DATE_DESC,
    POSTS_SORTBY_VOTE_ASC,
    POSTS_SORTBY_VOTE_DESC,
    POSTS_SORTBY_SUCCESS,
    POST_CREATE_SUCCESS,
    POST_UPDATE_SUCCESS,
    POST_DELETE,
    POST_VOTE_ADD,
    POST_VOTE_REMOVE,
    POST_LOADING,
    POST_SUCCESS,
    POST_SELECT
} from '../actions/posts';

const postsInitialState = {
    posts: [],
    postsLoading: false,
    postsError: false,
    post: null,
    postSelected: null,
    postLoading: false,
    sort: "voteDesc"
};

export default function posts(state = postsInitialState, action) {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                postsLoading: action.postsLoading
            };
        case POSTS_ERROR:
            return {
                ...state,
                postsError: action.postsError
            };
        case POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts
            };
        case POSTS_SORTBY_DATE_ASC:
            return {
                ...state,
                sort: "dateAsc"
            };
        case POSTS_SORTBY_DATE_DESC:
            return {
                ...state,
                sort: "dateDesc"
            };
        case POSTS_SORTBY_VOTE_ASC:
            return {
                ...state,
                sort: "voteAsc"
            };
        case POSTS_SORTBY_VOTE_DESC:
            return {
                ...state,
                sort: "voteDesc"
            }
        case POSTS_SORTBY_SUCCESS:
            return {
                ...state,
                posts: state.posts
            };
        case POST_LOADING:
            return {
                ...state,
                postLoading: action.postLoading
            };
        case POST_SUCCESS:
            return {
                ...state,
                post: state.posts.find(post => post.id === state.postSelected)
            }
        case POST_SELECT:
            return {
                ...state,
                post: null,
                postSelected: action.post
            }
        case POST_CREATE_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.post)
            };
        case POST_UPDATE_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.post.id).concat(action.post)
            }
        case POST_DELETE:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.post.id)
            }
        case POST_VOTE_ADD:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id !== action.post.id) {
                        return post;
                    }
                    return {
                        ...post,
                        voteScore: post.voteScore + 1
                    }
                })
            };
        case POST_VOTE_REMOVE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id !== action.post.id) {
                        return post;
                    }
                    return {
                        ...post,
                        voteScore: post.voteScore -1
                    }
                })
            };
        default:
            return state;
    }
}