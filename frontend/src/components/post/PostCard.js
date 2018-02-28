import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPostVoteAdd, fetchPostVoteRemove, fetchPostDelete } from '../../actions/posts';

class PostCard extends Component {
    
    onClickAdicionarVoto(post) {
        this.props.voteAdd(post);
    };

    onClickRemoverVoto(post) {
        this.props.voteRemove(post);
    };

    onClickDeletarPost(post) {
        this.props.deletePost(post);
    }

    render() {
        const { post, showDetail } = this.props;

        return (
            <div className="card my-1">
                <div className="card-body">
                    <h5 className="card-title text-center text-truncate font-weight-bold">
                        <Link
                            to={{ pathname: `/${post.category}/${post.id}` }}
                            style={{ textDecorationLine: "none", fontSize: "22px" }}
                        >
                            {post.title}
                        </Link>
                    </h5>

                    {
                        showDetail &&
                        <p className="card-text">
                            {post.body}
                        </p>
                    }

                    <footer className="blockquote-footer pt-4">
                        <strong className="text-muted">
                            {post.author}
                        </strong>
                    </footer>

                    <small className="text-muted">Última atualização: {new Date(post.timestamp).toLocaleDateString()}</small>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-12">
                            <div className="float-left">
                                <button className="btn btn-sm btn-outline-danger" title="Remover" onClick={event => this.onClickDeletarPost(post)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                                <Link
                                    className="btn btn-sm btn-outline-primary ml-2"
                                    title="Editar"
                                    to={{ pathname: `/${post.category}/post/update/${post.id}` }}
                                    style={{ textDecorationLine: "none" }}
                                >
                                    <i className="fa fa-pencil"></i>
                                </Link>
                            </div>
                            <div className="float-right">
                                <button className="btn btn-sm btn-outline-dark ml-2 disabled" title="Comentários" disabled>
                                    <i className="fa fa-comments-o"></i> {post.commentCount}
                                </button>
                                <button className="btn btn-sm btn-outline-success ml-2" title="Votar" onClick={event => this.onClickAdicionarVoto(post)}>
                                    <i className="fa fa-thumbs-up"></i> {post.voteScore}
                                </button>
                                <button className="btn btn-sm btn-outline-danger ml-2" title="Votar" onClick={event => this.onClickRemoverVoto(post)}>
                                    <i className="fa fa-thumbs-down"></i> {post.voteScore}
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
        voteAdd: (post) => dispatch(fetchPostVoteAdd(post)),
        voteRemove: (post) => dispatch(fetchPostVoteRemove(post)),
        deletePost: (post) => dispatch(fetchPostDelete(post))
    };
};

export default connect(null, mapDispatchToProps)(PostCard);