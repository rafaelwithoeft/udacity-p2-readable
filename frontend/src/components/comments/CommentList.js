import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';
import CommentCard from './CommentCard';

import { 
    fetchCommentsData,
    commentsSortByDateAsc,
    commentsSortByDateDesc,
    commentsSortByVoteAsc,
    commentsSortByVoteDesc,
    commentsSortBySuccess
 } from '../../actions/comments';

class CommentList extends Component {
    componentDidMount() {
        const { post } = this.props;
        if (typeof post !== typeof undefined && post !== null) {
            this.props.getComments(post);
        }
    }

    handleOnChangeSortComment(event) {
        const value = event.target.value;
        switch (value) {
            case "voteAsc":
                this.props.sortVoteAsc();
                break;
            case "dateAsc":
                this.props.sortDateAsc();
                break;
            case "dateDesc":
                this.props.sortDateDesc();
                break;
            default:
                this.props.sortVoteDesc();
                break;
        }
        this.props.sortVoteSuccess();
    }

    render() {
        const { commentsLoading, commentsError, comments, post } = this.props;

        if (typeof post === typeof undefined || post === null) {
            return <Redirect to={'/'} />
        }

        return (
            <div className="readable-posts-list">
                <div className="row mb-3">
                    <div className="col-12 col-sm-12 col-lg-6 col-xl-6">
                        <Link
                            className="btn btn-lg btn-success"
                            to={{ pathname: `/${post.category}/${post.id}/comment/create` }}
                            style={{ textDecorationLine: 'none' }}
                        >
                            Novo comentário
                        </Link>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-6 col-xl-6">
                        <label className="form-label">Ordenar por &nbsp;</label>
                        <select
                            className="form-control mx-sm-6"
                            id="readable-posts-sort"
                            defaultValue={this.props.sort}
                            onChange={event => this.handleOnChangeSortComment(event)}
                        >
                            <option value="voteDesc">Mais votado</option>
                            <option value="voteAsc">Menos votado</option>
                            <option value="dateDesc">Mais recente</option>
                            <option value="dateAsc">Menos recente</option>
                        </select>
                    </div>
                </div>
                {
                    commentsLoading && <Loading />
                }
                {
                    !commentsLoading &&
                    commentsError &&
                    <Alert classAlert="alert-danger" message="Ocorreu um erro ao carregar os comentários..." />
                }
                {
                    !commentsLoading &&
                    !commentsError &&
                    (typeof comments === typeof undefined || comments.length === 0) &&
                    <Alert classAlert="alert-danger" message="Nenhum comentário foi encontrado." />
                }
                {
                    !commentsLoading &&
                    !commentsError &&
                    comments.length > 0 &&
                    <div className="row">
                        {
                            comments.map((comment) => {
                                return (
                                    <div key={comment.id} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                        <CommentCard post={post} comment={comment}/>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
        );
    }
};

const sortComments = (comments, sort) => {
    switch (sort) {
        case "voteAsc":
            return comments.slice().sort((a, b) => a.voteScore - b.voteScore);
        case "voteDesc":
            return comments.slice().sort((a, b) => b.voteScore - a.voteScore);
        case "dateAsc":
            return comments.slice().sort((a, b) => a.timestamp - b.timestamp);
        default:
            return comments.slice().sort((a, b) => b.timestamp - a.timestamp);

    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.post,
        category: state.categories.category,
        comments: sortComments(state.comments.comments, state.comments.sort),
        commentsLoading: state.comments.commentsLoading,
        commentsError: state.comments.commentsError,
        sort: state.comments.sort
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (post) => dispatch(fetchCommentsData(post)),
        sortDateAsc: () => dispatch(commentsSortByDateAsc()),
        sortDateDesc: () => dispatch(commentsSortByDateDesc()),
        sortVoteAsc: () => dispatch(commentsSortByVoteAsc()),
        sortVoteDesc: () => dispatch(commentsSortByVoteDesc()),
        sortVoteSuccess: () => dispatch(commentsSortBySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);