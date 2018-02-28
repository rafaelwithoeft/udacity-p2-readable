import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';
import PostCard from './PostCard';

import { 
    fetchPostsData, 
    fetchAllPostsData, 
    postsSortByDateAsc, 
    postsSortByDateDesc, 
    postsSortByVoteAsc,
    postsSortByVoteDesc,
    postsSortBySuccess
} from '../../actions/posts';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = { category: null };
    }

    componentWillMount() {
        if (typeof this.props.match !== typeof undefined && typeof this.props.match.params.category !== typeof undefined) {
            this.setState({
                category: this.props.match.params.category.trim()
            });
        }
    }

    componentDidMount() {
        const { category } = this.state;

        if (category === null || category.trim().length === 0) {
            this.props.getAllPosts();
        } else {
            this.props.getPosts(category);
        }
    }

    handleOnChangeSort(event) {
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
        const { postsLoading, postsError, posts, categories } = this.props;
        const { category } = this.state;

        if (category !== null) {
            //Redirecionar o usuário para a página inicial se a categoria for inválida ou as categorias não estiverem na store.
            const foundCategory = categories.find(element => element.name === category);
            if (typeof foundCategory === typeof undefined && (typeof categories === typeof undefined || categories.length === 0)) {
                return <Redirect to="/" />
            }
        }

        return (
            <div className="readable-posts-list">
                {
                    category === null &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                                Exibindo todas as postagens
                            </h1>
                        </div>
                    </div>
                }
                {
                    category !== null &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                                Postagens da categoria <span className="text-info">{category}</span>
                            </h1>
                        </div>
                    </div>
                }
                {
                    category !== null &&
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2">
                            <Link
                                className="btn btn-secondary"
                                to={{ pathname: '/' }}
                                style={{ textDecorationLine: 'none' }}
                            >
                                Voltar
                            </Link>

                            <Link
                                className="btn btn-success ml-2"
                                to={{ pathname: `/${category}/post/create` }}
                                style={{ textDecorationLine: 'none' }}
                            >
                                Cadastrar
                            </Link>
                        </div>
                    </div>
                }

                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="readable-posts-sort">Ordenar por &nbsp;</label>
                        <select
                            className="form-control"
                            id="readable-posts-sort"
                            defaultValue={this.props.sort}
                            onChange={event => this.handleOnChangeSort(event)}
                        >
                            <option value="voteDesc">Mais votado</option>
                            <option value="voteAsc">Menos votado</option>
                            <option value="dateDesc">Mais recente</option>
                            <option value="dateAsc">Menos recente</option>
                        </select>
                    </div>
                </div>
                
                {
                    postsLoading && <Loading />
                }
                {
                    !postsLoading &&
                    postsError &&
                    <Alert classAlert="alert-danger" message="Ocorreu um erro ao carregar as postagens..." />
                }
                {
                    !postsLoading &&
                    !postsError &&
                    (typeof posts === typeof undefined || posts.length === 0) &&
                    <Alert classAlert="alert-danger" message="Nenhuma postagem foi encontrada." />
                }
                {
                    !postsLoading &&
                    !postsError &&
                    posts.length > 0 &&
                    <div className="row">
                        {
                            posts.map((post) => {
                                return (
                                    <div key={post.id} className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                                        <PostCard post={post} showDetail={false}/>
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
        categories: state.categories.categories,
        sort: state.posts.sort,
        posts: state.posts.posts,
        postsError: state.posts.postsError,
        postsLoading: state.posts.postsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: (category) => dispatch(fetchPostsData(category)),
        getAllPosts: () => dispatch(fetchAllPostsData()),
        sortDateAsc: () => dispatch(postsSortByDateAsc()),
        sortDateDesc: () => dispatch(postsSortByDateDesc()),
        sortVoteAsc: () => dispatch(postsSortByVoteAsc()),
        sortVoteDesc: () => dispatch(postsSortByVoteDesc()),
        sortVoteSuccess: () => dispatch(postsSortBySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);