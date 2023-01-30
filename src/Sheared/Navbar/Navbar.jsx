import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { ContextBill } from '../../ContextProvider/ContextProvider';

const Navbar = () => {
    const { user, userLogout } = useContext(ContextBill);
    const navigate = useNavigate();

    const logOut = () => {
        userLogout();
        navigate('/');
    };

    const menuItmes = <>
        {
            !user &&
            <>
                <li className='font-bold'><Link to='/registaion'>Registation</Link></li>
                <li className='font-bold'><Link to='/'>Login</Link></li>
            </>
        }
        {
            user &&
            <>
                <li className='font-bold'><Link to='/bill'>Bill</Link></li>
                <li className='font-bold' onClick={() => logOut()}><button>LogOut</button></li>
                <li className='font-bold h-full'>{user?.name}</li>
            </>
        }
    </>
    return (
        <div className='container'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn pl-0 btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItmes}
                        </ul>
                    </div>
                    <img className='h-[45px]' src={logo} alt="logo" />
                    <span className='lg:block font-semibold hidden'>Power-Hack</span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {menuItmes}
                    </ul>
                </div>
                <div className="navbar-end">
                    <span className='font-bold'>Total Paid 200$</span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;