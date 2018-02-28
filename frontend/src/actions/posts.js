import * as readableAPI from '../services/ReadableAPI';

export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_ERROR = 'POSTS_ERROR';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';

export const POSTS_SORTBY_VOTE_DESC = 'POST_SORTBY_VOTE_DESC';
export const POSTS_SORTBY_VOTE_ASC = 'POST_SORTBY_VOTE_ASC';
export const POSTS_SORTBY_DATE_ASC = 'POST_SORTBY_DATE_ASC';
export const POSTS_SORTBY_DATE_DESC = 'POST_SORTBY_DATE_DESC';
export const POSTS_SORTBY_SUCCESS = 'POST_SORTBY_SUCCESS';

export const POST_LOADING = 'POST_LOADING';
export const POST_ERROR = 'POST_ERROR';
export const POST_SUCCESS = 'POST_SUCCESS';

export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS';
export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS';

export const POST_VOTE_ADD = 'POST_VOTE_ADD';
export const POST_VOTE_REMOVE = 'POST_VOTE_REMOVE';

export const POST_DELETE = 'POST_DELETE';
/***************************************************************************************************
                                        BEGIN POSTS ACTIONS
****************************************************************************************************/
export function postsError(bool) {
    return {
        type: POSTS_ERROR,
        postsError: bool
    };
}
export function postsLoading(bool) {
    return {
        type: POSTS_LOADING,
        postsLoading: bool
    };
}
export function postsSuccess(posts) {
    return {
        type: POSTS_SUCCESS,
        posts
    };
}
export function postsSortByDateAsc() {
    return {
        type: POSTS_SORTBY_DATE_ASC
    }
}
export function postsSortByDateDesc() {
    return {
        type: POSTS_SORTBY_DATE_DESC
    }
}
export function postsSortByVoteAsc() {
    return {
        type: POSTS_SORTBY_VOTE_ASC
    }
}
export function postsSortByVoteDesc() {
    return {
        type: POSTS_SORTBY_VOTE_DESC
    }
}
export function postsSortBySuccess() {
    return {
        type: POSTS_SORTBY_SUCCESS
    }
}

/**
 * Get All posts of specific category.
 * @param string category 
 */
export function fetchPostsData(category) {
    return (dispatch) => {
        dispatch(postsLoading(true));

        readableAPI.getPosts(category)
            .then((response) => {
                dispatch(postsLoading(false));
                return response.json();
            })
            .then(posts => dispatch(postsSuccess(posts)))
            .catch(error => dispatch(postsError(true)));
    };
}

export function fetchAllPostsData() {
    return (dispatch) => {
        dispatch(postsLoading(true));

        readableAPI.getAllPosts()
            .then((response) => {
                dispatch(postsLoading(false));
                return response.json();
            })
            .then(posts => dispatch(postsSuccess(posts)))
            .catch(error => dispatch(postsError(true)));
    };
}
/***************************************************************************************************
                                        BEGIN SINGLE POST ACTIONS
****************************************************************************************************/
export function postLoading(bool) {
    return {
        type: POST_LOADING,
        postLoading: bool
    };
}
export function postError(bool) {
    return {
        type: POST_ERROR,
        postError: bool
    };
}
export function postSuccess(post) {
    return {
        type: POST_SUCCESS,
        post
    };
}
export function postDelete(post) {
    return {
        type: POST_DELETE,
        post
    };
}
export function postVoteAdd(post) {
    return {
        type: POST_VOTE_ADD,
        post
    };
}
export function postVoteRemove(post) {
    return {
        type: POST_VOTE_REMOVE,
        post
    };
}
/**
 * Get post by id.
 * @param string post 
 */
export function fetchPostData(post) {
    return (dispatch) => {
        dispatch(postLoading(true));

        readableAPI.getPost(post)
            .then((response) => {
                dispatch(postLoading(false));
                return response.json();
            })
            .then(post => dispatch(postSuccess(post)))
            .catch(error => dispatch(postError(true)));
    };
}

export function fetchPostVoteAdd(post) {
    return (dispatch) => {
        readableAPI.votePost(post, "upVote")
            .then(response => response.json())
            .then(post => dispatch(postVoteAdd(post)));
    };
}

export function fetchPostVoteRemove(post) {
    return (dispatch) => {
        readableAPI.votePost(post, "downVote")
            .then(response => response.json())
            .then(post => dispatch(postVoteRemove(post)));
    };
}

export function fetchPostDelete(post) {
    return (dispatch) => {
        readableAPI.deletePost(post)
            .then(response => response.json())
            .then(post => dispatch(postDelete(post)));
    };
}
/***************************************************************************************************
                                        END SINGLE POST ACTIONS
****************************************************************************************************/
/***************************************************************************************************
                                        BEGIN CREATE/UPDATE POST ACTIONS
****************************************************************************************************/
export function postCreateSuccess(post) {
    return {
        type: POST_CREATE_SUCCESS,
        post
    }
}

export function postUpdateSuccess(post) {
    return {
        type: POST_UPDATE_SUCCESS,
        post
    }
}

/**
 * Cadastra um novo post.
 * @param {object} post 
 */
export function fetchPostCreate(post) {
    return (dispatch) => {
        readableAPI.createPost(post)
            .then((response) => {
                return response.json();
            })
            .then(post => dispatch(postCreateSuccess(post)));
    };
}

/**
 * Atualiza um post.
 * @param object post 
 */
export function fetchPostUpdate(post) {
    return (dispatch) => {
        readableAPI.updatePost(post)
            .then((response) => {
                return response.json();
            })
            .then(post => dispatch(postUpdateSuccess(post)));
    };
}
/***************************************************************************************************
                                        BEGIN CREATE/UPDATE POST ACTIONS
****************************************************************************************************/