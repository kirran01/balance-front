import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Createtable = ({ setShow, id, tables, setTables }) => {
  const [tableInput, setTableInput] = useState({
    regularEarnings: '',
    overtimeOne: '',
    overtimeTwo: '',
    paye: '',
    nationalInsurance: '',
    healthSurcharge: '',
    other: ''
  })
  const handleTableInput = (e) => {
    setTableInput({ ...tableInput, [e.target.name]: e.target.value })
  }

  const createTable = async (e) => {
    e.preventDefault();
    const { regularEarnings, overtimeOne, overtimeTwo, paye, nationalInsurance, healthSurcharge, other } = tableInput
    try {
      const res = await axios.post(
        `http://localhost:3000/table/create-table/${id}`,
        {
          regularEarnings,
          overtimeOne,
          overtimeTwo,
          paye,
          nationalInsurance,
          healthSurcharge,
          other
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res) {
        let newTable = res.data;
        setTables([...tables, newTable]);
        setTableInput({
          regularEarnings: "",
          overtimeOne: "",
          overtimeTwo: "",
          paye: "",
          nationalInsurance: "",
          healthSurcharge: "",
          other: "",
        });
        setShow("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='m-2'>
      <form className='flex items-center flex-col border-2 rounded-lg' onSubmit={createTable}>
        <div className='flex'>
          <div className='flex flex-col items-center m-2'>
            <label>Regular Earnings</label>
            <input className='border-2' type="number" value={tableInput.regularEarnings} name="regularEarnings" onChange={handleTableInput} />
            <label>Overtime 1</label>
            <input className='border-2' type="number" value={tableInput.overtimeOne} name="overtimeOne" onChange={handleTableInput} />
            <label>Overtime 2</label>
            <input className='border-2' type="number" value={tableInput.overtimeTwo} name="overtimeTwo" onChange={handleTableInput} />
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
        <div>
          <button className='p-2 bg-slate-100 rounded-lg m-2' type='submit'>Submit</button>
          <button className='p-2 bg-slate-100 rounded-lg m-2' onClick={() => { setShow('') }}>Cancel</button>
        </div>
      </form>

    </div>
  );
}

export default Createtable;
