import {
    POSTS_LOADING, 
    POSTS_ERROR, 
    POSTS_SUCCESS,
    POSTS_SORTBY_DATE_ASC,
    POSTS_SORTBY_DATE_DESC,
    POSTS_SORTBY_VOTE_ASC,
    POSTS_SORTBY_VOTE_DESC,
    POSTS_SORTBY_SUCCESS,
    POST_LOADING,
    POST_ERROR,
    POST_SUCCESS,
    POST_CREATE_SUCCESS,
    POST_UPDATE_SUCCESS,
    POST_DELETE,
    POST_VOTE_ADD,
    POST_VOTE_REMOVE
} from '../actions/posts';

const postsInitialState = {
    posts: [],
    postsLoading: false,
    postsError: false,
    post: null,
    postLoading: false,
    postError: false,
    sort: "voteDesc"
};

export default function posts(state = postsInitialState, action) {
    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                posts: [],
                postsLoading: action.postsLoading
            };
        case POSTS_ERROR:
            return {
                ...state,
                posts: [],
                postsError: action.postsError
            };
        case POSTS_SUCCESS:
            return {
                ...state,
                posts: sortPosts(action.posts, state.sort)
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
                posts: sortPosts(state.posts, state.sort)
            };
        case POST_LOADING:
            return {
                ...state,
                post: null,
                postLoading: action.postLoading
            };
        case POST_ERROR:
            return {
                ...state,
                post: null,
                postError: action.postError
            };
        case POST_SUCCESS:
            return {
                ...state,
                post: action.post
            };
        case POST_CREATE_SUCCESS:
            return {
                ...state,
                posts: sortPosts(state.posts.concat(action.post), state.sort)
            };
        case POST_UPDATE_SUCCESS:
            return {
                ...state,
                posts: sortPosts(state.posts.filter(post => post.id !== action.post.id).concat(action.post), state.sort)
            };
        case POST_DELETE:
            return {
                posts: sortPosts(state.posts.filter(post => post.id !== action.post.id), state.sort)
            };
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
                }),
                post: {
                    ...state.post,
                    voteScore: state.post.id === action.post.id ? state.post.voteScore + 1 : state.post.voteScore
                }
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
                }),
                post: {
                    ...state.post,
                    voteScore: state.post.id === action.post.id ? state.post.voteScore + 1 : state.post.voteScore
                }
            };
        default:
            return state;
    }
}

const sortPosts = (posts, sort)  => {
    switch (sort) {
        case "voteAsc":
            return posts.slice().sort((a, b) => a.voteScore - b.voteScore);
        case "voteDesc":
            return posts.slice().sort((a, b) => b.voteScore - a.voteScore);
        case "dateAsc":
            return posts.slice().sort((a, b) => a.timestamp - b.timestamp);
        default:
            return posts.slice().sort((a, b) => b.timestamp - a.timestamp);

    }
}