import './account.scss';
import { Grid } from '@mui/material';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as accountService from '../../services/accountService';
import { storageToken } from '../../contants/storage';
import { accountData } from '../../context/DataProvider';
const initLogin = {
    username: '',
    password: '',
};
const initRegister = {
    name: '',
    username: '',
    password: '',
};
const Account = ({ setLogin }) => {
    //hook
    const [status, setStatus] = useState(true);
    const [loginInput, setLoginInput] = useState(initLogin);
    const [error, setError] = useState('');
    const { account, setAccount } = useContext(accountData);
    const navigate = useNavigate();
    useEffect(() => {
        if (status) {
            setLoginInput(initLogin);
        } else {
            setLoginInput(initRegister);
        }
    }, [status]);
    useEffect(() => {
        async function refresh() {
            const res = await accountService.refreshToken();
            if (res.isSuccess) {
                setLogin(true);
                setAccount({ username: res.data.username, name: res.data.name });
                storageToken(res);
                navigate('/');
            }
        }
        const refreshToken = sessionStorage.getItem('refreshToken');
        if (refreshToken) {
            refresh(refreshToken);
        }
    }, []);
    //handle
    const handleChangeSign = () => {
        setStatus((prev) => !prev);
    };
    const handleChangeInput = (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleLogin = async () => {
        try {
            const response = await accountService.signin(loginInput);
            if (response.isSuccess) {
                setLogin(true);
                setAccount({ username: response.data.username, name: response.data.name });
                storageToken(response);
                navigate('/');
            } else {
                setError('something is wrong');
            }
        } catch (error) {
            console.log(error);
            setError('something is wrong');
        }
    };
    const handleRegister = async () => {
        try {
            const response = await accountService.signup(loginInput);
            if (response.isSuccess) {
                setLoginInput(initLogin);
                setStatus(true);
            } else {
                setError('something is wrong');
            }
        } catch (error) {
            console.log(error);
            setError('something is wrong');
        }
    };
    return (
        <Grid container>
            <div className="account-container">
                <Grid item lg={6} sm={4} xs={12}>
                    <div className="banner">
                        <img
                            src="http://localhost:3000/BlogPost.jpg"
                            className="banner-sign"
                            alt="blog"
                        />
                    </div>
                </Grid>
                <Grid item lg={6} sm={8} xs={12} className="login-container">
                    {status ? (
                        <div className="login-group">
                            <h2>Login</h2>
                            <div className="group-input">
                                <label>Username</label>
                                <input
                                    className="login-input"
                                    placeholder="Type your username"
                                    name="username"
                                    value={loginInput.username}
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                            <div className="group-input">
                                <label>Password</label>
                                <input
                                    className="login-input"
                                    placeholder="Type your password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                            <p className="input-error">{error}</p>
                            <button onClick={(e) => handleLogin()} className="button bt-enter">
                                Enter
                            </button>
                            <button onClick={() => handleChangeSign()} className="button bt-change">
                                OR CREATE NEW ACCOUNT
                            </button>
                        </div>
                    ) : (
                        <div className="login-group">
                            <h2>Register</h2>
                            <div className="group-input">
                                <label>Your name</label>
                                <input
                                    className="login-input"
                                    placeholder="Type your name"
                                    name="name"
                                    onChange={(e) => handleChangeInput(e)}
                                    value={loginInput.name}
                                />
                            </div>
                            <div className="group-input">
                                <label>Username</label>
                                <input
                                    className="login-input"
                                    placeholder="Type your username"
                                    name="username"
                                    onChange={(e) => handleChangeInput(e)}
                                    value={loginInput.username}
                                />
                            </div>
                            <div className="group-input">
                                <label>Password</label>
                                <input
                                    className="login-input"
                                    placeholder="Type your password"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e) => handleChangeInput(e)}
                                />
                            </div>
                            <p className="input-error">{error}</p>
                            <button onClick={() => handleRegister()} className="button bt-enter">
                                Signup
                            </button>
                            <button onClick={() => handleChangeSign()} className="button bt-change">
                                Already account exist
                            </button>
                        </div>
                    )}
                </Grid>
            </div>
        </Grid>
    );
};

export default Account;
