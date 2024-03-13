import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from './UserService';

type UseAuthCheckProps = {
  setLoggedIn: (value: boolean) => void;
  shouldRedirect?: boolean;
};

const useAuthCheck = ({ setLoggedIn, shouldRedirect = true }: UseAuthCheckProps) => {
  const navigate = useNavigate();

  const fetchLoggedIn = useCallback(async () => {
    try {
      const loggedInStatus = await isLoggedIn();
      if (loggedInStatus) {
        setLoggedIn(true);
      } else if (shouldRedirect){
        navigate("/login/redirected");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }, [navigate, setLoggedIn]);

  useEffect(() => {
    fetchLoggedIn();
  }, [fetchLoggedIn]);
};

export default useAuthCheck;