import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Header from './Header';
import Sidebar from './Sidebar';
import 'flowbite/dist/flowbite.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = "https://localhost:5050/api/Announcement"; // Adjust the URL as needed

const CreateSeminarAndAnouncement: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [formattedDate, setFormattedDate] = useState<Date | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');    
    const [images, setImages] = useState<File[]>([]); // Array to handle multiple images
    const [imagePreviews, setImagePreviews] = useState<string[]>([]); // For image previews
    const [startTime, setStartTime] = useState<string>('06:00'); // Default value
    const [endTime, setEndTime] = useState<string>('22:00'); // Default value
    const [announcementType, setAnnouncementType] = useState<number>(0); // Added state for radio buttons

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
        // Combine date with start and end times
        const dateTimeFrom = new Date(
            `${formattedDate?.toLocaleDateString()} ${startTime}`
        );
        const dateTimeTo = new Date(
            `${formattedDate?.toLocaleDateString()} ${endTime}`
        );

        console.log(dateTimeFrom);
        console.log(dateTimeTo);
        console.log(dateTimeFrom.toLocaleString());
        console.log(dateTimeTo.toLocaleString());
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('dateTimeFrom', dateTimeFrom.toLocaleString());
        formData.append('dateTimeTo', dateTimeTo.toLocaleString());
        formData.append('announcementType', announcementType.toString());        
        if(user) {
            const userParse = JSON.parse(user);
            formData.append('createdBy', userParse.username);    
        }
        else {
            formData.append('createdBy', '');    
        }
        images.forEach((image) => {
            formData.append('Images', image);
        });

        try {
            const jwtToken = Cookies.get('jwtToken');
            if (!jwtToken) {
                alert('Please log in.');
                return;
            }

            formData.forEach((value, key) => {
                console.log(key, value);
            });
            console.log(Cookies.get('jwtToken'));
            const response = await axios.post(`${API_URL}`, formData, {
                headers: {                    
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            alert('Announcement added successfully');
        } catch (error) {
            console.error('Error adding announcement:', error);
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
        <div className="flex flex-col bg-gray-300 py-2 min-h-screen w-full">
            <div className="flex-1 m-auto">
                <Header />  
                <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-full h-[700px]">                
                    <Sidebar/>
                    <main className="flex-1 mx-auto w-8/12 h-full bg-green-700 bg-gradient-to-br from-emerald-600">                        
                        <div className="h-[60px] p-4">
                            <p className="text-gray-50 text-center m-2 hover:text-green-500 text-2xl">CREATE</p>
                        </div>                         
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-3 gap-4 h-[600px] p-6">
                                <div className="col-span-2 bg-gray-100 p-2 h-full overflow-y-scroll scrollbar scrollbar-thumb-green-700 scrollbar-track-gray-100">                                
                                    <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-1">
                                    <div className="flex justify-between">
                                            <label htmlFor="title" className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">Subject/Title</label>                                            
                                            {/* Radio Buttons */}
                                            <div className="flex space-x-4">
                                                
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="type"
                                                        value="Announcement"
                                                        checked={announcementType === 0}
                                                        onChange={() => setAnnouncementType(0)}
                                                        className="form-radio h-4 w-4 text-green-600"
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
                                                        className="form-radio h-4 w-4 text-green-600"
                                                    />
                                                    <span className="ml-2">Seminar</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                id="title" 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                                                placeholder="Subject/Title" 
                                                required />
                                        </div>
                                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Description</label>
                                                <textarea 
                                                    id="comment" 
                                                    rows={12} 
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
                                                    placeholder="Write a description..." 
                                                    required>
                                                </textarea>
                                            </div>
                                            <div className="flex items-center justify-between px-3 py-2 mt-4 border-t dark:border-gray-600">
                                                <div className="grid grid-cols-2 gap-2 m-4">
                                                    {/* Left aligned Save and Clear buttons */}
                                                    <button
                                                        type="submit"
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-green-900"
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
                                                        className="py-2.5 px-4 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                                
                                                {/* Image preview and delete functionality */}
                                                {imagePreviews.length > 0 && (
                                                    <div className="grid grid-cols-4 gap-1 m-4">
                                                        {imagePreviews.map((preview, index) => (
                                                            <div key={index} className="relative">
                                                                <img 
                                                                    src={preview} 
                                                                    alt={`Selected Preview ${index}`} 
                                                                    className="w-20 h-20 object-cover rounded-md border border-gray-300" 
                                                                />
                                                                {/* Delete button */}
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => removeImage(index)}
                                                                    className="absolute top-0 right-0 w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs hover:bg-green-700 focus:outline-none">
                                                                    &times;
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">  
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
                                <div className="flex flex-col col-span-1 bg-gray-100 p-2 h-full">
                                    <div id="inline-calendar"></div>
                                    <input 
                                        type="hidden" 
                                        id="hidden-date-input" 
                                        value={formattedDate ? formattedDate.toISOString().slice(0, 10) : ''}
                                        name="date"/>
                                    <div className="flex flex-row space-x-3 mt-5">
                                        <div>
                                            <label htmlFor="start-time" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Start Time</label>
                                            <input 
                                                id="start-time" 
                                                type="time" 
                                                value={startTime}
                                                onChange={(e) => setStartTime(e.target.value)}
                                                className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                                required />
                                        </div>
                                        <div>
                                            <label htmlFor="end-time" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">End Time</label>
                                            <input 
                                                id="end-time" 
                                                type="time" 
                                                value={endTime}
                                                onChange={(e) => setEndTime(e.target.value)}
                                                className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                                                required />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </form>
                    </main>
                </div>               
            </div>
        </div>
    );
};

export default CreateSeminarAndAnouncement;
