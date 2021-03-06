import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCommentCreate } from '../../actions/comments';

class CommentCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comment: {
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
            comment: {
                ...prevState.comment,
                [name]: value
            }
        }));
    }

    handleButtonCreate(event) {
        event.preventDefault();

        let commentObject = {
            ...this.state.comment,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            parentId: this.props.post.id,
            voteScore: 0,
            commentCount: 0
        }

        this.props.commentCreate(commentObject);

        this.setState({redirect: true});
    }

    render() {
        const { post } = this.props;
        const { redirect } = this.state;
    
        if (typeof post === typeof undefined || post === null) {
            return <Redirect to={'/'} />
        }

        //Redirecionar após cadastro.
        if (post !== null && redirect) {
            return <Redirect to={`/${post.category}/${post.id}`} />
        }

        return (
            <div className="readable-comments-form">

                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            Cadastrando um novo comentário na postagem 
                            <br/>
                            <span className="text-info">{post.title}</span>
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 my-2">
                        <button onClick={event => this.handleButtonCreate(event)} className="btn btn-lg btn-success">Cadastrar</button>
                    </div>
                </div>

                {
                    <form id="form-post-create" onSubmit={event => event.preventDefault()}>
                        <div className="form-row d-flex justify-content-center my-2">
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
        post: state.posts.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentCreate: (comment) => dispatch(fetchCommentCreate(comment))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreate);