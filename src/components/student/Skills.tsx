import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
//import Profile from './Profile';
//import Navbar from './NavMenu';
import NavHeader from './NavHeader';

interface Item {
  id: number;
  text: string;
  rating: 'Well' | 'Better' | 'Best';  // Replace numeric rating with string type
}

const initialItems: Item[] = [
  { id: 1, text: 'C++', rating: 'Better' },
  { id: 2, text: 'React', rating: 'Best' },
  { id: 3, text: 'TypeScript', rating: 'Well' },
  { id: 4, text: 'Node.js', rating: 'Well' },
  { id: 5, text: 'CSS', rating: 'Better' },
  { id: 6, text: 'CSSR', rating: 'Better' },
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
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
          <div className="flex-1 m-auto">
              <NavHeader />                
              <div className="flex flex-col md:flex-col bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                     
                  <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-green-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">                        
                      <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[700px] px-6 pt-10">
                          <div className="flex-auto w-full md:w-72 bg-gray-100 p-1 overflow-y-auto scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                            <div className="p-4">                                          
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="mb-4 ">
                                      <label className="text-gray-700 text-left mx-2 text-2xl">SKILLS</label>
                                      <button
                                        onClick={openModal}
                                        className="hover:bg-white text-emerald-800 font-bold rounded-full focus:outline-none focus:shadow-outline ">
                                        <FaPlusCircle />
                                      </button>
                                    </div>
                                    <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                      <div className="flex justify-end">
                                        <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                                            <span className="flex w-2.5 h-2.5 bg-yellow-300 rounded-full me-1.5 flex-shrink-0"></span>
                                            Well
                                        </span>
                                        <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                                            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 flex-shrink-0"></span>
                                            Better
                                        </span>
                                        <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                                          <span className="flex w-2.5 h-2.5 bg-green-600 rounded-full me-1.5 flex-shrink-0"></span>
                                          Best
                                        </span>
                                      </div>
                                      <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                      <div className="grid grid-cols-2 ">
                                        {items.map(item => (
                                              <div key={item.id} className="py-2">                                                  
                                                <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">                                                    
                                                  <span
                                                    className={`flex w-2.5 h-2.5 ${
                                                      item.rating === 'Well' ? 'bg-yellow-300 ' :
                                                      item.rating === 'Better' ? 'bg-blue-600 ' :
                                                      'bg-green-600 '} rounded-full me-1.5 flex-shrink-0`}>                                                      
                                                  </span>
                                                  {item.text}                                                    
                                                </span>                                                  
                                              </div>
                                            ))} 
                                      </div>                                       
                                    </div>
                                  </div>
                                  <div>
                                    <div className="mb-4">
                                      <label className="text-gray-700 text-left mx-2 text-2xl">FUTURE CAREERS <span className="italic text-sm text-emerald-700">powered by AI</span></label>                                      
                                    </div>
                                    <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">

                                    </div>
                                  </div>                                    
                                </div>                                
                            </div>  
                          </div>                            
                      </div>
                  </main>                  
                    {/* Modal for Adding a New Skill */}
                    {/* Modal for Updating Information */}              
                    {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                        <div className="relative w-full max-w-2xl my-5 md:max-w-3xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">                            
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Skill</h3>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={closeModal}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="flex flex-col p-4 space-x-4">
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
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button 
                                    onClick={closeModal} 
                                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                  )}        
                   
              </div>
          </div>
        </div>        
  );
};

export default Skills;
