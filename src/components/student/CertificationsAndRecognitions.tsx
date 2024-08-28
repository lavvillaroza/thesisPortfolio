import React, { useState } from 'react';
import Profile from './Profile';
import Navbar from './Navbar';

import { FaPlusCircle } from 'react-icons/fa';
import GridList from '../common/GridList'
import FileInput from '../common/FileInput';
import LargeModal from '../common/LargeModal';

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

const CertificationsAndRecognitions: React.FC = () => {
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
    <>
      <div className="bg-gray-200 h-svh py-6">          
        <Profile />
        <Navbar />        
        <div className="container mx-auto w-8/12 h-[600px] bg-green-700 bg-gradient-to-br from-emerald-600 ">                  
          <div className="h-[60px] p-4 ">          
            <div className="mb-4 ">
              <label className="text-gray-50 text-left mx-2 hover:text-green-700 text-2xl">CERTIFICATES</label>    
              <button
                onClick={openModalCert}
                className=" hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline "
              >          
                <FaPlusCircle/>
              </button>
            </div> 
            <div className="p-4 w-full m-auto  h-auto bg-white drop-shadow-md rounded-lg overflow-auto">              
              <GridList items={itemsCert} />
            </div>                 
            <div className="my-4">
              <label className="text-gray-50 text-left mx-2 hover:text-green-700 text-2xl">AWARDS</label>    
              <button
                onClick={openModalAward}
                className=" hover:bg-emerald-900 text-white font-bold py-2 px-2 rounded-full focus:outline-none focus:shadow-outline "
              >          
                <FaPlusCircle/>
              </button>
            </div> 
            <div className="p-4 w-full m-auto  h-auto bg-white drop-shadow-md rounded-lg overflow-auto">              
              <GridList items={itemsAward} />
            </div>     
          </div>           
        </div>
      <LargeModal isOpen={isModalOpenCert} onClose={closeModalCert}>
          <h2 className="text-2xl font-bold mb-4">Add Certificate</h2>        
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
        </LargeModal>
        <LargeModal isOpen={isModalOpenAward} onClose={closeModalAward}>
          <h2 className="text-2xl font-bold mb-4">Add Award</h2>        
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
        </LargeModal>
      </div>
    </>  
    )
};

export default CertificationsAndRecognitions;