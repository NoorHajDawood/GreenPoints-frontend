import React, { useState, useRef } from 'react';
import plant from '../../Images/holding-plant.svg';
import classes from './Login.module.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { useNavigate } from "react-router-dom";
import AuthService from '../../Services/auth.service';

function Login(props) {
    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (value, callback) => {
        callback(value);
    }

    const checkRequired = value => {
        if (!value) {
            return (
                <div className={classes.invalidFeedback}>
                    This field is required!
                </div>
            )
        }
    };

    const checkEmail = value => {
        if (!isEmail(value)) {
            return (
                <div className={classes.invalidFeedback}>
                    This is not a valid email.
                </div>
            )
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(email, password).then(
                () => {
                    navigate('/');
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className={classes.container}>
            <Form
                onSubmit={handleLogin}
                ref={form}
            >
                <img src={plant} className={classes.img} />
                <h3 className={classes.h3}>Hello!</h3>
                <div className={classes.credentials}>
                    <Input type='email'
                        placeholder='E-mail'
                        className={classes.input}
                        validations={[checkRequired, checkEmail]}
                        name='email'
                        value={email}
                        onChange={(e) => handleChange(e.target.value, setEmail)}
                    />
                    <Input type='password'
                        placeholder='Password'
                        className={classes.input}
                        style={{ marginTop: '18px' }}
                        validations={[checkRequired]}
                        name='password'
                        value={password}
                        onChange={(e) => handleChange(e.target.value, setPassword)}
                    />
                    <a href='/map' className={classes.a}>Forgot Password?</a>
                </div>
                <div>
                    <button className={classes.login}>Log In</button>
                    <span className={classes.span}>OR</span>
                    <a href='/signup' className={classes.signup}>Sign Up</a>
                </div>
                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
    )
}

export default Login;