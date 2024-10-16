import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../login/firebaseConfig";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("User signed up successfully:", userCredential.user);
      toast({
        title: "Sign Up successful.",
        description: "You've signed up successfully! You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Optionally redirect to login or home page after sign up
    } catch (error) {
      if ((error as { code?: string; message?: string }).code) {
        toast({
          title: "Sign Up failed.",
          description: (error as { message: string }).message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error(
          "Sign up failed:",
          (error as { code: string }).code,
          (error as { message: string }).message,
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            variant="filled"
            focusBorderColor="teal.500"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Sign Up
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account? <Link to="/login">Log in here</Link>
      </Text>
    </Box>
  );
};

export default SignUp;
