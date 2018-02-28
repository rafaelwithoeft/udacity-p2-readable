import React, { Component } from 'react';
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

        return (
            <div className="readable-posts-list">
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="readable-posts-sort">Ordenar por &nbsp;</label>
                        <select
                            className="form-control"
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

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments,
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