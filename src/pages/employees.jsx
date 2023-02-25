import React from 'react';
import axios from 'axios';
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
    return (
        <div>
            employees
        </div>
    );
}

export default Employees;
