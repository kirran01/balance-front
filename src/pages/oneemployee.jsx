import React from 'react';
import Createtable from '../components/createtable';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import Prevtable from '../components/prevtable';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Oneemployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({})
    const [tables, setTables] = useState([])
    const [show, setShow] = useState('')
    const { id } = useParams();
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/employee/get-employees`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                if (res) {
                    let allEmployees = res.data
                    let thisEmployee = allEmployees.filter(e => e._id === id)
                    setEmployee(thisEmployee[0])
                }
            } catch (err) {
                console.log(err)
            }
        }
        getEmployees()
    }, [])
    useEffect(() => {
        const getTables = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/table/get-tables`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                if (res) {
                    const allTables = res.data
                    const thisEmployeesTables = allTables.filter(t => t.employee === id)
                    setTables(thisEmployeesTables)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getTables()
    }, [])
    const editEmployee = async (e) => {
    }
    const deleteEmployee = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3000/employee/delete-employee/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                console.log('deleted')
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='flex flex-col items-center p-3'>
            {
                employee.image ?
                    <div>
                        <img className="w-32 h-32 object-cover rounded-full" src={employee.image} alt="img" />
                    </div>
                    :
                    <div>
                        <AccountCircleIcon sx={{ fontSize: 120 }} />
                    </div>
            }
            <div>
                <div className='m-2'>
                    <p className='text-center text-2xl'>{employee.firstName}</p>
                    <p className='text-center text-2xl'>{employee.lastName}</p>
                </div>
                <div className='m-2'>
                    <p className='text-center text-md'>{employee.email}</p>
                    <p className='text-center text-md'>{employee.phone}</p>
                </div>
            </div>
            <div className='flex items-center flex-col'>
                <button className='p-2 bg-slate-100 rounded-lg m-2' type="">Edit</button>
                <div>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>First Name</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>Last Name</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>Email</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>Phone</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>Image</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={deleteEmployee}>Delete</button>
                    <button className='p-2 bg-slate-50 rounded-md mx-1'>Cancel</button>
                </div>
            </div>
            <div>
                <button className='p-2 bg-slate-100 rounded-lg' onClick={() => { setShow('create-table') }}>New Table</button>
            </div>
            {
                show === 'create-table' &&
                <div>
                    <Createtable setShow={setShow} id={id} />
                </div>
            }
            <div>
                {
                    tables.map(t => {
                        return (
                            <Prevtable key={t._id} table={t} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Oneemployee;
