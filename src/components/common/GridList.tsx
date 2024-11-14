import React from 'react';
import { FaDownload } from 'react-icons/fa6';

interface GridItem {
    id: number;
    text: string;    
    fileattached?: File;
}

interface GridListProps {
  items: GridItem[];
}

const GridList: React.FC<GridListProps> = ({ items }) => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4">
      {items.map(item => (
        <div key={item.id} className="flex items-start">
            <div className='flex items-center'>
                <label className="text-blue-700">{item.text}</label> 
            </div>
            {item.fileattached && (
            <div className='flex items-center'>
              <a
                href={URL.createObjectURL(item.fileattached)}
                download={item.fileattached.name}
                className="text-blue-700 font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
              >
                <FaDownload />
              </a>
            </div>
          )}                      
        </div>        
      ))}      
    </div>
    
  );
};

export default GridList;