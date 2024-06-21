import React from 'react';

const Modal = ({ show, handleClose, children }) => {
    const showHideClassName = show
        ? 'modal display-block'
        : 'modal display-none';

    if(!show) return null;
    return (
        <div className='modal' onClick={handleClose}>
            <section
                className="modal-main"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </section>
        </div>
    );
};

export default Modal;
