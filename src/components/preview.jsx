import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Preview = ({ employee }) => {
    return (
        <div className='border-2 rounded-lg'>
            <Link className='flex' to={`/employee/${employee._id}`}>
                <div>
                    <AccountCircleIcon />
                </div>
                <div className='flex'>
                    <p className='mx-1'>{employee.firstName}</p>
                    <p className='mx-1'>{employee.lastName}</p>
                </div>
            </Link>
        </div>
    );
}

export default Preview;
