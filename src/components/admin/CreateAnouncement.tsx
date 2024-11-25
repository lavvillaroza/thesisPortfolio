import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'flowbite/dist/flowbite.css';
import 'flowbite/dist/flowbite.js';
import SideNavbar from './SideNavbar';
import HeaderNew from './Header';
import { addAnnouncement } from '../../api/announcementApi';
import CustomToast from '../common/CustomToast';

const CreateAnouncement: React.FC = () => {    
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formattedDate, setFormattedDate] = useState<Date | null>(null);
  
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');    
    const [images, setImages] = useState<File[]>([]); // Array to handle multiple images
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For image previews
    const [startTime, setStartTime] = useState<string>('06:00'); // Default value
    const [endTime, setEndTime] = useState<string>('22:00'); // Default value
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
        

        const [fromHours, fromMinutes] = startTime.split(':').map(Number);
        const [toHours, toMinutes] = endTime.split(':').map(Number);

        // Combine date with start and end times        
        const dateTimeFrom = new Date(year, month, day, fromHours ?? 0, fromMinutes ?? 0);
        const dateTimeTo = new Date(year, month, day, toHours ?? 0, toMinutes ?? 0);
    
        const formData = new FormData();
        formData.append('id', '0');
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dateTimeFrom', dateTimeFrom.toLocaleString());
        formData.append('dateTimeTo', dateTimeTo.toLocaleString());
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
            setStartTime('09:00');
            setEndTime('18:00');
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
            hiddenInput.value = selectedDate.toISOString().slice(0, 10);
        }
    }, [selectedDate]);

    return (
        <div className="font-roboto flex p-4 md:flex md:flex-col bg-gray-100 py-2 min-h-screen min-w-screen w-full">
            <div className="flex-1 m-auto">
                <HeaderNew/>
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-full md:h-[750px] overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                    <SideNavbar/>
                    <main className="flex-1 w-full md:w-[1100px] md:h-full mx-auto h-full bg-emerald-700 bg-gradient-to-br from-emerald-600 rounded transition-all duration-200">
                        <div className="h-[60px] p-4">
                            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-900">NEW ANNOUNCEMENT</h5>                        
                        </div>                         
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col-reverse md:flex-row gap-4 min-h-[660px] px-6">
                                <div className="flex-auto w-full md:w-72 bg-gray-100 p-3 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100 rounded transition-all duration-200">
                                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1 overflow-y-auto scrollbar scrollbar-thumb-emerald-700 scrollbar-track-gray-100">
                                        <div className="flex justify-between">
                                            <label htmlFor="title" className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Subject/Title</label>                                                                                        
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                id="title" 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" 
                                                placeholder="Subject/Title" 
                                                required />
                                        </div>
                                        {/* Radio Buttons */}
                                        <div className="flex space-x-4">                                                
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
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 mb-5">
                                                <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Description</label>
                                                <textarea 
                                                    id="comment" 
                                                    rows={14} 
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="w-full max-h-52 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
                                                    placeholder="Write a description..." 
                                                    required>
                                                </textarea>
                                            </div>                                            
                                            <div className="flex items-center justify-between px-3 py-2 mt-4 border-t dark:border-gray-600">
                                                <div className="grid grid-cols-2 gap-2 m-4">
                                                    {/* Left aligned Save and Clear buttons */}
                                                    <button
                                                        type="submit"
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-emerald-900"
                                                    >
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
                                                            setStartTime('09:00'); // Reset start time
                                                            setEndTime('18:00');   // Reset end time
                                                        }}
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900">
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
                                                        className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
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
                                <div className="flex-1 w-full md:w-8 md:flex-1 bg-gray-100 p-1 flex justify-center items-start rounded transition-all duration-200">
                                    <div className="relative w-full max-w-xs h-auto overflow-hidden rounded-md my-5">                                    
                                        <div className = "flex justify-center" id="inline-calendar"></div> {/* The calendar will be rendered here */}
                                            {/* Display the selected date */}
                                            {/* Hidden input field to hold the selected date */}
                                            <input 
                                            type="hidden" 
                                            id="hidden-date-input" 
                                            value={formattedDate ? formattedDate.toISOString().slice(0, 10) : ''}
                                            name="date"/>                                        
                                        <div className="p-5 w-full max-w-xs h-full m-auto">                                        
                                            <div className="mb-5">
                                                <label htmlFor="start-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select start-time:</label>
                                                <div className="flex">
                                                    <input type="time" 
                                                        id="start-time"  
                                                        value={startTime}
                                                        onChange={(e) => setStartTime(e.target.value)}
                                                        className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        required/>
                                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </span>
                                                </div>                                               
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="end-time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select end-time:</label>
                                                <div className="flex">
                                                    <input type="time" id="end-time" className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"                                                         
                                                        value={endTime}
                                                        onChange={(e) => setEndTime(e.target.value)} 
                                                        required/>
                                                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-s-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </span>
                                                </div>                                               
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </div>
                                                    
                        </form>
                    </main>
                </div>               
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
