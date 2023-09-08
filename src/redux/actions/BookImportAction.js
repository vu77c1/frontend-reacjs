import { toast } from "react-toastify";
import { getAll, create, update, deleteSp } from "../../services/BookImportServices";
export const CREATE_BOOKIMPORT = "CREATE_BOOKIMPORT";
export const GETALL_BOOKIMPORT = "GETALL_BOOKIMPORT";
export const UPDATE_BOOKIMPORT = "UPDATE_BOOKIMPORT";
export const DELETE_BOOKIMPORT = "DELETE_BOOKIMPORT";
export const getAllBookImport = () => {
    try {

        return async (dispatch, getState) => {
            const res = await getAll();
            dispatch({
                type: GETALL_BOOKIMPORT,
                payload: res,

            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const addBookImport = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await create(data);
            toast.success("Thêm mới thành công")

            dispatch({
                type: CREATE_BOOKIMPORT,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const deleteBookImport = (id) => {
    try {

        return async (dispatch, getState) => {
            const res = await deleteSp(id);
            toast.success("Đã xoá thành công")
            dispatch({
                type: DELETE_BOOKIMPORT,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const updateBookImport = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await update(data);
            toast.success("Cập nhật thành công")
            dispatch({
                type: UPDATE_BOOKIMPORT,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};