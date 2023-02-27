import React from 'react';
import axios from 'axios';
import Preview from '../components/preview';
import { useState, useEffect } from 'react';

const Employees = () => {
    const [employees, setEmployees] = useState([])

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
    const [show, setShow] = useState('')

    const handleAddEmployee = () => {
        if (show === '') {
            setShow('add-employee')
        } else {
            setShow('')
        }
    }

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/employee/get-employees`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                if (res) {
                    const gotEmployees = res.data
                    setEmployees(gotEmployees)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getEmployees()
    }, [])

    return (
        <div className='flex flex-col items-center p-3'>
            <p className='text-4xl m-5'>Employees</p>
            <div className='m-2'>
                <button className='p-2 bg-slate-100 rounded-lg' onClick={handleAddEmployee}>Add New Employee</button>
            </div>
            {show === 'add-employee' && <div className='m-2 border-2 rounded-lg p-5 flex flex-col items-center'>
                <form className='flex flex-col items-center' onSubmit={addEmployee}>
                    <label>First Name</label>
                    <input className='border-2' type="text" value={newEmployeeInput.firstName} onChange={handleNewEmployeeInput} name="firstName" />
                    <label>Last Name</label>
                    <input className='border-2' type="text" value={newEmployeeInput.lastName} onChange={handleNewEmployeeInput} name="lastName" />
                    <label>Email</label>
                    <input className='border-2' type="text" value={newEmployeeInput.email} onChange={handleNewEmployeeInput} name="email" />
                    <label>Phone</label>
                    <input className='border-2' type="text" value={newEmployeeInput.phone} onChange={handleNewEmployeeInput} name="phone" />
                    <label>Image</label>
                    <input className='border-2' type="text" value={newEmployeeInput.image} onChange={handleNewEmployeeInput} name="image" />
                    <button className='bg-green-300 border-2 border-green-400 rounded-lg m-2 p-3'>Submit</button>
                </form>
                <button className='bg-red-300 border-2 border-red-400 p-1 rounded-lg' type="text" onClick={handleAddEmployee}>Cancel</button>
            </div>}
            <div>
                {
                    employees.map(e => {
                        return (
                            <Preview key={e._id} employee={e} />
                        )
                    })
                }
            </div>
        </div >
    );
}

export default Employees;
