import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../login/firebaseConfig";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  IconButton,
  Text
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid Gmail address.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully:", userCredential.user);
      toast({
        title: "Sign Up successful.",
        description: "You've signed up successfully! You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      setTimeout(()=>{
        navigate("/login");
      }, 3000);
    } catch (error) {
      if ((error as { code?: string; message?: string }).code) {
        toast({
          title: "Sign Up failed.",
          description: (error as { message: string }).message,
          status: "error",
          duration: 3000,
          isClosable: true
        });
        console.error(
          "Sign up failed:",
          (error as { code: string }).code,
          (error as { message: string }).message
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

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
      <Heading mb={6} textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSignUp}>
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
          Sign Up
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Have an account?{" "}
        <Link to="/login">
          <Text as="span" color="blue.500" fontWeight="bold">
            Log in
          </Text>
        </Link>
      </Text>
    </Box>
  );
};

export default SignUp;
