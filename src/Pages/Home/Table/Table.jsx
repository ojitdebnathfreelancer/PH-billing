import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import NewBillModal from '../../../Componets/NewBillModal/NewBillModal';
import UpdateBillModal from '../../../Componets/UpdateBillModal/UpdateBillModal';
import { ContextBill } from '../../../ContextProvider/ContextProvider';
import './Table.css';

const Table = () => {
    const [bills, setBills] = useState([]);
    const { addeNewBill, setAddNewBill } = useContext(ContextBill);
    const [updateBill, setUpdateBill] = useState({});
    const [dataLoader, setDataLoader] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const pages = Math.ceil(count / 10);

    useEffect(() => {
        fetch(`http://localhost:5000/billing-list?keyword=${keyword}&page=${page}&size=${10}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setBills(data.bills);
                setCount(data.totalBill)
                setDataLoader(false);
            })
    }, [addeNewBill, keyword, page]);
    // get all bills from DB 

    const handelDelete = id => {
        const confirm = window.confirm("Are you want to delete");
        if (confirm) {
            fetch(`http://localhost:5000/delete-billing/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then(res => res.json())
                .then(() => {
                    toast.success("Bill Deleted Success");
                    setAddNewBill(!addeNewBill);
                })
        }
    };
    // delete bill from DB 

    return (
        <>
            {
                dataLoader ?
                    <div className='flex justify-center items-center min-h-screen'>
                        <p className='font-bold text-center'>Loadding ...</p>
                    </div>
                    :
                    <div>
                        <div className='container'>
                            <div className='search-header'>
                                <input onChange={(event) => setKeyword(event.target.value)} style={{ outline: 'none', border: 'none', padding: '5px 10px' }} type='search' placeholder='Search'></input>

                                <label style={{ background: 'black', color: 'white', textTransform: 'capitalize', padding: '0px 10px', cursor: 'pointer' }} htmlFor="newBillModal" className="btn">Add New Bill</label>
                            </div>
                            <NewBillModal></NewBillModal>
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>Billing ID</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Paid Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bills.map((bill) => <tr key={bill._id}>
                                                <th>{bill?._id}</th>
                                                <td>{bill?.name}</td>
                                                <td>{bill?.email}</td>
                                                <td>{bill?.phone}</td>
                                                <td>{bill?.billAmount}$</td>
                                                <td>
                                                    <label onClick={() => setUpdateBill(bill)} className='cursor-pointer' htmlFor="update-modal">Edit</label>
                                                    <button onClick={() => handelDelete(bill._id)} className='ml-5'>Delete</button>
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <UpdateBillModal updateBill={updateBill}></UpdateBillModal>
                            <div className='flex justify-center mt-10'>
                                <div className="btn-group">
                                    {[...Array(pages).keys()].map((number) => (
                                        <button
                                            key={number}
                                            className={`btn ${page === number ? "active" : ""}`}
                                            onClick={() => setPage(number)}
                                        >
                                            {number + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Table;