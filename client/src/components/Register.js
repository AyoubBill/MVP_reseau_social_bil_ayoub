import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Axios from 'axios';
import avatar from '../images/avatar.png';
import '../styles/Register.css';

const required = (value) => {
    if (!value) {
        return (
            <div className="register-message">
                Ce champ est obligatoire !
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="register-message">
                Ce n'est pas un email valide.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="register-message">
                Ce n'est pas un username valide.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="register-message">
                Ce n'est pas un password valide.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            Axios.post('http://localhost:3000/api/auth/signup', {
                username,
                email,
                password
            })
                .then(
                    (response) => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                    },
                    (error) => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();
                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                );
        }
    };
    return (
        <div className="register">
            <div className="register-picture"></div>
            <div className="register-container">
                <div className='register-avatar'>
                    <img src={avatar} alt='avatar' />
                </div>
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="register-component">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="register-input"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                />
                            </div>
                            <div className="register-component">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="register-input"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                />
                            </div>
                            <div className="register-component">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="register-input"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                />
                            </div>
                            <div className="register-component">
                                <button className="registerbtn">Sign Up</button>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div className="register-component">
                            <div className={successful ? "alert-success" : "alert-danger"}>
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

export default Register