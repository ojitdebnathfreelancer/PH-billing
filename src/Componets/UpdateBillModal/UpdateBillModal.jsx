import React, { useContext} from 'react';
import { toast } from 'react-hot-toast';
import { ContextBill } from '../../ContextProvider/ContextProvider';

const UpdateBillModal = ({ updateBill }) => {
    const { addeNewBill, setAddNewBill } = useContext(ContextBill);

    const handelUpdate = (event) => {
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

        fetch(`http://localhost:5000/update-billing/${updateBill._id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(bill)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Bill Updated');
                setAddNewBill(!addeNewBill)
            })
        // update bill 
    };
    // add new to DB 

    return (
        <div>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <p className='font-semibold text-center text-2xl capitalize'>Update your info</p>
                    <form onSubmit={event => handelUpdate(event)}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input defaultValue={updateBill.name} type="text" name='name' placeholder="Full Name" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" defaultValue={updateBill.email} name='email' placeholder="Email" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input defaultValue={updateBill.phone} type="number" name='number' placeholder="Number" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Payable Amount</span>
                            </label>
                            <input defaultValue={updateBill.billAmount} type="number" name='amount' placeholder="Amount" className="input input-bordered w-full" step={{ appearance: 'none' }} required />
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

export default UpdateBillModal;