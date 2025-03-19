import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";  

const BillingRecords = () => {
    const [bills, setBills] = useState([]);
    const [formData, setFormData] = useState({ name: "", contact: "", email: "", amount: "" });
    const [editingBillId, setEditingBillId] = useState(null);

    useEffect(() => {
        fetchBills();
    }, []);

    const fetchBills = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/get_bills");
            setBills(response.data);
        } catch (error) {
            console.error("Error fetching billing records:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addBill = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/add_bill", formData);
            fetchBills();
            setFormData({ name: "", contact: "", email: "", amount: "" });
        } catch (error) {
            console.error("Error adding bill:", error);
        }
    };

    const updateBill = async () => {
        if (!editingBillId) return;
        try {
            await axios.put(`http://127.0.0.1:5000/update_bill/${editingBillId}`, { amount: formData.amount });
            fetchBills();
            setFormData({ name: "", contact: "", email: "", amount: "" });
            setEditingBillId(null);
        } catch (error) {
            console.error("Error updating bill:", error);
        }
    };

    const deleteBill = async (billId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/delete_bill/${billId}`);
            fetchBills();
        } catch (error) {
            console.error("Error deleting bill:", error);
        }
    };

    return (
        <div className="container">
            <h2>Billing Records</h2>

            <form>
                <input type="text" name="name" placeholder="Customer Name" value={formData.name} onChange={handleChange} />
                <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} />
                
                {editingBillId ? (
                    <button type="button" className="update" onClick={updateBill}>Update</button>
                ) : (
                    <button type="button" className="add" onClick={addBill}>Add</button>
                )}
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Bill ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.length > 0 ? (
                        bills.map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.id}</td>
                                <td>{bill.name}</td>
                                <td>{bill.contact}</td>
                                <td>{bill.email}</td>
                                <td>{bill.amount}</td>
                                <td>{bill.date}</td>
                                <td>
                                    <button onClick={() => { setEditingBillId(bill.id); setFormData({ amount: bill.amount }); }} className="update">Edit</button>
                                    <button onClick={() => deleteBill(bill.id)} className="delete">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BillingRecords;
