import { toast } from "react-toastify";
import { getAll, create, update, deleteSp } from "../../services/CategoryServices";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const GETALL_CATEGORY = "GETALL_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const getAllCategory = () => {
    try {

        return async (dispatch, getState) => {
            const res = await getAll();

            dispatch({
                type: GETALL_CATEGORY,
                payload: res,

            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const addCategory = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await create(data);
            toast.success("Thêm mới thành công")

            dispatch({
                type: CREATE_CATEGORY,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const deleteCategory = (id) => {
    try {

        return async (dispatch, getState) => {
            const res = await deleteSp(id);
            toast.success("Đã xoá thành công")
            dispatch({
                type: DELETE_CATEGORY,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};
export const updateCategory = (data) => {
    try {

        return async (dispatch, getState) => {
            const res = await update(data);
            toast.success("Cập nhật thành công")
            dispatch({
                type: UPDATE_CATEGORY,
                payload: res,
            })
        }

    } catch (err) {
        console.log(err);
    }
};