import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number; // Duration for auto-close (in milliseconds)
  onClose: () => void; // Callback function to close the toast
}

const CustomToast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  // Automatically close the toast after `duration` milliseconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center p-4 max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
        type === 'success' ? 'border-green-600' : 'border-red-600'
      }`}
      role="alert"
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-white ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } rounded-lg`}
      >
        {type === 'success' ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-4.293a1 1 0 111.414-1.414L10 13.414l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-1.293-1.293z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0-4.418-3.582-8-8-8S2 5.582 2 10s3.582 8 8 8 8-3.582 8-8zm-8-4a1 1 0 00-1 1v3.586L7.707 7.293a1 1 0 10-1.414 1.414L9.586 12l-3.293 3.293a1 1 0 101.414 1.414L10 13.414V17a1 1 0 102 0v-3.586l2.293 2.293a1 1 0 001.414-1.414L12.414 12l3.293-3.293a1 1 0 00-1.414-1.414L11 9.586V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomToast;