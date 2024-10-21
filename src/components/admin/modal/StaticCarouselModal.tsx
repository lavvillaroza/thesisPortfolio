import React, { useState } from 'react';

const CustomModalWithCarousel: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images: any[] = [        
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
    ];

    const descriptions = [
        "Description for Image 1: This is a beautiful view of nature.",
        "Description for Image 2: A stunning sunset over the mountains.",
        "Description for Image 3: A picturesque beach scene.",
        "Description for Image 4: A bustling cityscape at night.",
        "Description for Image 5: A tranquil forest path."
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <button onClick={openModal} className="btn btn-primary">Open Extra Large Modal</button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto h-full bg-gray-800 bg-opacity-50">
                    <div className="relative w-full max-w-4xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Extra Large Modal</h3>
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
                        <div className="flex p-4 space-x-4">
                            {/* Description Section */}
                            <div className="w-1/2 flex flex-col justify-start">
                                <h2 className="text-lg font-bold text-gray-800 mb-2">Description</h2>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    {images.length > 0 ? descriptions[currentIndex] : "Not Available"}
                                </p>
                            </div>
                            {/* Carousel Section */}
                            <div className="relative w-1/2">
                                {images.length > 0 ? (
                                    <>
                                        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                                            {/* Display the current image */}
                                            {images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'block' : 'hidden'}`}
                                                >
                                                    <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center items-center pt-4">
                                            <button
                                                type="button"
                                                className="flex justify-center items-center me-4 cursor-pointer"
                                                onClick={prevImage}
                                            >
                                                <svg className="w-5 h-5 text-gray-500 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4" />
                                                </svg>
                                                <span className="sr-only">Previous</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="flex justify-center items-center cursor-pointer"
                                                onClick={nextImage}
                                            >
                                                <svg className="w-5 h-5 text-gray-500 hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                                <span className="sr-only">Next</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-56 md:h-96">
                                        <p className="text-gray-500">Not Available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Modal footer */}
                        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button onClick={closeModal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                Accept
                            </button>
                            <button onClick={closeModal} type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700">
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomModalWithCarousel;
