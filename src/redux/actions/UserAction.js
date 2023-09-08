import { toast } from "react-toastify";
import { LoginUser, LogoutUser } from "../../services/UserService";
import Cookies from "universal-cookie";
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';
const cookies = new Cookies();
export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });
        let rs = await LoginUser(email, password);
        if (rs && rs.token) {
            cookies.set('jwt', rs.token);
            cookies.set('email', email);
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email, token: rs.token }

            })

        }
        else {
            if (rs.status == 400) {
                toast.error(rs.data.message);
            }
            dispatch(FETCH_USER_ERROR);
        }
    }
}
export const handleLogoutRedux = () => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT })
        cookies.remove('email');
        let rs = await LogoutUser();
    }
}
export const handleUserRefresh = () => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_REFRESH })
    }
}