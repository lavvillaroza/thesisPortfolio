import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LargeModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-lg p-6 rounded-lg shadow-lg w-1/3">        
        <div className="flex justify-end text-2xl">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>        
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LargeModal;