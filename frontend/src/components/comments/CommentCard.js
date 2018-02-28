import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCommentDelete, fetchCommentVoteAdd, fetchCommentVoteRemove } from '../../actions/comments';

class CommentCard extends Component {
    
    onClickAdicionarVoto(comment) {
        this.props.voteAdd(comment);
    };

    onClickRemoverVoto(comment) {
        this.props.voteRemove(comment);
    };

    onClickDeletarPost(comment) {
        this.props.deleteComment(comment);
    }

    render() {
        const { comment, post } = this.props;

        return (
            <div className="card my-1">
                <div className="card-body">
                    <p className="card-text">
                        {comment.body}
                    </p>
                    <footer className="blockquote-footer pt-4">
                        <strong className="text-muted">
                            {comment.author}
                        </strong>
                    </footer>

                    <small className="text-muted">Última atualização: {new Date(comment.timestamp).toLocaleDateString()}</small>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-12">
                            <div className="float-left">
                                <button className="btn btn-sm btn-outline-danger" title="Remover" onClick={event => this.onClickDeletarPost(comment)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link
                                    className="btn btn-sm btn-outline-primary ml-2"
                                    title="Editar"
                                    to={{ pathname: `/${post.category}/${post.id}/comment/update/${comment.id}` }}
                                    style={{ textDecorationLine: "none" }}
                                >
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-sm btn-outline-success ml-2" title="Votar" onClick={event => this.onClickAdicionarVoto(comment)}>
                                    <i className="fa fa-thumbs-up"></i> {comment.voteScore}
                                </button>
                                <button className="btn btn-sm btn-outline-danger ml-2" title="Votar" onClick={event => this.onClickRemoverVoto(comment)}>
                                    <i className="fa fa-thumbs-down"></i> {comment.voteScore}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        voteAdd: (comment) => dispatch(fetchCommentVoteAdd(comment)),
        voteRemove: (comment) => dispatch(fetchCommentVoteRemove(comment)),
        deleteComment: (comment) => dispatch(fetchCommentDelete(comment))
    };
};

export default connect(null, mapDispatchToProps)(CommentCard);