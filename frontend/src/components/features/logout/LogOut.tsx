import React from 'react';
import { Button } from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../AuthContext/AuthContext';
import {auth} from '../login/firebaseConfig'
import { useToast } from '@chakra-ui/react';

const LogOut: React.FC = () => {
  const { setIsLoggedIn } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn"); 
      setIsLoggedIn(false); 
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      window.location.reload(); 
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "There was an error logging you out. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Button colorScheme="red" onClick={handleLogout}>
            Logout
        </Button>
    </div>
  );
};

export default LogOut;
