import { toast } from "react-toastify";
import { getAll, create, update, deleteSp } from "../../services/SupplierServices";
export const CREATE_SUPPLIER = "CREATE_SUPPLIER";
export const GETALL_SUPPLIER = "GETALL_SUPPLIER";
export const UPDATE_SUPPLIER = "UPDATE_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";
export const getAllSupplier = () => {
    try {

        return async (dispatch, getState) => {
            const res = await getAll();

            dispatch({
                type: GETALL_SUPPLIER,
                payload: res,

            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const addSupplier = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await create(data);
            toast.success("Thêm mới thành công")

            dispatch({
                type: CREATE_SUPPLIER,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const deleteSupplier = (id) => {
    try {

        return async (dispatch, getState) => {
            const res = await deleteSp(id);
            toast.success("Đã xoá thành công")
            dispatch({
                type: DELETE_SUPPLIER,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const updateSupplier = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await update(data);
            toast.success("Cập nhật thành công")
            dispatch({
                type: UPDATE_SUPPLIER,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};