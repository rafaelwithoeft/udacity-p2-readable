import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';
import PostCard from './PostCard';
import CommentList from './../comments/CommentList';

import { fetchPostData, fetchPostVoteAdd, fetchPostVoteRemove, fetchPostDelete } from '../../actions/posts';

class PostDetail extends Component {
    componentWillMount() {
        let category, post;
        if (typeof this.props.match !== typeof undefined && typeof this.props.match.params.category !== typeof undefined) {
            category = this.props.match.params.category.trim();
        }
        if (typeof this.props.match !== typeof undefined && typeof this.props.match.params.post !== typeof undefined) {
            post = this.props.match.params.post.trim();
        }

        this.setState({
            category,
            post
        });
    }

    componentDidMount() {
        if (this.state.post !== null) {
            this.props.getPost(this.state.post);
        }
    }

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
        const { categories, postLoading, postError, post } = this.props;
        const { category } = this.state;

        //Redirecionar o usuário para a página inicial se a categoria for inválida ou as categorias não estiverem na store.
        const foundCategory = categories.find(element => element.name === category);
        if (typeof foundCategory === typeof undefined && (typeof categories === typeof undefined || categories.length === 0)) {
            return <Redirect to="/" />
        }

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            Visualizando um post da categoria <span className="text-info">{category}</span>
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
                            post !== null &&
                            <Link
                                className="btn btn-success ml-2"
                                to={{ pathname: `/${post.category}/${post.id}/comment/create` }}
                                style={{ textDecorationLine: 'none' }}
                            >
                                Novo comentário
                            </Link>
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
                    <div className="div-readable-psot-detail">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-12">
                                <PostCard post={post} showDetail={true} />                            
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                                    Comentários
                                </h1>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-12">
                                <CommentList post={post} />
                            </div>
                        </div>
                    </div>
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
        voteAdd: (post) => dispatch(fetchPostVoteAdd(post)),
        voteRemove: (post) => dispatch(fetchPostVoteRemove(post)),
        deletePost: (post) => dispatch(fetchPostDelete(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);