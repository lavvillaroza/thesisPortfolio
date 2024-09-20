import React, { useState } from 'react';
import SmallModal from '../common/SmallModal';
import { FaPlusCircle } from 'react-icons/fa';
import Profile from './Profile';
import Navbar from './Navbar';

interface Item {
  id: number;
  text: string;
  rating: 'Well' | 'Better' | 'Best';  // Replace numeric rating with string type
}

const initialItems: Item[] = [
  { id: 1, text: 'JavaScript', rating: 'Better' },
  { id: 2, text: 'React', rating: 'Best' },
  { id: 3, text: 'TypeScript', rating: 'Well' },
  { id: 4, text: 'Node.js', rating: 'Well' },
  { id: 5, text: 'CSS', rating: 'Better' },
];

const Skills: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemRating, setNewItemRating] = useState<'Well' | 'Better' | 'Best'>('Well'); // Default to 'Well'

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setItems([...items, { id: Date.now(), text: newItemText, rating: newItemRating }]);
      setNewItemText('');
      setNewItemRating('Well');
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
                className="hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline"
              >
                <FaPlusCircle />
              </button>
            </div>
            <div className="p-4 w-full m-auto h-[500px] bg-white drop-shadow-md rounded-lg overflow-auto">
              <ul>
                {items.map(item => (
                  <li key={item.id} className="flex justify-between items-center py-2">
                    <span className="text-gray-700">{item.text}</span>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        item.rating === 'Well' ? 'bg-yellow-300 text-yellow-800' :
                        item.rating === 'Better' ? 'bg-blue-300 text-blue-800' :
                        'bg-green-300 text-green-800'
                      }`}
                    >
                      {item.rating}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal for Adding a New Skill */}
        <SmallModal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Skill"
            maxLength={20}
          />
          <div className="mt-4">
            <label className="block text-gray-700 font-bold mb-2">Rating</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setNewItemRating('Well')}
                className={`px-4 py-2 rounded ${
                  newItemRating === 'Well' ? 'bg-yellow-400 text-yellow-800' : 'bg-gray-200'
                }`}
              >
                Well
              </button>
              <button
                onClick={() => setNewItemRating('Better')}
                className={`px-4 py-2 rounded ${
                  newItemRating === 'Better' ? 'bg-blue-400 text-blue-800' : 'bg-gray-200'
                }`}
              >
                Better
              </button>
              <button
                onClick={() => setNewItemRating('Best')}
                className={`px-4 py-2 rounded ${
                  newItemRating === 'Best' ? 'bg-green-400 text-green-800' : 'bg-gray-200'
                }`}
              >
                Best
              </button>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddItem}
              className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </SmallModal>
      </div>
    </>
  );
};

export default Skills;
