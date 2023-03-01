import React from 'react';
import Createtable from '../components/createtable';
import Modal from 'react-modal';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import Prevtable from '../components/prevtable';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Oneemployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [extendEdit, setExtendEdit] = useState('')
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    const [employee, setEmployee] = useState({})
    const [tables, setTables] = useState([])
    const [show, setShow] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            borderRadius: '30px',
            transform: 'translate(-50%, -50%)',
            marginTop: '35px',
            zIndex: 1
        },
    }
    const handleExtendEdit = () => {
        if (extendEdit == '') {
            setExtendEdit('open')
        } else {
            setExtendEdit('')
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
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:3000/employee/edit-employee/${id}`, {
                [fieldToEdit]: userEditInput
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                console.log(res.data, 'rdedit')
                setExtendEdit('')
                setUserEditInput('')
                setFieldToEdit('')
            }
        } catch (err) {
            console.log(err)
        }
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
                <button className='p-2 bg-slate-100 rounded-lg m-2' onClick={handleExtendEdit}>Edit</button>
                {
                    extendEdit === 'open' &&
                    <div className='flex items-center justify-center flex-wrap m-2'>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={() => {
                            setExtendEdit('open-input')
                            setFieldToEdit('firstName')
                        }}>First Name</button>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={() => {
                            setExtendEdit('open-input')
                            setFieldToEdit('lastName')
                        }}>Last Name</button>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={() => {
                            setExtendEdit('open-input')
                            setFieldToEdit('email')
                        }}>Email</button>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={() => {
                            setExtendEdit('open-input')
                            setFieldToEdit('phone')
                        }}>Phone</button>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={() => {
                            setExtendEdit('open-input')
                            setFieldToEdit('image')
                        }}>Image</button>
                        <button className='p-2 bg-slate-50 rounded-md mx-1' onClick={openModal}>Delete</button>
                        <ClearIcon sx={{ padding: '2px', backgroundColor: 'gray' }} onClick={handleExtendEdit} />
                    </div>
                }
                {
                    extendEdit === 'open-input' &&
                    <form className='flex items-center' onSubmit={editEmployee}>
                        <input className='border-2 border-slate-100 rounded-lg m-2' type="text" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                        <button className='p-2 bg-slate-100 rounded-md'>Submit</button>
                        <div>
                            <ClearIcon style={{ cursor: 'pointer' }} onClick={handleExtendEdit} />
                        </div>
                    </form>
                }
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
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div className='flex flex-col items-center p-3'>
                    <p className='text-center'>Are you sure you want to delete {employee.firstName} {employee.lastName}?</p>
                    <button className='bg-red-300 hover:bg-red-400 p-2 rounded-lg m-2' onClick={deleteEmployee}>Yes, Delete</button>
                </div>
            </Modal>
        </div>
    );
}

export default Oneemployee;
