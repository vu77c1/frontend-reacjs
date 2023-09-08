import { FETCH_USER_ERROR, FETCH_USER_LOGIN, FETCH_USER_SUCCESS, USER_LOGOUT, USER_REFRESH } from '../actions/UserAction';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const INITIAL_STATE = {

    account: { email: '', auth: false, token: '' },
    isLoading: false,
    isError: false
};

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FETCH_USER_LOGIN:

            return {

                ...state,
                isLoading: true,
                isError: false

            };

        case FETCH_USER_SUCCESS:
            console.log("check>>>", action)

            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                isError: false


            };
        case FETCH_USER_ERROR:

            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true


            };
        case USER_LOGOUT:
            return {
                ...state,
                account: { email: '', auth: false, token: '' }

            };
        case USER_REFRESH:
            return {
                ...state,
                account: {
                    email: cookies.get('email'), auth: true, token: cookies.get('jwt')

                }

            }


        default: return state;

    }

};

export default userReducer;