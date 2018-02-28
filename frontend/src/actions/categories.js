import * as readableAPI from '../services/ReadableAPI';

export const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
export const CATEGORIES_ERROR = 'CATEGORIES_ERROR';
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS';
export const CATEGORY_SUCCESS = 'CATEGORY_SUCCESS';

export function categoriesError(bool) {
    return {
        type: CATEGORIES_ERROR,
        categoriesError: bool
    };
}

export function categoriesLoading(bool) {
    return {
        type: CATEGORIES_LOADING,
        categoriesLoading: bool
    };
}

export function categoriesSuccess(categories) {
    return {
        type: CATEGORIES_SUCCESS,
        categories
    };
}

export function categorySuccess(category) {
    return {
        type: CATEGORY_SUCCESS,
        category
    }
}

export function fetchCategoriesData() {
    return (dispatch) => {
        dispatch(categoriesLoading(true));

        readableAPI.getCategories()
            .then((response) => {
                dispatch(categoriesLoading(false));
                return response.json();
            })
            .then(categories => dispatch(categoriesSuccess(categories.categories)))
            .catch(error => dispatch(categoriesError(true)));
    };
}