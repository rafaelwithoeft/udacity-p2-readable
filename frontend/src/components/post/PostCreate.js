import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPostCreate } from '../../actions/posts';

class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            category: this.props.match.params.category,
            post: {
                title: '',
                author: '',
                body: ''
            },
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

    onClickButtonCadastrar(event) {
        event.preventDefault();

        let postObject = {
            ...this.state.post,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            category: this.state.category,
            voteScore: 0,
            commentCount: 0
        }

        this.props.fetchPostCreate(postObject);

        this.setState({redirect: true});
    }

    render() {
        const { categories } = this.props;
        const { category, post, redirect } = this.state;
        
        //Redirecionar o usuário para a página inicial se a categoria for inválida ou as categorias não estiverem na store.
        const foundCategory = categories.find(element => element.name === category);
        if (typeof foundCategory === typeof undefined && (typeof categories === typeof undefined || categories.length === 0)) {
            return <Redirect to="/" />
        }

        //Redirecionar após cadastro.
        if (redirect) {
            return <Redirect to={`/${category}`} />
        }

        return (
            <div className="readable-posts-form">

                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            Cadastrando um novo post na categoria <span className="text-info">{category}</span>
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

                        <button onClick={event => this.onClickButtonCadastrar(event)} className="btn btn-success ml-2">Cadastrar</button>
                    </div>
                </div>

                {
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
        categories: state.categories.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostCreate: (postObject) => dispatch(fetchPostCreate(postObject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCreate);