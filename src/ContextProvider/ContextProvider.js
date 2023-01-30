import React, { createContext, useEffect, useState } from 'react';

export const ContextBill = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [addeNewBill, setAddNewBill] = useState(false);

    useEffect(() => {
        const use = localStorage.getItem('user')
        if (use !== {}) {
            setUser(use)
            setLoading(false)
        }
    }, []);

    const userLogout = () => {
        setUser();
        localStorage.clear();
    };
    // user logOUt 

    const value = { user, setUser, userLogout, loading, addeNewBill, setAddNewBill }
    return (
        <ContextBill.Provider value={value}>
            {children}
        </ContextBill.Provider>
    );
};

export default ContextProvider;