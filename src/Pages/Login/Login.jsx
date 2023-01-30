import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ContextBill } from '../../ContextProvider/ContextProvider';

const Login = () => {

    const { setUser } = useContext(ContextBill);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handelLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        const user = {
            email,
            password
        };

        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    const logUser = data;
                    fetch('http://localhost:5000/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify(logUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('user', JSON.stringify(logUser));
                            setUser(logUser);
                            toast.success('Login Sucess');
                            navigate('/bill');
                        })
                }
                setMessage(data?.message);
            })


    };
    // user regisation and save to DB 

    return (
        <div className="lg:mt-24 mt-12">
            <div className="hero-content mx-auto">
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <p className='text-center text-2xl font-semibold mt-5'>Please Login</p>
                    <div className="card-body">
                        <form onSubmit={(event) => handelLogin(event)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <Link to='' className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <p className='text-center font-semibold text-red-500'>{message}</p>
                            <p className='text-center font-semibold'>You haven't an account <Link to='/registaion' className='text-success'>Register</Link></p>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;