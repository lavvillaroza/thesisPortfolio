import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import courseLogo from '../../assets/compsci2.png';
import schoolLogo from '../../assets/pasigIcon.jpg';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const { login, user } = useAuth(); // Get login function from context
    useEffect(() => {
      // If user is already logged in, navigate based on user type
      if (user) {
        navigate(user.usertype === 1 ? '/admin/*' : '/student/*');
      }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); // Reset the error state
  
      try {
        const usertype = isAdmin ? 1 : 0; // Determine user type
        await login({ username, password, usertype });
        // Redirect based on user type after successful login
        navigate(usertype === 1 ? '/admin/*' : '/student/*');
      } catch (error) {
        setError("Invalid credentials or login failed");
      }
    };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="max-w-md w-full flex justify-self-start m-4 ">
        <div className="w-24 h-24 rounded-full overflow-hidden ">
          <img src={schoolLogo} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50">
          <img src={courseLogo} alt="" className="w-full h-full object-fill" />
        </div>
      </div>
      <div className='flex justify-center mb-4 drop-shadow-lg'>
        <div className="max-w-md w-full space-y-10 bg-white padd p-8 rounded-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log In Account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className='padd pt-4'>
                <label htmlFor="username" className="sr-only">
                  UserName
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div className='padd pt-4 relative'>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"} // Show password if checkbox is checked
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10" // Add padding-right for the icon
                  placeholder="Password"
                />
                 <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 mt-4 text-gray-600"
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle password visibility
                  >
                    {isPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>

              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  id="admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)} // Update state based on checkbox
                />
                <label htmlFor="admin" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sign as Admin</label>
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
