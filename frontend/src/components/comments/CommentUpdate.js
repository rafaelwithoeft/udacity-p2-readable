import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';

import { fetchCommentUpdate, fetchCommentData } from '../../actions/comments';

class CommentUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.match.params.post,
            comment: null,
            redirect: false
        };
    }

    componentDidMount() {
        this.props.getComment(this.props.match.params.comment);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.comment !== null) {
            this.setState(prevState => ({
                comment: nextProps.comment
            }));
        }
    }

    handleInputChange = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        this.setState(prevState => ({
            comment: {
                ...prevState.comment,
                timestamp: Date.now(),
                [name]: value,
            }
        }));
    }

    onClickButtonAtualizar(event) {
        event.preventDefault();

        if (this.state.comment !== null) {
            this.props.updateComment(this.state.comment);
            this.setState({ redirect: true });
        }
    }

    render() {
        const { posts, commentLoading, commentError } = this.props;
        const { post, comment, redirect } = this.state;

        //Redirecionar o usuário para a página inicial se a postagem for inválida ou os posts não estiverem na store.
        const foundPost = posts.find(element => element.id === post);
        if (typeof foundPost === typeof undefined && (typeof posts === typeof undefined || posts.length === 0)) {
            return <Redirect to="/" />
        }

        //Redirecionar após cadastro.
        if (redirect) {
            return <Redirect to={`/${foundPost.category}/${foundPost.id}`} />
        }

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            Atualizando um comentário da postagem
                            <br />
                            <span className="text-info">{foundPost.title}</span>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2">
                        <Link
                            className="btn btn-secondary"
                            to={{ pathname: `/${foundPost.category}/${foundPost.id}` }}
                            style={{ textDecorationLine: 'none' }}
                        >
                            Voltar
                        </Link>

                        {
                            this.state.comment !== null &&
                            <button onClick={event => this.onClickButtonAtualizar(event)} className="btn btn-success ml-2">Atualizar</button>
                        }
                    </div>
                </div>
                {
                    commentLoading && <Loading />
                }
                {
                    !commentLoading &&
                    commentError &&
                    <Alert classAlert="alert-danger" message="Ocorreu um erro ao carregar o comentário." />
                }
                {
                    !commentLoading &&
                    !commentError &&
                    (typeof comment === typeof undefined || comment === null) &&
                    <Alert classAlert="alert-danger" message="Nenhum comentário foi encontrado." />
                }

                {
                    !commentLoading &&
                    !commentError &&
                    (typeof comment !== typeof undefined && comment !== null) &&
                    <form id="form-comment-create" onSubmit={event => event.preventDefault()}>
                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="form-comment-author">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    placeholder="Autor"
                                    onChange={event => this.handleInputChange(event)}
                                    defaultValue={comment.author}
                                />
                            </div>
                        </div>
                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="form-comment-body">Conteúdo</label>
                                <textarea
                                    className="form-control"
                                    name="body"
                                    rows="3"
                                    onChange={event => this.handleInputChange(event)}
                                    defaultValue={comment.body}
                                >
                                </textarea>
                            </div>
                        </div>
                    </form>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        comment: state.comments.comment,
        commentLoading: state.comments.commentLoading,
        commentError: state.comments.commentError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getComment: (comment) => dispatch(fetchCommentData(comment)),
        updateComment: (comment) => dispatch(fetchCommentUpdate(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentUpdate);