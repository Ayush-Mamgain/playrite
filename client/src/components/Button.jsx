import React from 'react';

const Button = ({
    children,
    type = 'submit',
    textColor = 'black',
    bgColor = 'white',
    onHit,
    ...props
}) => {
    return (
        <button
            style={{
                color: textColor,
                backgroundColor: bgColor,
            }}
            type={type}
            onClick={onHit}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button;
