import { useId } from 'react';

const Input = ({
    id,
    type = 'text',
    name,
    placeholder,
    label,
    value,
    onMutate,
}) => {
    const inputId = id || useId();
    
    return (
        <div>
            {label && <label htmlFor={inputId}>{label}</label>}
            <input
                id={inputId}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onMutate}
            />
        </div>
    )
}

export default Input;
