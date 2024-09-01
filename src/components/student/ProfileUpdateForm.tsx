import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom'; 

interface Profile {
  profilePicture: string | ArrayBuffer | null;
  studentID: string;
  fullName: string;
  course: string;
  yearLevel: string;
  aboutMe: string;
}

const ProfileUpdateForm: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    profilePicture: '',
    studentID: '',
    fullName: '',
    course: '',
    yearLevel: '',
    aboutMe: '',
  });
  const navigate  = useNavigate();

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Profile submitted:', profile);
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className='bg-gray-200 h-lvh pt-28 overflow-y-auto'>
        <form className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg " onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Update My Profile</h2>
            <div className="mb-4 text-center">                
                <div className="flex flex-col items-center">
                    {profile.profilePicture && (
                        <img
                        src={profile.profilePicture as string}
                        alt="Profile"
                        className="w-24 h-24 rounded-full m-2"
                        />
                    )}
                    <input
                        className="hidden"
                        id="profilePicture"
                        name="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                    />
                    <label
                        htmlFor="profilePicture"
                        className="cursor-pointer bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center"
                    >
                        <FaCamera className="mr-2" /> Upload
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    Student ID
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="studentID"
                    name="studentID"
                    type="text"
                    value={profile.studentID}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                Name
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                name="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Course
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="course"
                name="course"
                type="text"
                value={profile.course}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Year
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="yearLevel"
                name="yearLevel"
                type="number"
                value={profile.yearLevel}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                About Me
                </label>
                <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="aboutMe"
                name="aboutMe"
                value={profile.aboutMe}
                onChange={handleChange}
                required
                />
            </div>

            <div className="flex items-center justify-end space-x-4 ...">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Save
                </button>
                <button
                className="bg-white-500 hover:bg-gray-200 text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleBack}
                >
                Back
                </button>
            </div>            
        </form>
    </div>
    
  );
};

export default ProfileUpdateForm;