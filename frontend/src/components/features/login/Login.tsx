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
  useToast,
} from "@chakra-ui/react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (userCredential.user) {
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: "Login successful.",
          description: "You've logged in successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: "Invalid email or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: "Google Login successful.",
          description: "You've logged in successfully with Google!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/home");
      }
    } catch (error) {
      console.error("Google sign-in error: ", error);
      toast({
        title: "Google Login failed.",
        description: "There was an issue with Google sign-in.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={6}>Login</Heading>
      <form onSubmit={handleLogin}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
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
      >
        Continue with Google
      </Button>
    </Box>
  );
};

export default Login;
