import { toast } from "react-toastify";
import { getAll, create, update, deleteSp } from "../../services/BookServices";
export const CREATE_BOOK = "CREATE_BOOK";
export const GETALL_BOOK = "GETALL_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const getAllBook = () => {
    try {

        return async (dispatch, getState) => {
            const res = await getAll();

            dispatch({
                type: GETALL_BOOK,
                payload: res,

            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const addBook = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await create(data);
            toast.success("Thêm mới thành công")

            dispatch({
                type: CREATE_BOOK,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const deleteBook = (id) => {
    try {

        return async (dispatch, getState) => {
            const res = await deleteSp(id);
            toast.success("Đã xoá thành công")
            dispatch({
                type: DELETE_BOOK,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const updateBook = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await update(data);
            toast.success("Cập nhật thành công")
            dispatch({
                type: UPDATE_BOOK,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};