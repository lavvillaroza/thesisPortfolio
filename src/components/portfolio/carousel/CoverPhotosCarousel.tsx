import React, { useEffect, useRef, useMemo } from 'react';
import { Carousel } from 'flowbite';
import type { CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';
import { StudentInformationModel } from '../../../models/StudentInformationModel';
import { BASE_URL } from '../../../api/apiConfig';
import defaultCoverPhoto from '../../../assets/coverPhotoDefault.jpg';

interface CoverPhotosCarouselProps {
    studentInformation: StudentInformationModel | null;
}

const CoverPhotosCarousel: React.FC<CoverPhotosCarouselProps> = ({ studentInformation }) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const prevButtonRef = useRef<HTMLButtonElement>(null);
    const nextButtonRef = useRef<HTMLButtonElement>(null);
    const indicatorsRef = useRef<HTMLButtonElement[]>([]);

    // Filter out null values from the cover photos array
    const coverPhotos = useMemo(() => {
        if (studentInformation) {
            const photos: string[] = [];

            // Push only valid photos into the array
            if (studentInformation.coverPhotoOne) {                
                photos.push(BASE_URL + encodeURI(studentInformation.coverPhotoOne));
            }
            if (studentInformation.coverPhotoTwo) {                
                photos.push(BASE_URL + encodeURI(studentInformation.coverPhotoTwo));
            }
            if (studentInformation.coverPhotoThree) {                
                photos.push(BASE_URL + encodeURI(studentInformation.coverPhotoThree));
            }
            if (studentInformation.coverPhotoFour) {                
                photos.push(BASE_URL + encodeURI(studentInformation.coverPhotoFour));
            }
    
            return photos; // Return the array directly
        }
        return [];
    }, [studentInformation]);

    const hasCoverPhotos = coverPhotos.length > 0;

    useEffect(() => {        
        if (!hasCoverPhotos || !carouselRef.current) return;

        const items: CarouselItem[] = coverPhotos.map((_, index) => ({
            position: index,
            el: document.getElementById(`carousel-item-${index}`)
        })).filter((item) => item.el !== null) as CarouselItem[];

        const options: CarouselOptions = {
            defaultPosition: 0,
            interval: 3000,
            indicators: {
                activeClasses: 'bg-white',
                inactiveClasses: 'bg-white/50 hover:bg-white',
                items: indicatorsRef.current.map((el, index) => ({ position: index, el })),
            },
        };

        const carousel: CarouselInterface = new Carousel(carouselRef.current, items, options);
        carousel.cycle();

        prevButtonRef.current?.addEventListener('click', () => carousel.prev());
        nextButtonRef.current?.addEventListener('click', () => carousel.next());

        return () => {
            prevButtonRef.current?.removeEventListener('click', () => carousel.prev());
            nextButtonRef.current?.removeEventListener('click', () => carousel.next());
        };
    }, [coverPhotos, hasCoverPhotos]);

    return (
        <div className="relative w-full">
            {hasCoverPhotos ? (                               
                <div id="carousel-example" ref={carouselRef} className="relative w-full">
                    <div className="relative h-[500px] overflow-hidden rounded-lg">
                        {/* Carousel Items */}
                        {coverPhotos.map((photo, index) => (
                            <div
                                key={index}
                                id={`carousel-item-${index}`}
                                className={`border border-gray-500 bg-white absolute inset-0 transition-opacity duration-700 ease-in-out ${index === 0 ? 'block' : 'hidden'}`}>
                                <img
                                    src={photo}
                                    className="absolute left-1/2 top-1/2 block w-full h-full object-scale-down -translate-x-1/2 -translate-y-1/2"
                                    alt={`Cover Photo ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Slider indicators */}
                    <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
                        {coverPhotos.map((_, index) => (
                            <button
                                key={index}
                                ref={(el) => (indicatorsRef.current[index] = el!)}
                                id={`carousel-indicator-${index}`}
                                type="button"
                                className="h-3 w-3 rounded-full"
                                aria-current={index === 0 ? 'true' : 'false'}
                                aria-label={`Slide ${index + 1}`}></button>
                        ))}
                    </div>

                    {/* Slider controls */}
                    <button
                        ref={prevButtonRef}
                        id="data-carousel-prev"
                        type="button"
                        className="group absolute left-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50">
                            <svg
                                className="h-4 w-4 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                        </span>
                    </button>
                    <button
                        ref={nextButtonRef}
                        id="data-carousel-next"
                        type="button"
                        className="group absolute right-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
                    >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50">
                            <svg
                                className="h-4 w-4 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
            ) : (
                // Display the default image if no cover photos are available
                <img
                    src={defaultCoverPhoto}
                    className="w-full h-64 rounded-lg sm:h-64 xl:h-80 2xl:h-96 object-fill"
                    alt="Default Cover Photo"
                />
            )}
        </div>
    );
};

export default CoverPhotosCarousel;
