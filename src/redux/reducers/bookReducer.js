import { GETALL_BOOK, DELETE_BOOK, UPDATE_BOOK, CREATE_BOOK } from '../actions/BookAction';
const INITIAL_STATE = {
    Book: { bookId: '', name: '', publicYear: '', publicCompany: '', categoryId: '', supplierId: '', price: '' },
    isLoading: false,
    BookOption: { key: '', value: '', label: '' }
};

const bookReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (action.type) {


        case GETALL_BOOK:
            return {
                //...state,
                Book: payload,
                // hidenForm: true,
                BookOption: payload.map((data) => {
                    return { key: data.bookId, value: data.bookId, label: data.name }
                })
            };

        case CREATE_BOOK:
            return {
                ...state,
                Book: payload,
                isLoading: true

            };
        case UPDATE_BOOK:
            console.log(payload)

            return {
                ...state,
                Book: payload,
                isLoading: true
            };
        case DELETE_BOOK:
            return {
                // ...state,
                isLoading: true
            }



        default: return state;

    }

};

export default bookReducer;