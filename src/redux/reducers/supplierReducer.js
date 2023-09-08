import { GETALL_SUPPLIER, DELETE_SUPPLIER, UPDATE_SUPPLIER, CREATE_SUPPLIER } from '../actions/SupplierAction';
const INITIAL_STATE = {
    Supplier: { supplierId: '', supplierName: '', address: '', taxCode: '', email: '', phone: '' },
    isLoading: false,
    SupplierOption: { key: '', value: '', label: '' }
};

const supplierReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (action.type) {


        case GETALL_SUPPLIER:
            return {
                //...state,
                Supplier: payload,
                SupplierOption: payload.map((data) => {
                    return { key: data.supplierId, value: data.supplierId, label: data.supplierName }
                })
            };

        case CREATE_SUPPLIER:
            return {
                ...state,
                Supplier: payload,
                isLoading: true

            };
        case UPDATE_SUPPLIER:

            return {
                ...state,
                Supplier: payload,
                isLoading: true
            };
        case DELETE_SUPPLIER:
            return {
                // ...state,
                isLoading: true
            }



        default: return state;

    }

};

export default supplierReducer;