import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  Image
} from "@chakra-ui/react";
import Login from "../features/login/Login";
import Loader from "../Loader/Loader";
import landingPhoto from "../../../public/photo.png";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowLogin(true);
    }, 1000);
  };

  return (
    <Box
      textAlign="center"
      p={{ base: 6, md: 10 }}
      minHeight="100vh"
      bg="white"
      color="gray.700"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {showLogin ? (
        <Login />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          maxW={{ base: "90%", md: "1200px" }}
          mx="auto"
          mt={{ base: 4, md: 0 }}
        >
          <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="2xl"
            width={{ base: "100%", md: "100%" }}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
            p={4}
            bg="white"
          >
            <Image
              src={landingPhoto}
              alt="Description of the image"
              boxSize={{ base: "100%", md: "400px" }}
              objectFit="cover"
              borderRadius="lg"
            />
            <Flex
              direction="column"
              align="flex-start"
              justify="center"
              px={4}
              maxW={{ base: "100%", md: "60%" }}
              marginTop={{ base: 4, md: 0 }} 
            >
              <Heading
                as="h6"
                fontSize={{ base: "xl", md: "2xl" }}
                mb={2}
                color="teal.600"
              >
                Welcome to
              </Heading>
              <Heading
                fontSize={{ base: "xl", md: "2xl" }} 
                mb={4}
                color="teal.500"
              >
                The Vault Gallery
              </Heading>
              <VStack
                spacing={1} 
                align="flex-start"
                mb={6}
              >
                <Text fontSize={{ base: "sm", md: "md" }} textAlign="left">
                  Discover user albums, explore photos, and personalize your experience.
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} textAlign="left">
                  Start by signing in to enjoy seamless access to all features!
                </Text>
              </VStack>
              {loading ? (
                <Box textAlign="center" py={10}>
                  <Flex justifyContent="center" alignItems="center">
                    <Loader message="" size={40} color="#3498db" />
                    <Text ml={4}>Loading...</Text>
                  </Flex>
                </Box>
              ) : (
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={handleGetStarted}
                  _hover={{ bg: "teal.600" }}
                  px={8}
                  py={6}
                  borderRadius="full"
                  width={{ base: "80%", md: "auto" }}
                >
                  Get Started
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default LandingPage;
