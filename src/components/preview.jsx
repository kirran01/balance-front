import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Preview = ({ employee }) => {
    return (
        <div className='border-2 rounded-lg m-3'>
            <Link className='flex items-center' to={`/employee/${employee._id}`}>
                <div>
                    <AccountCircleIcon />
                </div>
                <div className='flex'>
                    <p className='mx-1'>{employee.firstName} {employee.lastName}</p>
                </div>
            </Link>
        </div>
    );
}

export default Preview;
