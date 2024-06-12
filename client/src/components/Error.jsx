import React from 'react';

const Error = ({error}) => {
    return (
        <div className='error'>
            {`${error.message}` || 'ERROR'}
        </div>
    );
}

export default Error;
