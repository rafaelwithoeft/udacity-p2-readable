import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';
import Loading from './../Loading';
import PostCard from './PostCard';

import { 
    fetchPostsData,
    postsSortByDateAsc,
    postsSortByDateDesc,
    postsSortByVoteAsc,
    postsSortByVoteDesc,
    postsSortBySuccess
} from '../../actions/posts';

class PostList extends Component {
    componentDidMount() {
        this.props.getPosts();
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
        const { postsLoading, postsError, category } = this.props;
        let { posts } = this.props;

        if (category !== null && posts !== null) {
            //Filtrar os posts pela categoria
            posts = posts.filter(element => element.category === category);
        }

        return (
            <div className="readable-posts-list">

                {
                    category === null &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                                <u>
                                    Exibindo todas as postagens
                                </u>
                            </h1>
                        </div>
                    </div>
                }

                {
                    category !== null &&
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                                <u>
                                    Postagens da categoria <span className="text-info">{category}</span>
                                </u>
                            </h1>
                        </div>
                    </div>
                }

                <div className="row mb-3">
                    <div className="col-12 col-sm-12 col-lg-6 col-xl-6">
                        <Link
                            className="btn btn-lg btn-success"
                            to={{ pathname: `/post/create` }}
                            style={{ textDecorationLine: 'none' }}
                        >
                            Novo Post
                        </Link>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-6 col-xl-6">
                        <label className="form-label">Ordenar por &nbsp;</label>
                        <select
                            className="form-control mx-sm-6"
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

const sortPosts = (posts, sort) => {
    switch (sort) {
        case "voteAsc":
            return posts.slice().sort((a, b) => a.voteScore - b.voteScore);
        case "voteDesc":
            return posts.slice().sort((a, b) => b.voteScore - a.voteScore);
        case "dateAsc":
            return posts.slice().sort((a, b) => a.timestamp - b.timestamp);
        default:
            return posts.slice().sort((a, b) => b.timestamp - a.timestamp);
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.categories.category,
        sort: state.posts.sort,
        posts: sortPosts(state.posts.posts, state.posts.sort),
        postsError: state.posts.postsError,
        postsLoading: state.posts.postsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPosts: () => dispatch(fetchPostsData()),
        sortDateAsc: () => dispatch(postsSortByDateAsc()),
        sortDateDesc: () => dispatch(postsSortByDateDesc()),
        sortVoteAsc: () => dispatch(postsSortByVoteAsc()),
        sortVoteDesc: () => dispatch(postsSortByVoteDesc()),
        sortVoteSuccess: () => dispatch(postsSortBySuccess())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);