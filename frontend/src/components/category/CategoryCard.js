import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = (props) => (
    <Link 
        className="card box-shadow bg-info" 
        to={{ pathname: `/${props.path}` }}
        style={{textDecorationLine: 'none'}}
    >
        <div className="card-body text-center">
            <h2 className="card-title mb-0 text-white text-uppercase">{props.name}</h2>
        </div>
    </Link>
);

export default CategoryCard;