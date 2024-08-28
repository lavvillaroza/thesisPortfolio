import React from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
    
const AnnouncementAdm: React.FC = () => {
      return (
        <div className="bg-gray-200 h-svh py-6">  
            <div className="flex flex-col md:flex-row bg-background text-foreground mx-auto w-8/12 h-[700px]">
                <aside className="w-full md:w-[300px] bg-zinc-800 p-4 m-4">
                    <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-zinc-600 flex items-center justify-center text-xl text-white">A</div>
                    <h2 className="text-white ml-2">ADMIN</h2>
                    </div>
                    <nav className="flex flex-col">
                    <a href="#" className="text-pink-500 mb-2">HOME</a>
                    <a href="#" className="text-zinc-300 mb-2">MANAGE / VIEW STUDENTS ACCOUNTS</a>
                    <a href="#" className="text-zinc-300 mb-2">SEMINAR ATTENDED LISTS</a>
                    <a href="#" className="text-zinc-300 mb-2">CREATE ANNOUNCEMENTS / SEMINARS</a>
                    <a href="#" className="text-zinc-300 mb-2">ADD CURRICULUM</a>
                    </nav>
                </aside>
                <main className="flex-1 bg-green-700 p-4 m-4">
                    <h1 className="text-3xl font-bold mb-4">WELCOME ADMINS</h1>
                    <h2 className="text-xl font-semibold mb-2">ANNOUNCEMENT:</h2>
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h3 className="font-bold">ACCOUNCEMENT</h3>
                    <p className="text-zinc-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                    <button className="text-purple-600 hover:underline mt-2">CLOSE</button>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <h3 className="font-bold">ANNOUNCEMENT</h3>
                    <p className="text-zinc-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.</p>
                    <button className="text-purple-600 hover:underline mt-2">CLOSE</button>
                    </div>
                </main>
                <aside className="w-full md:w-1/4 bg-zinc-300 p-4 m-4">
                    <Calendar />
                </aside>
            </div>
        </div>
        
      );
    };
    
export default AnnouncementAdm;