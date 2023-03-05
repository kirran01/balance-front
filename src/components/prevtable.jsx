import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { deleteModel } from 'mongoose';

const Prevtable = ({ table, tables, setTables }) => {

    const [editMode, setEditMode] = useState(false)
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    const updateTable = async (e) => {
        e.preventDefualt()
        try {
            const res = await axios.put(`http://localhost:3000/tables/edit-table/${table._id}`, {
                [fieldToEdit]: userEditInput
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                let updatedTable = res.data
                console.log(updatedTable)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const deleteTable = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.delete(`http://localhost:3000/table/delete-table/${table._id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                const filteredTables = tables.filter(t => t._id !== table._id)
                setTables(filteredTables)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleEditMode = () => {
        if (editMode) {
            setEditMode(false)
        } else {
            setEditMode(true)
        }
    }
    const openInput = (str) => {
        if (editMode) {
            setFieldToEdit(str)
        }
    }

    return (
        <div className='flex flex-col border-2 border-slate-100 rounded-lg m-2 p-4'>
            <div className='flex justify-between p-2'>
                <button className='p-2 bg-slate-100 rounded-lg' onClick={deleteTable}>Delete</button>
                <button className={`p-2 ${!editMode ? `bg-slate-100` : `bg-yellow-500`} rounded-lg`} onClick={handleEditMode}>Edit</button>
            </div>
            <div className='flex'>
                <div className='m-2'>
                    <div className='flex'>
                        <p className='underline'>{new Date(table.createdOn).toDateString().substring(3)}</p>
                    </div>
                    <div className='flex'>
                        <p className='cursor-pointer' onClick={() => { openInput('regularEarnings') }}>Regular Earnings: </p>
                        <p className='text-green-500 ml-1'>{table.regularEarnings}</p>
                        {fieldToEdit === 'regularEarnings' && <form className='flex'>
                            <input placeholder={`regular earnings: ${table.regularEarnings}`} className='border-2 h-8 border-slate-100 rounded-lg' type="text" />
                            <button className='p-2 bg-slate-100' type="">Submit</button>
                            <button onClick={() => { setFieldToEdit('') }}>x</button>
                        </form>}
                    </div>
                    <div className='flex'>
                        <p>Overtime 1: </p>
                        <p className='text-green-500 ml-1'>{table.overtimeOne}</p>
                    </div>
                    <div className='flex'>
                        <p>Overtime 2: </p>
                        <p className='text-green-500 ml-1'>{table.overtimeTwo}</p>
                    </div>
                </div>
                <div className='m-2'>
                    <div className='flex'>
                        <p>Health Surcharge:</p>
                        <p className='text-red-400 ml-1'>{table.healthSurcharge}</p>
                    </div>
                    <div className='flex'>
                        <p>National Insurance:</p>
                        <p className='text-red-400 ml-1'>{table.nationalInsurance}</p>
                    </div>
                    <div className='flex'>
                        <p>Paye:</p>
                        <p className='text-red-400 ml-1'>{table.paye}</p>
                    </div>
                    <div className='flex'>
                        <p>Other:</p>
                        <p className='text-red-400 ml-1'>{table.other}</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Prevtable;
