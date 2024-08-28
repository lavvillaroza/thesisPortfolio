import React, { useState } from 'react';
import SmallModal from '../common/SmallModal';
import SkillsRating from './SkillsRating';
import { FaPlusCircle } from 'react-icons/fa';
import Profile from './Profile';
import Navbar from './Navbar';
import GridListRating from '../common/GridListRating';

interface Item {
  id: number;
  text: string;
  rating: number;
}

const initialItems: Item[] = [
  { id: 1, text: 'JavaScript', rating: 4 },
  { id: 2, text: 'React', rating: 5 },
  { id: 3, text: 'TypeScript', rating: 3 },
  { id: 4, text: 'JavaScript', rating: 3 },
  { id: 5, text: 'NodeScript', rating: 3 },  
  
];

const Skills: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemRating, setNewItemRating] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setItems([...items, { id: Date.now(), text: newItemText, rating: newItemRating }]);
      setNewItemText('');
      setNewItemRating(0);
      closeModal();
    }
  };


  return (
    <>
    <div className="bg-gray-200 h-svh py-6">  
      <Profile /> 
      <Navbar />
      <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600 ">                  
        <div className="h-[60px] p-4 ">          
          <div className="mb-4 ">
            <label className="text-gray-50 text-left mx-2 hover:text-green-700 text-2xl">SKILLS</label>    
            <button
              onClick={openModal}
              className=" hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline "
            >          
              <FaPlusCircle/>
            </button>
          </div>    
          <div className="p-4 w-full m-auto  h-[500px] bg-white drop-shadow-md rounded-lg overflow-auto">              
              <GridListRating items={items} />
          </div>               
        </div> 
      </div>
      <SmallModal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Add Skill</h2>        
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Skill"
            size={20} 
            maxLength={20}
          />
          <div className="mt-4 flex items-center">
            {[1, 2, 3, 4, 5].map(star => (
              <SkillsRating
                key={star}
                filled={star <= newItemRating}
                onClick={() => setNewItemRating(star)}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddItem}
              className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>        
        </SmallModal>
    </div>    
  </>  
    
  );
};

export default Skills;