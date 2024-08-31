import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

// Mock function to check authentication and role
const useAuth = () => {
  const user = { isAuthenticated: true, role: 'student' }; // Example: Replace with real auth logic
  return user;
};

interface ProtectedRouteProps {
  role: string; // Expected role for the route (admin or user)
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (userRole !== role) {
    // Redirect to home if user role doesn't match
    return <Navigate to="/" />;
  }

  // Render the matched route
  return <Outlet />;
};

export default ProtectedRoute;