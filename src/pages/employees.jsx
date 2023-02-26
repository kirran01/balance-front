import React from 'react';
import axios from 'axios';
import Preview from '../components/preview';
import { useState, useEffect } from 'react';

const Employees = () => {
    const [employees, setEmployees] = useState([])
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
    console.log(employees, 'e')
    return (
        <div className='flex flex-col items-center p-3'>
            <h1 className='text-3xl'>Employees</h1>
            <div>
                {
                    employees.map(e => {
                        return (
                            <Preview key={e._id} employee={e} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Employees;
