import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { ContextBill } from '../../ContextProvider/ContextProvider';

const NewBillModal = () => {
    const { addeNewBill, setAddNewBill } = useContext(ContextBill);

    const handelSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.number.value;
        const billAmount = form.amount.value;

        const bill = {
            name,
            email,
            phone,
            billAmount
        };

        fetch('http://localhost:5000/add-billing', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bill)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Bill Added Success');
                setAddNewBill(!addeNewBill);
                form.reset();
            })
    };
    // add new to DB 

    return (
        <div>
            <input type="checkbox" id="newBillModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="newBillModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <p className='font-semibold text-center text-2xl capitalize'>Add a new bill</p>
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="number" name='number' placeholder="Number" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Payable Amount</span>
                            </label>
                            <input type="number" name='amount' placeholder="Amount" className="input input-bordered w-full" step={{ appearance: 'none' }} required />
                        </div>
                        <div className='flex justify-center mt-5'>
                            <button type='submit' className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewBillModal;