import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ContextBill } from '../../ContextProvider/ContextProvider';

const Registaion = () => {

    const { setUser } = useContext(ContextBill);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handelRegister = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {
            name,
            email,
            password
        };

        fetch('http://localhost:5000/registration', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    fetch('http://localhost:5000/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': "application/json"
                        },
                        body: JSON.stringify({ email: user.email })
                    })
                        .then(res => res.json())
                        .then((data) => {
                            localStorage.setItem('token', data.token);
                            localStorage.setItem('user', JSON.stringify(user));
                            setUser(user);
                            navigate('/bill');
                            toast.success('Registered Sucess');
                        })
                }
                setMessage(data?.message);
            })
    };
    // user regisation and save to DB 

    return (
        <div className="lg:mt-16 mt-8">
            <div className="hero-content mx-auto">
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <p className='text-center text-2xl font-semibold mt-5'>Please Registation</p>
                    <div className="card-body">
                        <form onSubmit={(event) => handelRegister(event)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Full Name" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password" className="input input-bordered" required/>
                            </div>
                            <p className='text-center font-bold text-red-500'>{message}</p>
                            <p className='text-center font-semibold'>You have an account <Link to='/login' className='text-success'>Login</Link></p>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Registation</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registaion;