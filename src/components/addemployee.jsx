import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Addemployee = ({ handleAddEmployee }) => {

    const [newEmployeeInput, setNewEmployeeInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        image: ''
    })

    const addEmployee = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:3000/employee/create-employee`, {
                firstName: newEmployeeInput.firstName,
                lastName: newEmployeeInput.lastName,
                email: newEmployeeInput.email,
                phone: newEmployeeInput.phone,
                image: newEmployeeInput.image
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                let newEmployee = res.data
                console.log(newEmployee, 'new employee')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleNewEmployeeInput = (e) => {
        setNewEmployeeInput({ ...newEmployeeInput, [e.target.name]: e.target.value })
    }
    return (
        <div className='m-2 border-2 rounded-lg p-5 flex flex-col items-center'>
            <form className='flex flex-col items-center' onSubmit={addEmployee}>
                <label>First Name</label>
                <input className='border-2' type="text" value={newEmployeeInput.firstName} onChange={handleNewEmployeeInput} name="firstName" />
                <label>Last Name</label>
                <input className='border-2' type="text" value={newEmployeeInput.lastName} onChange={handleNewEmployeeInput} name="lastName" />
                <label>Email</label>
                <input className='border-2' type="email" value={newEmployeeInput.email} onChange={handleNewEmployeeInput} name="email" />
                <label>Phone</label>
                <input className='border-2' type="number" value={newEmployeeInput.phone} onChange={handleNewEmployeeInput} name="phone" />
                <label>Image</label>
                <input className='border-2' type="text" value={newEmployeeInput.image} onChange={handleNewEmployeeInput} name="image" />
                <button className='bg-green-300 border-2 border-green-400 rounded-lg m-2 p-3'>Submit</button>
            </form>
            <button className='bg-red-300 border-2 border-red-400 p-1 rounded-lg' type="text" onClick={handleAddEmployee}>Cancel</button>
        </div>
    );
}

export default Addemployee;
