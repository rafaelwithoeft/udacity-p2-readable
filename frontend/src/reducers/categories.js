import {
    CATEGORIES_LOADING, 
    CATEGORIES_ERROR, 
    CATEGORIES_SUCCESS, 
    CATEGORY_SUCCESS
} from '../actions/categories';

const categoriesInitialState = {
    categories: [],
    category: null,
    categoriesLoading: false,
    categoriesError: false
};

export default function categories(state = categoriesInitialState, action) {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                categoriesLoading: action.categoriesLoading
            }
        case CATEGORIES_ERROR:
            return {
                ...state,
                categoriesError: action.categoriesError
            }
        case CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.category
            }
        default:
            return state;
    }
}