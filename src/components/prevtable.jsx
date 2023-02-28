import React from 'react';

const Prevtable = ({ table }) => {
    return (
        <div className='flex border-2 border-slate-100 rounded-lg m-2 p-2'>
            <div className='m-2'>
                <div className='flex'>
                    <p>Date: </p>
                    <p>{new Date(table.createdOn).toDateString().substring(3)}</p>
                </div>
                <div className='flex'>
                    <p>Regular Earnings: </p>
                    <p>{table.regularEarnings}</p>
                </div>
                <div className='flex'>
                    <p>Overtime 1: </p>
                    <p>{table.overtimeOne}</p>
                </div>
                <div className='flex'>
                    <p>overtime 2: </p>
                    <p>{table.overtimeTwo}</p>
                </div>
            </div>
            <div className='m-2'>
                <div className='flex'>
                    <p>Health Surcharge: </p>
                    <p>{table.healthSurcharge}</p>
                </div>
                <div className='flex'>
                    <p>National Insurance: </p>
                    <p>{table.nationalInsurance}</p>
                </div>
                <div className='flex'>
                    <p>Paye: </p>
                    <p>{table.paye}</p>
                </div>
                <div className='flex'>
                    <p>Other: </p>
                    <p>{table.other}</p>
                </div>
            </div>
        </div>
    );
}

export default Prevtable;
