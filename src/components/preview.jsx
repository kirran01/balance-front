import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Preview = ({ employee }) => {
    return (
        <div className='border-2 rounded-lg m-3 p-2'>
            <Link className='flex items-center' to={`/employee/${employee._id}`}>
            {
                employee.image ?
                    <div>
                        <img className="w-8 h-8 object-cover rounded-full border-black border-2" src={employee.image} alt="img" />
                    </div>
                    :
                    <div>
                        <AccountCircleIcon sx={{fontSize:'32px'}}/>
                    </div>
            }
                <div className='flex'>
                    <p className='mx-1'>{employee.firstName} {employee.lastName}</p>
                </div>
            </Link>
        </div>
    );
}

export default Preview;
