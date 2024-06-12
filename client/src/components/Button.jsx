import React from 'react';

const Button = ({
    children,
    type = 'submit',
    textColor = 'black',
    bgColor = 'white',
    ...props
}) => {
    return (
        <button
            style={{
                color: textColor,
                backgroundColor: bgColor,
            }}
            type={type}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
