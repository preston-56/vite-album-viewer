import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup
} from "firebase/auth";
import { useAuth } from "../../AuthContext/AuthContext";
import Loader from "../../Loader/Loader";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  /** check login status on auth state change **/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      if (user && user.emailVerified) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [setIsLoggedIn]);

  const handleLogin = async (
    loginMethod: "email" | "google",
    email?: string,
    password?: string
  ) => {
    setLoading(true);
    try {
      let userCredential;

      if (loginMethod === "email") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email!,
          password!
        );

        await userCredential.user.reload();
        const user = userCredential.user;

        if (!user.emailVerified) {
          toast({
            title: "Email Not Verified",
            description: "Please verify your email before logging in.",
            status: "error",
            duration: 3000,
            isClosable: true
          });
          await auth.signOut();
          return;
        }
      } else {
        const provider = new GoogleAuthProvider();
        userCredential = await signInWithPopup(auth, provider);
      }

      if (userCredential.user) {
        setIsLoggedIn(true);

        toast({
          title: `${loginMethod === "email" ? "Login" : "Google Login"} successful.`,
          description: "You've logged in successfully!",
          status: "success",
          duration: 3000,
          isClosable: true
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
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in both email and password fields.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }

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
          Click
          <Link to="/home">
            <Text as="span" color="teal.500" fontWeight="bold">
              here
            </Text>
          </Link>{" "}
          to go to your dashboard.
        </Text>
      </Box>
    );
  }

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
      {loading ? (
        <Box textAlign="center" py={10}>
          <Flex justifyContent="center" alignItems="center">
            <Loader message="" size={40} color="#3498db" />
            <Text ml={4}>Signing in...</Text>
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
