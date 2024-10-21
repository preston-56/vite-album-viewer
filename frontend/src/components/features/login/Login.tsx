import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Loader from "../../Loader/Loader";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  /**check login status once on mount**/
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = !!localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        navigate("/home");
      }
    };
    checkLoginStatus();
  }, [navigate]);

  const handleLogin = async (
    loginMethod: "email" | "google",
    email?: string,
    password?: string,
  ) => {
    setLoading(true);
    try {
      let userCredential;

      if (loginMethod === "email") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email!,
          password!,
        );
      } else {
        const provider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, provider);
      }

      if (userCredential.user) {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true); /*update local state*/

        toast({
          title: `${loginMethod === "email" ? "Login" : "Google Login"} successful.`,
          description: "You've logged in successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        loginMethod === "email"
          ? "Invalid email or password."
          : "There was an issue with Google sign-in.";
      console.error(`${loginMethod} sign-in error: `, error);
      toast({
        title: `${loginMethod === "email" ? "Login" : "Google Login"} failed.`,
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin("email", email, password);
  };

  const handleGoogleLogin = async () => {
    if (isLoggedIn) {
      return; /**Prevent further action if already logged in**/
    }
    await handleLogin("google");
  };

  if (isLoggedIn) {
    return (
      <Box maxW="md" mx="auto" mt={10} p={6}>
        <Heading mb={6}>You're already logged in!</Heading>
        <Text mb={4}>
          Click <Link to="/home">here</Link> to go to your dashboard.
        </Text>
      </Box>
    );
  }

  return (
    <Box  
    padding="1rem" 
    mx={{ base: "20px", md: "auto" }} 
    maxW="800px"
    mt={10}
    p={6}
    borderWidth={1}
    borderRadius="lg"
    boxShadow="lg"
  >
      {loading ? (
       <Box textAlign="center" py={10}>
       <Flex justifyContent="center" alignItems="center">
         <Loader message="" size={40} color="3498db" />
         <Text ml={4}>Authenticating, please wait...</Text>
       </Flex>
     </Box>
      ) : (
        <>
          <Heading mb={6}>Login</Heading>
          <form onSubmit={handleEmailLogin}>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                variant="filled"
                focusBorderColor="teal.500"
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                variant="filled"
                focusBorderColor="teal.500"
              />
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                variant="link"
                mt={2}
                position="absolute"
                right={0}
                bottom={3}
                mr={3}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </form>
          <Text mt={2}>
            New here?{" "}
            <Link to="/signup">
              <Text as="span" color="blue.500" fontWeight="bold">
                Sign up!
              </Text>
            </Link>
          </Text>
          <Button
            mt={4}
            colorScheme="blue"
            width="full"
            onClick={handleGoogleLogin}
            isLoading={loading}
          >
            Continue with Google
          </Button>
        </>
      )}
    </Box>
  );
};

export default Login;
