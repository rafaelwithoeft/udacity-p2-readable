import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from './../Alert';

import { categorySuccess } from '../../actions/categories'
import { fetchPostUpdate, postLoading, postSuccess } from '../../actions/posts';
import Loading from '../Loading';

class PostUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        this.props.getPost(this.props.postSelected);
    }

    handleInputChange = event => {
        const target = event.target,
            value = target.value,
            name = target.name;

        this.props = {
            ...this.props,
            post: {
                ...this.props.post,
                timestamp: Date.now(),
                [name]: value,
            }
        }
    }

    handleSubmitForm(event) {
        event.preventDefault();

        this.props.selectCategory(this.props.post.category);
        this.props.updatePost(this.props.post);
        
        this.setState({
            redirect: true
        });
    }

    render() {
        const { categories, post, postLoading } = this.props;
        const { redirect } = this.state;

        //Redirecionar após atualizar
        if (post !== null && redirect) {
            return <Redirect to={`/${post.category}`} />
        }

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            <u>Atualização de um post</u>
                        </h1>
                    </div>
                </div>

                {
                    postLoading &&
                    <Loading />
                }

                {
                    !postLoading &&
                    (
                        typeof post === typeof undefined || 
                        post === null
                    ) &&
                    <Alert classAlert="alert-danger" message="Nenhuma postagem foi encontrada." />
                }
                {
                    !postLoading &&
                    (
                        typeof post !== typeof undefined &&
                        post !== null
                    ) &&
                    <form id="form-post-create" onSubmit={event => this.handleSubmitForm(event)}>
                        <div className="row mb-3">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <button type="submit" className="btn btn-lg btn-success">Atualizar</button>
                            </div>
                        </div>

                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="form-post-title">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    aria-describedby="title"
                                    placeholder="Título"
                                    autoFocus
                                    required
                                    defaultValue={post.title}
                                    onChange={event => this.handleInputChange(event)}
                                />
                            </div>
                        </div>
                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label htmlFor="form-post-author">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    placeholder="Autor"
                                    required
                                    defaultValue={post.author}
                                    onChange={event => this.handleInputChange(event)}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                <label className="form-label">Categoria &nbsp;</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    placeholder="Categoria"
                                    required
                                    defaultValue={post.category ? post.category : ""}
                                    onChange={event => this.handleInputChange(event)}
                                >
                                    <option value="" disabled>Selecione</option>
                                    {
                                        categories.map((element) => {
                                            return <option key={element.path} value={element.path}>{element.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-row d-flex justify-content-center my-2">
                            <div className="form-group col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <label htmlFor="form-post-body">Conteúdo</label>
                                <textarea
                                    className="form-control"
                                    name="body"
                                    rows="3"
                                    required
                                    defaultValue={post.body}
                                    onChange={event => this.handleInputChange(event)}
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
        posts: state.posts.posts,
        post: state.posts.post,
        postLoading: state.posts.postLoading,
        postSelected: state.posts.postSelected
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (post) => {
            dispatch(postLoading(true));
            dispatch(postSuccess());
            dispatch(postLoading(false));
        }, 
        updatePost: (post) => dispatch(fetchPostUpdate(post)),
        selectCategory: (category) => dispatch(categorySuccess(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostUpdate);