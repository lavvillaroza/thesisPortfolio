import React from 'react';
import SkillsRating from '../student/SkillsRating';

interface GridItem {
    id: number;
    text: string;
    rating: number;
}

interface GridListProps {
  items: GridItem[];
}

const GridListRating: React.FC<GridListProps> = ({ items }) => {
  return (
    <div className="grid grid-rows-10 grid-flow-col gap-4 min-w-[100px]">
      {items.map(item => (
            <div key={item.id} className="flex items-start">
                <div className='flex items-start mr-2 '>                    
                    <label className="text-gray-700 "> - {item.text}</label>                     
                </div>
                <div className="flex items-start">
                    {[1, 2, 3, 4, 5].map(star => (
                        <SkillsRating
                            key={star}
                            filled={star <= item.rating}
                            onClick={() => {}}
                        />
                    ))}
                </div>
            </div>            
        ))}          
    </div>
    
  );
};

export default GridListRating;