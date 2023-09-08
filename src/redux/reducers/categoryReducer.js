import { GETALL_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, CREATE_CATEGORY } from '../actions/CategoryAction';
const INITIAL_STATE = {
    Category: { categoryId: '', categoryName: '', description: '' },
    isLoading: false,
    CategoryOption: { key: '', value: '', label: '' }
};

const categoryReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (action.type) {


        case GETALL_CATEGORY:
            return {
                //...state,
                Category: payload,
                CategoryOption: payload.map((data) => {
                    return { key: data.categoryId, value: data.categoryId, label: data.categoryName }
                })
            };

        case CREATE_CATEGORY:
            return {
                ...state,
                Category: payload,
                isLoading: true

            };
        case UPDATE_CATEGORY:

            return {
                ...state,
                Category: payload,
                isLoading: true
            };
        case DELETE_CATEGORY:
            return {
                // ...state,
                isLoading: true
            }



        default: return state;

    }

};

export default categoryReducer;