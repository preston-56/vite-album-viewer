import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "firebase/auth";
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
  InputGroup,
  InputRightElement,
  Flex,
  Text
} from "@chakra-ui/react";

import { BiHide, BiShow } from "react-icons/bi";
import Loader from "../../Loader/Loader";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setEmailValidating(true);

    if (!validateEmail(email)) {
      setEmailValidating(false);
      toast({
        title: "Invalid Email",
        description: "Please enter a valid Gmail address.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user);
      await signOut(auth); // Sign out the user immediately after sign-up

      console.log("User signed up successfully:", user);
      toast({
        title: "Sign Up successful.",
        description:
          "You've signed up successfully! Please check your email to verify.",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      setTimeout(() => {
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
    } finally {
      setLoading(false);
      setEmailValidating(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
      <form onSubmit={(e) => e.preventDefault()}>
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
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              variant="filled"
              focusBorderColor="teal.500"
            />
            <InputRightElement>
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          width="full"
          onClick={handleSignUp}
          disabled={loading || emailValidating}
        >
          <Flex align="center" justify="center">
            {loading || emailValidating ? (
              <>
                <Loader message="" size={20} color="#3498db" />
                <Text ml={4} color="white">
                  validating...
                </Text>
              </>
            ) : (
              "Sign Up"
            )}
          </Flex>
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
