import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const Preview = ({ employee }) => {
    return (
        <div className='border-2 rounded-lg'>
            <Link className='flex' to={'/employee/:id'}>
                <div>
                    <AccountCircleIcon />
                </div>
                <div className='flex'>
                    <p>firstname</p>
                    <p>lastname</p>
                </div>
            </Link>
        </div>
    );
}

export default Preview;
