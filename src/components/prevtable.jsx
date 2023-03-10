import React from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { deleteModel } from 'mongoose';

const Prevtable = ({ table, tables, setTables, i }) => {

    const [editMode, setEditMode] = useState(false)
    const [fieldToEdit, setFieldToEdit] = useState('')
    const [userEditInput, setUserEditInput] = useState('')
    const updateTable = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:3000/table/update-table/${table._id}`, {
                [fieldToEdit]: i == 0 ? userEditInput : userEditInput - tables[i - 1][fieldToEdit]
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (res) {
                let updatedTable = res.data
                console.log(updatedTable)
                let updatedTables = tables.map(t => {
                    if (t._id === updatedTable._id) {
                        return updatedTable
                    } else {
                        return t
                    }
                })
                setTables(updatedTables)
                closeEdit()
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
    const openInput = (str) => {
        if (editMode) {
            setFieldToEdit(str)
        }
    }
    const closeEdit = () => {
        setUserEditInput('')
        setFieldToEdit('')
        setEditMode(false)
    }
    const handleEditMode = () => {
        if (editMode) {
            closeEdit()
            setEditMode(false)
        } else {
            setEditMode(true)
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
                        {
                            fieldToEdit !== 'regularEarnings' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('regularEarnings') }}>Regular Earnings: </p>
                                <p className='text-green-500 ml-1'>{table.regularEarnings}</p>
                            </>
                        }
                        {
                            fieldToEdit === 'regularEarnings' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Regular Earnings: ${table.regularEarnings}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'overtimeOne' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('overtimeOne') }}>Overtime 1: </p>
                                <p className='text-green-500 ml-1'>{table.overtimeOne}</p>
                            </>
                        }

                        {
                            fieldToEdit === 'overtimeOne' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Overtime 1: ${table.overtimeOne}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'overtimeTwo' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('overtimeTwo') }}>Overtime 2: </p>
                                <p className='text-green-500 ml-1'>{table.overtimeTwo}</p>
                            </>
                        }
                        {
                            fieldToEdit === 'overtimeTwo' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Overtime 2: ${table.overtimeTwo}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                </div>
                <div className='m-2'>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'healthSurcharge' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('healthSurcharge') }}>Health Surcharge:</p>
                                <p className='text-red-400 ml-1'>{table.healthSurcharge}</p>
                            </>
                        }
                        {
                            fieldToEdit === 'healthSurcharge' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Health Surcharge: ${table.healthSurcharge}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'nationalInsurance' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('nationalInsurance') }} >National Insurance:</p>
                                <p className='text-red-400 ml-1'>{table.nationalInsurance}</p>
                            </>
                        }
                        {
                            fieldToEdit === 'nationalInsurance' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`National Insurance: ${table.nationalInsurance}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'paye' && <>
                                <p className='cursor-pointer' onClick={() => { openInput('paye') }} >Paye:</p>
                                <p className='text-red-400 ml-1'>{table.paye}</p>
                            </>
                        }

                        {
                            fieldToEdit === 'paye' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Paye: ${table.paye}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                    <div className='flex'>
                        {
                            fieldToEdit !== 'other' &&
                            <>
                                <p p className='cursor-pointer' onClick={() => { openInput('other') }}>Other:</p>
                                <p className='text-red-400 ml-1'>{table.other}</p>
                            </>
                        }
                        {
                            fieldToEdit === 'other' &&
                            <form className='flex' onSubmit={updateTable}>
                                <input placeholder={`Other: ${table.other}`} className='border-2 h-8 border-slate-100 rounded-lg' type="number" value={userEditInput} onChange={(e) => { setUserEditInput(e.target.value) }} />
                                <button className='m-1' type="submit">???</button>
                                <button className='m-1' onClick={closeEdit}>???</button>
                            </form>
                        }
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Prevtable;
