

import React, { useState } from 'react';
import courseLogo from '../assets/compsci2.png';
import schoolLogo from '../assets/pasigIcon.jpg';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your login logic here
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-200">   
      <div className="max-w-md w-full flex justify-self-start m-4 ">
          <div className="w-24 h-24 rounded-full overflow-hidden ">
            <img src={schoolLogo} alt="" className="w-full h-full object-cover" />
          </div>
      </div>    
      <div className="flex justify-center mb-4">
          <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-50">
            <img src={courseLogo} alt="" className="w-full h-full object-fill" />
          </div>
      </div>
      <div className='flex justify-center mb-4 drop-shadow-lg'>
        <div className="max-w-md w-full space-y-10 bg-white padd p-8 rounded-lg">        
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className='padd pt-4'>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className='padd pt-4'>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className='padd pt-4'>
                <label htmlFor="repassword" className="sr-only">
                  Password
                </label>
                <input
                  id="repassword"
                  name="repassword"
                  type="repassword"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Re-Password"
                />
              </div>
            </div>
           
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default Register;