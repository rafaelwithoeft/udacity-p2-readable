import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';

import { fetchPostUpdate, fetchPostData } from '../../actions/posts';

class PostUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.match.params.category,
            post: null,
            redirect: false
        };
    }

    componentDidMount() {
        this.props.getPost(this.props.match.params.post);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post !== null) {
            this.setState(prevState => ({
                post: nextProps.post
            }));
        }
    }

    handleInputChange = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        this.setState(prevState => ({
            post: {
                ...prevState.post,
                timestamp: Date.now(),
                [name]: value,
            }
        }));
    }

    onClickButtonAtualizar(event) {
        event.preventDefault();

        if (this.state.post !== null) {
            this.props.updatePost(this.state.post);
            this.setState({ redirect: true });
        }
    }

    render() {
        const { categories, postLoading, postError } = this.props;
        const { category, post, redirect } = this.state;

        //Redirecionar o usuário para a página inicial se a categoria for inválida ou as categorias não estiverem na store.
        const foundCategory = categories.find(element => element.name === category);
        if (typeof foundCategory === typeof undefined && (typeof categories === typeof undefined || categories.length === 0)) {
            return <Redirect to="/" />
        }

        //Redirecionar após atualizar
        if (redirect) {
            return <Redirect to={`/${category}`} />
        }

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            Atualizando um post da categoria <span className="text-info">{category}</span>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2">
                        <Link
                            className="btn btn-secondary"
                            to={{ pathname: `/${category}` }}
                            style={{ textDecorationLine: 'none' }}
                        >
                            Voltar
                            </Link>

                        {
                            this.state.post !== null &&
                            <button onClick={event => this.onClickButtonAtualizar(event)} className="btn btn-success ml-2">Atualizar</button>
                        }
                    </div>
                </div>
                {
                    postLoading && <Loading />
                }
                {
                    !postLoading &&
                    postError &&
                    <Alert classAlert="alert-danger" message="Ocorreu um erro ao carregar a postagem." />
                }
                {
                    !postLoading &&
                    !postError &&
                    (typeof post === typeof undefined || post === null) &&
                    <Alert classAlert="alert-danger" message="Nenhuma postagem foi encontrada." />
                }

                {
                    !postLoading &&
                    !postError &&
                    (typeof post !== typeof undefined && post !== null) &&
                    <form id="form-post-create" onSubmit={event => event.preventDefault()}>
                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="form-post-title">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    aria-describedby="title"
                                    placeholder="Título"
                                    autoFocus
                                    onChange={event => this.handleInputChange(event)}
                                    defaultValue={post.title}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="form-post-author">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    placeholder="Autor"
                                    onChange={event => this.handleInputChange(event)}
                                    defaultValue={post.author}
                                />
                            </div>
                        </div>
                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="form-post-body">Conteúdo</label>
                                <textarea
                                    className="form-control"
                                    name="body"
                                    rows="3"
                                    onChange={event => this.handleInputChange(event)}
                                    defaultValue={post.body}
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
        categories: state.categories.categories,
        post: state.posts.post,
        postLoading: state.posts.postLoading,
        postError: state.posts.postError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (post) => dispatch(fetchPostData(post)),
        updatePost: (postObject) => dispatch(fetchPostUpdate(postObject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);