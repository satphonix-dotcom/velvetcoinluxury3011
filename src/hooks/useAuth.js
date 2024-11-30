import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../store/slices/authSlice';
import { getCurrentUser, setAuthToken } from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        setAuthToken(token);
        try {
          const userData = await getCurrentUser();
          if (userData) {
            dispatch(loginSuccess({ user: userData, token }));
          } else {
            dispatch(loginFailure('Session expired'));
          }
        } catch (error) {
          dispatch(loginFailure(error.message));
        }
      }
    };

    initializeAuth();
  }, [dispatch]);
};

export default useAuth;