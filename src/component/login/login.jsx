import React, { useState } from 'react'//useEffect
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export default function LoginUser(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibleAlert, setVisibleAlert] = useState(false);
    const closeModal = () => setVisibleAlert(false);
    const handleSubmitLogin = (values) => {
        values.preventDefault();
        let param = new URLSearchParams()
        param.append('email', email)
        param.append('password', password)
        axios({
            method: "POST",
            url: "https://gestion-users-backend.herokuapp.com/user/loginUser",
            data: param
        }).then(res => {
            props.changeLogin(res.data);
            if (res.data === false) {
                setVisibleAlert(true);
            } else {
                localStorage.setItem('token', JSON.stringify(res.data.id));
            }
            setEmail(""); setPassword("");
        });
    };

    return (

        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleSubmitLogin}>
                    <Alert show={visibleAlert} variant="danger">Username or Password Incorrect </Alert>
                    <h3>Sign In</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" value={email} className={(visibleAlert) ? "form-control is-invalid" : "form-control"} onChange={(e) => { setEmail(e.target.value); setVisibleAlert(false); }} placeholder="email" required />
                        <div className="invalid-feedback">
                            Please choose a username.
                    </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setVisibleAlert(false); }} className={(visibleAlert) ? "form-control is-invalid" : "form-control"} placeholder="Password" required />
                        <div className="invalid-feedback">
                            Please choose a password.
                    </div>
                    </div>

                    <div className="form-group">
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        </div>

    )
}
