import React from 'react';

function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <span
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={onClose}
            >
              &times;
            </span>
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
