//import React, { useState } from 'react';

interface FileInputProps {
  onFileSelect: (file: File) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {        
        onFileSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-gray-700
      hover:file:bg-violet-100"
      />
    </div>
  );
};

export default FileInput;