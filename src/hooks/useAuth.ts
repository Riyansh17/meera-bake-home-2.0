import { useState, useEffect } from 'react';
import { isAdminLoggedIn } from '@/firebase/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
    setLoading(false);
  }, []);

  const updateAuth = () => {
    setIsAuthenticated(isAdminLoggedIn());
  };

  return { isAuthenticated, loading, updateAuth };
};