// FolderButton.tsx
import React from 'react';
import { FaFolder } from 'react-icons/fa';

const FolderButton: React.FC = () => {
  return (
    <button
      type="button"
      className="flex items-center justify-center p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition duration-150 ease-in-out"
    >
      <FaFolder className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />      
      {/* Optional: Add text beside the icon */}
      <span className="ml-2">Folder</span>
    </button>
  );
};

export default FolderButton;