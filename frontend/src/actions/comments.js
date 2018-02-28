import * as readableAPI from '../services/ReadableAPI';

export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const COMMENTS_ERROR = 'COMMENTS_ERROR';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';

export const COMMENTS_SORTBY_VOTE_DESC = 'COMMENTS_SORTBY_VOTE_DESC';
export const COMMENTS_SORTBY_VOTE_ASC = 'COMMENTS_SORTBY_VOTE_ASC';
export const COMMENTS_SORTBY_DATE_ASC = 'COMMENTS_SORTBY_DATE_ASC';
export const COMMENTS_SORTBY_DATE_DESC = 'COMMENTS_SORTBY_DATE_DESC';
export const COMMENTS_SORTBY_SUCCESS = 'COMMENTS_SORTBY_SUCCESS';

export const COMMENT_LOADING = 'COMMENT_LOADING';
export const COMMENT_ERROR = 'COMMENT_ERROR';
export const COMMENT_SUCCESS = 'COMMENT_SUCCESS';

export const COMMENT_DELETE_SUCESS = 'COMMENT_DELETE_SUCESS';
export const COMMENT_CREATE_SUCCESS = 'COMMENT_CREATE_SUCCESS';
export const COMMENT_UPDATE_SUCCESS = 'COMMENT_UPDATE_SUCCESS';

export const COMMENT_VOTE_ADD = 'COMMENT_VOTE_ADD';
export const COMMENT_VOTE_REMOVE = 'COMMENT_VOTE_REMOVE';

export function commentsError(bool) {
    return {
        type: COMMENTS_ERROR,
        commentsError: bool
    };
}
export function commentsLoading(bool) {
    return {
        type: COMMENTS_LOADING,
        commentsLoading: bool
    };
}
export function commentsSuccess(comments) {
    return {
        type: COMMENTS_SUCCESS,
        comments
    };
}

export function commentsSortByDateAsc() {
    return {
        type: COMMENTS_SORTBY_DATE_ASC
    }
}
export function commentsSortByDateDesc() {
    return {
        type: COMMENTS_SORTBY_DATE_DESC
    }
}
export function commentsSortByVoteAsc() {
    return {
        type: COMMENTS_SORTBY_VOTE_ASC
    }
}
export function commentsSortByVoteDesc() {
    return {
        type: COMMENTS_SORTBY_VOTE_DESC
    }
}
export function commentsSortBySuccess() {
    return {
        type: COMMENTS_SORTBY_SUCCESS
    }
}

export function commentError(bool) {
    return {
        type: COMMENT_ERROR,
        commentError: bool
    };
}
export function commentLoading(bool) {
    return {
        type: COMMENT_LOADING,
        commentLoading: bool
    };
}
export function commentSuccess(comment) {
    return {
        type: COMMENT_SUCCESS,
        comment
    };
}
export function commentVoteAdd(comment) {
    return {
        type: COMMENT_VOTE_ADD,
        comment
    };
}
export function commentVoteRemove(comment) {
    return {
        type: COMMENT_VOTE_REMOVE,
        comment
    };
}
export function commentDeleteSuccess(comment) {
    return {
        type: COMMENT_DELETE_SUCESS,
        comment
    };
}
export function commentCreateSuccess(comment) {
    return {
        type: COMMENT_CREATE_SUCCESS,
        comment
    }
}
export function commentUpdateSuccess(comment) {
    return {
        type: COMMENT_UPDATE_SUCCESS,
        comment
    }
}

/**
 * Get comments of a single post.
 * @param {object} post 
 */
export function fetchCommentsData(post) {
    return (dispatch) => {
        dispatch(commentsLoading(true));
        readableAPI.getPostComments(post)
            .then((response) => {
                dispatch(commentsLoading(false));
                return response.json();
            })
            .then(comments => dispatch(commentsSuccess(comments)))
            .catch(error => dispatch(commentsError(true)));
    };
}

/**
 * Get post by id.
 * @param string post 
 */
export function fetchCommentData(comment) {
    return (dispatch) => {
        dispatch(commentLoading(true));

        readableAPI.getComment(comment)
            .then((response) => {
                dispatch(commentLoading(false));
                return response.json();
            })
            .then(comment => dispatch(commentSuccess(comment)))
            .catch(error => dispatch(commentError(true)));
    };
}

export function fetchCommentVoteAdd(comment) {
    return (dispatch) => {
        readableAPI.voteComment(comment, "upVote")
            .then(response => response.json())
            .then(comment => dispatch(commentVoteAdd(comment)));
    };
}

export function fetchCommentVoteRemove(comment) {
    return (dispatch) => {
        readableAPI.voteComment(comment, "downVote")
            .then(response => response.json())
            .then(comment => dispatch(commentVoteRemove(comment)));
    };
}

export function fetchCommentDelete(comment) {
    return (dispatch) => {
        readableAPI.deleteComment(comment)
            .then(response => response.json())
            .then(comment => dispatch(commentDeleteSuccess(comment)));
    };
}

/**
 * Cadastra um novo comentário.
 * @param {object} comment 
 */
export function fetchCommentCreate(comment) {
    return (dispatch) => {
        readableAPI.createComment(comment)
            .then((response) => {
                return response.json();
            })
            .then(comment => dispatch(commentCreateSuccess(comment)));
    };
}

/**
 * Atualiza um comentário.
 * @param object comment
 */
export function fetchCommentUpdate(comment) {
    return (dispatch) => {
        readableAPI.updateComment(comment)
            .then((response) => {
                return response.json();
            })
            .then(comment => dispatch(commentUpdateSuccess(comment)));
    };
}