import React from 'react';
import axios from 'axios';
import Preview from '../components/preview';
import { useState, useEffect } from 'react';
import Addemployee from '../components/addemployee';

const Employees = ({ employees, updateSearch, searchEmployees, getEmployees }) => {
    const [show, setShow] = useState('')
    const handleAddEmployee = () => {
        if (show === '') {
            setShow('add-employee')
        } else {
            setShow('')
        }
    }
    const implementSearch = (e) => {
        const newEmployeeList = employees.filter(emp => {
            return emp.firstName.toLowerCase().includes(e.target.value.toLowerCase())
        })
        updateSearch(newEmployeeList)
    }
    useEffect(() => {
        getEmployees()
    }, [])
    return (
        <div className='flex flex-col items-center p-3'>
            <p className='text-4xl m-5'>Employees</p>
            <input className='border-2 border-slate-100 m-2' type="text" placeholder='Search' onChange={implementSearch} />
            <div className='m-2'>
                <button className='p-2 bg-slate-100 hover:bg-slate-200 rounded-lg border-2 m-2' onClick={handleAddEmployee}>Add New Employee</button>
            </div>
            {
                show === 'add-employee' &&
                <Addemployee handleAddEmployee={handleAddEmployee} />
            }
            <div>
                {
                    searchEmployees.map(e => {
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
