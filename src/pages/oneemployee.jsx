import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Oneemployee = () => {
    const [tableInput, setTableInput] = useState({
        regularEarnings: null,
        overTime1: null,
        overTime2: null,
        paye: null,
        nationalInsurance: null,
        healthSurcharge: null,
        other: null
    })
    const handleTableInput = (e) => {
        setTableInput({ ...tableInput, [e.target.name]: e.target.value })
    }
    return (
        <div className='flex flex-col items-center p-3'>
            <div>
                <img src="" alt="img" />
            </div>
            <div>
                <div>
                    <p className='text-center text-2xl'>first name</p>
                    <p className='text-center text-2xl'>last name</p>
                </div>
                <div>
                    <p className='text-center text-md'>email</p>
                    <p className='text-center text-md'>phone</p>
                </div>
            </div>
            <div>
                <button className='p-2 bg-slate-100 rounded-lg'>New Table</button>
            </div>
            <div>
                <p>tables</p>
            </div>
            <div>
                <form className='flex items-center flex-col border-2 rounded-lg'>
                    <div className='flex'>
                        <div className='flex flex-col items-center m-2'>
                            <label>Regular Earnings</label>
                            <input className='border-2' type="number" value={tableInput.regularEarnings} name="regularEarnings" onChange={handleTableInput} />
                            <label>Overtime 1</label>
                            <input className='border-2' type="number" value={tableInput.overTime1} name="overTime1" onChange={handleTableInput} />
                            <label>Overtime 2</label>
                            <input className='border-2' type="number" value={tableInput.overTime2} name="overTime2" onChange={handleTableInput} />
                        </div>
                        <div className='flex flex-col items-center m-2'>
                            <label>Paye</label>
                            <input className='border-2' type="number" value={tableInput.paye} name="paye" onChange={handleTableInput} />
                            <label>National Insurance</label>
                            <input className='border-2' type="number" value={tableInput.nationalInsurance} name="nationalInsurance" onChange={handleTableInput} />
                            <label>Health Surcharge</label>
                            <input className='border-2' type="number" value={tableInput.healthSurcharge} name="healthSurcharge" onChange={handleTableInput} />
                            <label>Other</label>
                            <input className='border-2' type="number" value={tableInput.other} name="other" onChange={handleTableInput} />
                        </div>
                    </div>
                    <button className='p-2 bg-slate-100 rounded-lg m-2'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Oneemployee;
