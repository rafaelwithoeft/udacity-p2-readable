import React, { Component } from 'react';
import { connect } from 'react-redux';

import CategoryCard from './CategoryCard';
import PostList from '../post/PostList';
import Alert from '../Alert';
import Loading from '../Loading';

import { fetchCategoriesData } from '../../actions/categories';

class CategoryList extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        let { categoriesLoading, categoriesError, categories } = this.props;
        return (
            <div className="readable-root">
                <div className="row mx-auto justify-content-center">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                        <h1 className="text-center text-uppercase font-weight-bold rounded box-shadow my-5">   
                            Categorias
                        </h1>
                    </div>
                    {
                        categoriesLoading && <Loading />
                    }
                    {
                        categoriesError &&
                        <Alert classAlert="alert-danger" message="Ocorreu um erro ao carregar as categorias..." />
                    }
                    {
                        !categoriesLoading &&
                        (typeof categories === typeof undefined || categories.length === 0) &&
                        <Alert classAlert="alert-danger" message="Nenhuma categoria foi encontrada." />
                    }

                    {
                        !categoriesLoading &&
                        categories.length > 0 &&
                        categories.map((category, index) => {
                            return (
                                <div key={category.path} className="ml-2 my-2 col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
                                    <CategoryCard key={category.path} path={category.path} name={category.name} />
                                </div>
                            )
                        })
                    }
                </div>
                <PostList />           
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        categoriesError: state.categories.categoriesError,
        categoriesLoading: state.categories.categoriesLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(fetchCategoriesData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);