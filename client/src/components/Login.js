import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import '../styles/Login.css';
import AuthService from "../services/auth.service";
import avatar from '../images/avatar.png';

const required = (value) => {
    if (!value) {
        return (
            <div className="login-message" >
                Ce champ est obligatoire !
            </div>
        );
    }
};

const Login = () => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            );
        }
    };

    return (
        <div className="login">
            <div className="login-picture"></div>
            <div className="login-container">
                <div className='login-avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="login-component">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            className="login-input"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                        />
                    </div>
                    <div className="login-component">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="login-input"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="login-component">
                        <button className="loginbtn">
                            <span>Login</span>
                        </button>
                    </div>
                    {message && (
                        <div className="login-component">
                            <div className="login-message" >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Login