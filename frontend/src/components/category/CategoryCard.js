import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { categorySuccess } from '../../actions/categories';

class CategoryCard extends Component {
    onClickCategory = (category) => {
        this.props.selectCategory(category);
    }

    render() {
        const { name, path, value, cardColor } = this.props;
        return (
            <Link
                className={"card box-shadow " + (cardColor ? cardColor : "bg-info")}
                to={{ pathname: path }}
                style={{ textDecorationLine: 'none' }}
                onClick={event => this.onClickCategory(value)}
            >
                <div className="card-body text-center">
                    <h2 className="card-title mb-0 text-white text-uppercase">{name}</h2>
                </div>
            </Link>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectCategory: (category) => dispatch(categorySuccess(category))
    };
};

export default connect(null, mapDispatchToProps)(CategoryCard);