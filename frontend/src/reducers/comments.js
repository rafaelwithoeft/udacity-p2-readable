import {
    COMMENTS_LOADING, 
    COMMENTS_ERROR, 
    COMMENTS_SUCCESS, 
    COMMENT_LOADING,
    COMMENT_ERROR,
    COMMENT_SUCCESS,
    COMMENT_CREATE_SUCCESS,
    COMMENT_UPDATE_SUCCESS,
    COMMENT_DELETE_SUCESS,
    COMMENT_VOTE_ADD,
    COMMENT_VOTE_REMOVE,
    COMMENTS_SORTBY_DATE_ASC,
    COMMENTS_SORTBY_DATE_DESC,
    COMMENTS_SORTBY_VOTE_ASC,
    COMMENTS_SORTBY_VOTE_DESC,
    COMMENTS_SORTBY_SUCCESS
} from '../actions/comments';

const commentsInitialState = {
    sort: "voteDesc",
    comments: [],
    commentsLoading: false,
    commentsError: false,
    comment: null,
    commentLoading: false,
    commentError: false
};

export default function comments(state = commentsInitialState, action) {
    switch (action.type) {
        case COMMENTS_LOADING:
            return {
                ...state,
                commentsLoading: action.commentsLoading
            }
        case COMMENTS_ERROR:
            return {
                ...state,
                commentsError: action.commentsError
            }
        case COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments
            }
        case COMMENTS_SORTBY_DATE_ASC:
            return {
                ...state,
                sort: "dateAsc"
            };
        case COMMENTS_SORTBY_DATE_DESC:
            return {
                ...state,
                sort: "dateDesc"
            };
        case COMMENTS_SORTBY_VOTE_ASC:
            return {
                ...state,
                sort: "voteAsc"
            };
        case COMMENTS_SORTBY_VOTE_DESC:
            return {
                ...state,
                sort: "voteDesc"
            }
        case COMMENTS_SORTBY_SUCCESS:
            return {
                ...state,
                comments: state.comments
            };
        case COMMENT_LOADING:
            return {
                ...state,
                comment: null,
                commentLoading: action.commentLoading
            };
        case COMMENT_ERROR:
            return {
                ...state,
                comment: null,
                commentError: action.commentError
            };
        case COMMENT_SUCCESS:
            return {
                ...state,
                comment: action.comment
            };
        case COMMENT_CREATE_SUCCESS:
            return {
                ...state,
                comments: state.comments.concat(action.comment)
            };
        case COMMENT_UPDATE_SUCCESS:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.comment.id).concat(action.comment)
            };
        case COMMENT_DELETE_SUCESS:
            return {
                comments: state.comments.filter(comment => comment.id !== action.comment.id)
            };
        case COMMENT_VOTE_ADD:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id !== action.comment.id) {
                        return comment;
                    }
                    return {
                        ...comment,
                        voteScore: comment.voteScore + 1
                    }
                })
            };
        case COMMENT_VOTE_REMOVE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id !== action.comment.id) {
                        return comment;
                    }
                    return {
                        ...comment,
                        voteScore: comment.voteScore - 1
                    }
                })
            };
        default:
            return state;
    }
}