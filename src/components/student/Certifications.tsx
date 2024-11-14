import React, { useState } from 'react';
import { FaDownload, FaPlusCircle } from 'react-icons/fa';
import FileInput from '../common/FileInput';
import NavHeader from './NavHeader';

interface Item {
  id: number;
  text: string;
  fileattached?: File;
}

const initialCertificates: Item[] = [
  { id: 1, text: 'Certificate 1', fileattached: undefined },
  { id: 2, text: 'Certificate 2', fileattached: undefined },
];

const initialAwards: Item[] = [
  { id: 1, text: 'Award 1', fileattached: undefined },
  { id: 2, text: 'Award 2', fileattached: undefined },
];

const Certifications: React.FC = () => {
  const [itemsCert, setItemsCert] = useState<Item[]>(initialCertificates);
  const [itemsAward, setItemsAward] = useState<Item[]>(initialAwards);
  const [isModalOpenCert, setIsModalOpenCert] = useState(false);
  const [isModalOpenAward, setIsModalOpenAward] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemFileAttached, setNewItemFileAttached] = useState<File | undefined>(undefined);

  const openModalCert = () => setIsModalOpenCert(true);
  const openModalAward = () => setIsModalOpenAward(true);
  const closeModalCert = () => setIsModalOpenCert(false);
  const closeModalAward = () => setIsModalOpenAward(false);
    
  const handleAddItemCert = () => {
    if (newItemText.trim()) {
      setItemsCert([...itemsCert, { id: Date.now(), text: newItemText, fileattached: newItemFileAttached }]);      
      setNewItemText('');
      setNewItemFileAttached(undefined);
      closeModalCert();      
    }
  };

  const handleAddItemAward = () => {
    if (newItemText.trim()) {      
      setItemsAward([...itemsAward, { id: Date.now(), text: newItemText, fileattached: newItemFileAttached }]);
      setNewItemText('');
      setNewItemFileAttached(undefined);      
      closeModalAward();
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
                                <label className="text-gray-700 text-left mx-2 text-2xl">CERTIFICATES</label>
                                <button
                                  onClick={openModalCert}
                                  className="hover:bg-white text-emerald-800 font-bold rounded-full focus:outline-none focus:shadow-outline ">
                                  <FaPlusCircle />
                                </button>
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">                                
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                <div className="grid grid-cols-2 ">
                                  <div className="grid grid-rows-6 grid-flow-col gap-4">
                                    {initialCertificates.map(item => (
                                      <div key={item.id} className="flex items-start">
                                          <div className='flex items-center'>
                                              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">                                                    
                                                  <span
                                                    className="flex w-2.5 h-2.5 bg-emerald-600 '} rounded-full me-1.5 flex-shrink-0">                                                      
                                                  </span>
                                              <label className="text-blue-700">{item.text}</label> 
                                              </span>  
                                          </div>
                                          {item.fileattached && (
                                          <div className='flex items-center'>
                                            <a
                                              href={URL.createObjectURL(item.fileattached)}
                                              download={item.fileattached.name}
                                              className="text-blue-700 font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline">
                                              <FaDownload />
                                            </a>
                                          </div>
                                        )}                      
                                      </div>        
                                    ))}      
                                  </div>
                                </div>                                       
                              </div>
                            </div>
                            <div>
                              <div className="mb-4">
                                <label className="text-gray-700 text-left mx-2 text-2xl">RECOGNITIONS</label>                                      
                                <button
                                  onClick={openModalAward}
                                  className="hover:bg-white text-emerald-800 font-bold rounded-full focus:outline-none focus:shadow-outline ">
                                  <FaPlusCircle />
                                </button>
                              </div>
                              <div className="p-4 w-full m-auto h-[570px] bg-white drop-shadow-md rounded-lg overflow-auto">
                                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
                                <div className="grid grid-rows-6 grid-flow-col gap-4">
                                    {initialAwards.map(item => (
                                      <div key={item.id} className="flex items-start">
                                          <div className='flex items-center'>
                                              <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">                                                    
                                                  <span
                                                    className="flex w-2.5 h-2.5 bg-emerald-600 '} rounded-full me-1.5 flex-shrink-0">                                                      
                                                  </span>
                                              <label className="text-blue-700">{item.text}</label> 
                                              </span>  
                                          </div>
                                          {item.fileattached && (
                                          <div className='flex items-center'>
                                            <a
                                              href={URL.createObjectURL(item.fileattached)}
                                              download={item.fileattached.name}
                                              className="text-blue-700 font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline">
                                              <FaDownload />
                                            </a>
                                          </div>
                                        )}                      
                                      </div>        
                                    ))}      
                                  </div>
                              </div>
                            </div>                                    
                          </div>                                
                      </div>  
                    </div>                            
                </div>
            </main>                  
              {/* Modal for Adding a New Certificate and Reward */}              
              {isModalOpenCert && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                  <div className="relative w-full max-w-2xl my-5 md:max-w-3xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">                            
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Certificate</h3>
                          <button
                              type="button"
                              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={closeModalCert}
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
                            placeholder="Enter Certificate Name"
                          />
                          <div className="mt-4">
                            <FileInput onFileSelect={(file: React.SetStateAction<File | undefined>) => setNewItemFileAttached(file)} />
                          </div>     
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={handleAddItemCert}
                              className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                              Save
                            </button>
                          </div>                                       
                      </div>
                      {/* Modal footer */}
                      <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button 
                              onClick={closeModalCert} 
                              className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          >
                              Close
                          </button>
                      </div>
                  </div>
              </div>
            )}

              {isModalOpenAward && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                  <div className="relative w-full max-w-2xl my-5 md:max-w-3xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">                            
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Award</h3>
                          <button
                              type="button"
                              className="text-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={closeModalAward}
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
                              placeholder="Enter Certificate Name"
                            />
                            <div className="mt-4">
                              <FileInput onFileSelect={(file: React.SetStateAction<File | undefined>) => setNewItemFileAttached(file)} />
                            </div>     
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={handleAddItemAward}
                                className="mt-4 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Save
                              </button>
                            </div>                                    
                      </div>
                      {/* Modal footer */}
                      <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button 
                              onClick={closeModalAward} 
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

  )};

export default Certifications;