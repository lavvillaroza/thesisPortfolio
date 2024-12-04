import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'flowbite/dist/flowbite.css';
import 'flowbite/dist/flowbite.js';
import SideNavbar from './SideNavbar';
import Header from './Header';
import { addAnnouncement } from '../../api/announcementApi';
import CustomToast from '../common/CustomToast';

const CreateAnouncement: React.FC = () => {    
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formattedDate, setFormattedDate] = useState<Date | null>(null);
  
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');    
    const [images, setImages] = useState<File[]>([]); // Array to handle multiple images
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For image previews    
    const [announcementType, setAnnouncementType] = useState<number>(0); // Added state for radio buttons

    const [showToast, setShowToast] = useState<boolean>(false); // For toast visibility
    const [toastMessage, setToastMessage] = useState<string>(''); // Toast message content
    const [toastType, setToastType] = useState<'success' | 'error'>('success'); // Toast type (success or error)
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = Array.from(e.target.files);
            setImages([...images, ...selectedFiles]);

            // Generate previews for all selected files
            const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...imageUrls]);
        }
        else {
            setImages([]); // If no files are selected, clear the state
        }
    };

    const removeImage = (index: number) => {
        // Remove the selected image and its preview
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const user = localStorage.getItem('userDetails');
        const [year, month, day] = [
            formattedDate?.getFullYear() ?? 1970, // Default year if undefined
            formattedDate?.getMonth() ?? 0,      // Default month (January) if undefined
            formattedDate?.getDate() ?? 1,       // Default day if undefined
        ];
        // Combine date with start and end times        
        const dateSelected = new Date(year, month, day);        
    
        const formData = new FormData();
        formData.append('id', '0');
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dateAnnounced', dateSelected.toLocaleString());        
        formData.append('announcementType', announcementType.toString());
        
        if (user) {
            const userParse = JSON.parse(user);
            formData.append('createdBy', userParse.username);
            formData.append('lastModifiedBy', userParse.username);
        } else {
            formData.append('createdBy', '');
            formData.append('lastModifiedBy', '');
        }
        images.forEach((image) => {
            formData.append('Images', image);
        });
    
        try {
            await addAnnouncement(formData); // Call the new API function
            setToastMessage('Announcement added successfully!');
            setToastType('success');
            setShowToast(true);
    
            // Reset the form
            setTitle('');
            setDescription('');
            setImages([]);
            setSelectedDate(null);
            setImagePreviews([]);            
        } catch (error) {
            setToastMessage('Error adding announcement.');
            setToastType('error');
            setShowToast(true);
            console.error('Error adding announcement:', error);
        } finally {
            // Hide toast after 8 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 8000);
        }
    };

    useEffect(() => {
        const getCurrentDate = () => new Date();
        const datepickerElement = document.getElementById('inline-calendar');
        if (datepickerElement) {
            const currentDate = getCurrentDate();
            setSelectedDate(currentDate);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const datepicker = new (window as any).Datepicker(datepickerElement, {
                autohide: false,
                todayBtn: true,
                clearBtn: true,
                autoselect: true,
                format: 'yyyy-mm-dd',
                defaultDate: currentDate,
            });
            
            datepicker.setDate(currentDate);
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            datepickerElement.addEventListener('changeDate', (event: any) => {
                setSelectedDate(event.detail.date);
            });
        }
    }, []);

    useEffect(() => {
        const hiddenInput = document.getElementById('hidden-date-input') as HTMLInputElement;
        if (hiddenInput && selectedDate) {
            //const formattedDate = formatDateToMMDDYYYY(new Date(selectedDate));
            setFormattedDate(selectedDate);
            hiddenInput.value = selectedDate.toLocaleString();
        }
    }, [selectedDate]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen min-w-screen w-full bg-custom-bg bg-cover bg-center">
            <div className="basis-3/4 mx-auto">
                <Header/>
                <div className="flex flex-col md:flex md:flex-row">
                    <SideNavbar/>
                    <main className="basis-3/4 p-5 bg-emerald-600 bg-gradient-to-br from-emerald-600 bg-opacity-50 rounded">
                        <h5 className="mb-2 text-center text-2xl font-bold text-white ">NEW ANNOUNCEMENT</h5>                           
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="basis-4/5 bg-gray-100 p-3 rounded">
                                    <div className="h-[650px]">                                        
                                        <div className="mb-2">
                                            <input 
                                                type="text" 
                                                id="title" 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5" 
                                                placeholder="Title" 
                                                required />
                                        </div>
                                        {/* Radio Buttons */}
                                        <div className="space-x-4 mb-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="Announcement"
                                                    checked={announcementType === 0}
                                                    onChange={() => setAnnouncementType(0)}
                                                    className="form-radio h-4 w-4 text-emerald-600"
                                                />
                                                <span className="ml-2">Announcement</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="Seminar"
                                                    checked={announcementType === 1}
                                                    onChange={() => setAnnouncementType(1)}
                                                    className="form-radio h-4 w-4 text-emerald-600"
                                                />
                                                <span className="ml-2">Seminar</span>
                                            </label>
                                        </div>
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                                            <div className="px-4 py-2 bg-white rounded-t-lg  mb-5">
                                                <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-900">Description</label>
                                                <textarea 
                                                    id="comment" 
                                                    rows={16} 
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="w-full max-h-96 text-sm text-gray-900 bg-white border-0  focus:ring-0" 
                                                    placeholder="Write a description..." 
                                                    required>
                                                </textarea>
                                            </div>                                            
                                            <div className="flex items-center justify-between px-3 py-2 mt-4 border-t">
                                                <div className="grid grid-cols-2 gap-2 m-4">
                                                    {/* Left aligned Save and Clear buttons */}
                                                    <button
                                                        type="submit"
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:ring-blue-200 ">
                                                        Send
                                                    </button>
                                                    {/* Clear Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setTitle('');          // Clear the title
                                                            setDescription('');    // Clear the description
                                                            setImages([]);        // Clear the image
                                                            setSelectedDate(null); // Clear the selected date
                                                            setImagePreviews([]);  // Clear image previews                                                            
                                                        }}
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 ">
                                                        Clear
                                                    </button>
                                                </div>                                                                                        
                                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">  
                                                    {/* Image preview and delete functionality */}
                                                    {imagePreviews.length > 0 && (
                                                                <div className="grid grid-cols-6 gap-4">
                                                                    {imagePreviews.map((preview, index) => (
                                                                        <div key={index} className="relative">
                                                                            <img 
                                                                                src={preview} 
                                                                                alt={`Selected Preview ${index}`} 
                                                                                className="w-10 h-10 object-cover rounded-md border border-gray-300" 
                                                                            />
                                                                            {/* Delete button */}
                                                                            <button 
                                                                                type="button" 
                                                                                onClick={() => removeImage(index)}
                                                                                className="absolute top-0 left-0 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-emerald-700 focus:outline-none">
                                                                                &times;
                                                                            </button>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                    <input className="hidden" type="file" id="image" accept="image/*" multiple onChange={handleImageChange}></input>                                          
                                                    <button type="button" 
                                                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                        onClick={() => document.getElementById('image')?.click()}>
                                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 8.5 6a1 1 0 0 1 .895.553l2.605 5.21 1.605-2.407a1 1 0 0 1 1.664.028l2.5 3.998a1 1 0 0 1-.293 1.099Z"/>
                                                        </svg>
                                                    </button>
                                                </div>                                                
                                            </div>                                            
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="basis-1/5 bg-gray-100 px-5 justify-center items-start rounded">
                                    <div className="p-5 flex items-center justify-center">                                    
                                        <div className = "flex justify-center" id="inline-calendar"></div> {/* The calendar will be rendered here */}                                                                                        
                                        <input 
                                            type="hidden" 
                                            id="hidden-date-input" 
                                            value={formattedDate ? formattedDate.toISOString().slice(0, 10) : ''}
                                            name="date"/>                                                                                
                                    </div>                                    
                                </div>
                            </div>
                                                    
                        </form>
                    </main>
                </div>
                <footer className="text-white text-center p-4">
                    © 2024 Student Portfolio
                </footer>               
            </div>
            {showToast && (
            <CustomToast
                message={toastMessage}
                type={toastType}
                onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
};

export default CreateAnouncement;
