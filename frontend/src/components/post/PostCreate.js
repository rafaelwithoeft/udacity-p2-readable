import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { categorySuccess } from '../../actions/categories'
import { fetchPostCreate } from '../../actions/posts';

class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            post: null,
            redirect: false,
        };
    }

    handleInputChange = event => {
        const target = event.target,
              value = target.value,
              name = target.name;
    
        this.setState(prevState => ({
            post: {
                ...prevState.post,
                [name]: value
            }
        }));
    }

    handleSubmitForm(event) {
        event.preventDefault();

        let postObject = {
            ...this.state.post,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            voteScore: 0,
            commentCount: 0
        }

        this.props.selectCategory(postObject.category);
        this.props.createPost(postObject);
        
        this.setState({
            redirect: true
        });
    }

    /** 
     * Definimos a categoria no objeto se já existir alguma selecionada no estado.
     * Evitando problemas caso ele não interaja com o input/select.
     */
    componentDidMount() {
        const { category } = this.props;
        if (typeof category !== typeof undefined && category !== null)  {
            this.setState(prevState => ({
                post: {
                    ...prevState.post,
                    category
                }
            }));
        }
    }

    render() {
        const { category, categories } = this.props;
        const { redirect, post } = this.state;

        //Redirecionar após cadastro.
        if (post !== null && redirect) {
            return <Redirect to={`/${post.category}`} />
        }

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            <u>Cadastrando um post</u>
                        </h1>
                    </div>
                </div>

                <form id="form-post-create" onSubmit={event => this.handleSubmitForm(event)}>
                    <div className="row mb-3">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <button type="submit" className="btn btn-lg btn-success">Cadastrar</button>
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
                                defaultValue={category ? category : ""}
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
                                onChange={event => this.handleInputChange(event)}
                            >
                            </textarea>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        category: state.categories.category,
        categories: state.categories.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(fetchPostCreate(post)),
        selectCategory: (category) => dispatch(categorySuccess(category))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);