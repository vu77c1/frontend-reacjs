import { GETALL_BOOKIMPORT, DELETE_BOOKIMPORT, UPDATE_BOOKIMPORT, CREATE_BOOKIMPORT } from '../actions/BookImportAction';
const INITIAL_STATE = {
    BookImport: { bookImportId: '', categoryId: '', categoryName: '', quantity: '', price: '' },
    isLoading: false,
};

const bookImportReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (action.type) {


        case GETALL_BOOKIMPORT:
            return {
                //...state,
                BookImport: payload,
                hidenForm: true
            };

        case CREATE_BOOKIMPORT:

            return {
                ...state,
                BookImport: payload,
                isLoading: true

            };
        case UPDATE_BOOKIMPORT:
            return {
                ...state,
                BookImport: payload,
                isLoading: true
            };
        case DELETE_BOOKIMPORT:
            return {
                // ...state,
                isLoading: true
            }



        default: return state;

    }

};

export default bookImportReducer;