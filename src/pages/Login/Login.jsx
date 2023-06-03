import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice'
import authServices from '../../services/authServices';
import Loader from '../../components/Loader/Loader';
import sweetAlerts from '../../helpers/sweetAlerts';
import "./Login.scss"

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }))
        console.log(loginData)
    }

    const loginInputs = [
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            value: loginData.email,
            required: true,
            onChange: handleChange
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            value: loginData.password,
            required: true,
            onChange: handleChange
        }
    ]

    async function login() {
        console.log(loginData.email)
        if ((loginData.email && loginData.password) === '') {
            sweetAlerts.error('Please fill all the fields');
            return;
        } else if (!loginData.email.includes('@')) {
            sweetAlerts.error('Email must be valid');
            return;
        }
        else if (loginData.password.length < 6) {
            sweetAlerts.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            const { data } = await authServices.login(loginData);
            setLoading(false);
            console.log(data)
            sweetAlerts.success('Login Success');
            dispatch(authActions.login(data))
            navigate('/');
        } catch (error) {
            setLoading(false);
            sweetAlerts.error(error.response.data.msg);
        }
        setLoading(false);
    }

    return (
        <>
            {loading && <Loader />}
            <div className="container">
                <div className='login-page'>
                    <h1 className="title">Login</h1>
                    <form className='col-1-columns'>
                        {loginInputs.map((input, index) => (
                            <div className='input-container' key={index}>
                                <label htmlFor={input.name}>{input.label}</label>
                                <input id={input.name} type={input.type} name={input.name} value={input.value} onChange={input.onChange} required={input.required} />
                            </div>
                        ))}
                        <button className='main-btn' type="button" onClick={(e) => { e.preventDefault(); login(); }}>Login</button>
                        <Link to='/register' className="second-btn">Sign Up</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
