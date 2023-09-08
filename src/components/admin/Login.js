import React, { useEffect, useState } from 'react'
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { handleLoginRedux } from '../../redux/actions/UserAction'
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isshowpassword, setIshowpassword] = useState(false);
    const [validationMsg, setValidationMsg] = useState("");
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const dispatch = useDispatch();

    useEffect(() => {
        if (account && account.auth === true) {
            navigate('/')

        }
    }, [account])
    const validateAll = () => {
        const msg = {};
        if (validator.isEmpty(email)) {
            msg.email = 'please input your Email';

        }
        else if (!validator.isEmail(email)) {

            msg.email = 'Your email incorrect';
        }
        if (validator.isEmpty(password)) {
            msg.password = 'please input your password ';

        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    }

    const handleGoback = () => {
        navigate('/');
    }
    const handlePassWord = (e) => {
        if (e && e.key === 'Enter') {
            handleLogin();
        }
    }
    const handleLogin = async () => {
        const valid = validateAll();
        if (!valid) {
            return;
        }
        else {

            dispatch(handleLoginRedux(email, password));
        }
    }
    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text'>Email</div>
            <input type='text' placeholder='Email....'
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <p className='text-danger'>{validationMsg.email}</p>
            <div className='input-2'>
                <input type={isshowpassword === false ? 'password' : 'text'} placeholder='Password...'
                    value={password} onKeyDown={(e) => handlePassWord(e)} onChange={(e) => setPassword(e.target.value)}
                />
                <p className='text-danger'>{validationMsg.password}</p>
                <i className={isshowpassword === false ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}
                    onClick={() => setIshowpassword(!isshowpassword)}></i>
            </div>
            <button className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}

            >{isLoading && <i className="fas fa-sync fa-spin"></i>}{' '}Login</button>
            <div className='back'>
                <i className="fa-solid fa-angles-left"></i> <span onClick={() => handleGoback()}>Go back</span>
            </div>



        </div>
    )
}
