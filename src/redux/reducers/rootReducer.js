import { combineReducers } from 'redux';


import userReducer from './userReducer';
import supplierReducer from './supplierReducer';
import categoryReducer from './categoryReducer';
import bookReducer from './bookReducer';
import bookImportReducer from './bookImportReducer';


const rootReducer = combineReducers({

    user: userReducer,
    supplier: supplierReducer,
    category: categoryReducer,
    book: bookReducer,
    bookimport: bookImportReducer

});

export default rootReducer;