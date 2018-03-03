import React, { Component } from 'react';
import { connect } from 'react-redux';

import Alert from './../Alert';
import PostCard from './PostCard';
import CommentList from './../comments/CommentList';
import Loading from '../Loading';

import { fetchPostVoteAdd, fetchPostVoteRemove, fetchPostDelete, postLoading, postSuccess } from '../../actions/posts';

class PostDetail extends Component {
    componentDidMount() {
        this.props.getPost();
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
        const { post, postLoading } = this.props;

        return (
            <div className="readable-posts-form">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">
                            <u>
                                Visualizando uma postagem
                            </u>
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
                    typeof post !== typeof undefined && 
                    post !== null &&
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
        post: state.posts.post,
        postLoading: state.posts.postLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPost: (post) => {
            dispatch(postLoading(true));
            dispatch(postSuccess());
            dispatch(postLoading(false));
        },
        voteAdd: (post) => dispatch(fetchPostVoteAdd(post)),
        voteRemove: (post) => dispatch(fetchPostVoteRemove(post)),
        deletePost: (post) => dispatch(fetchPostDelete(post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);