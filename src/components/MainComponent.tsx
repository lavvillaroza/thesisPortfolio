import React, { useState } from 'react';
import Login from './Auth/Login';
import Register from './student/Register';

const MainComponent: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
    </div>
  );
};

export default MainComponent;