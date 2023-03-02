import React from 'react';

const Prevtable = ({ table }) => {
    return (
        <div className='flex border-2 border-slate-100 rounded-lg m-2 p-2'>
            <div className='m-2'>
                <div className='flex'>
                    <p className='underline'>{new Date(table.createdOn).toDateString().substring(3)}</p>
                </div>
                <div className='flex'>
                    <p>Regular Earnings: </p>
                    <p className='text-green-500 ml-1'>{table.regularEarnings}</p>
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
    );
}

export default Prevtable;
