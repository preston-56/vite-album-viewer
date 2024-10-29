import { useState } from "react";
import { Box, Heading, Text, Button, Flex, VStack } from "@chakra-ui/react";
import Login from "../features/login/Login";
import Loader from "../Loader/Loader";

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
          direction="column"
          align="center"
          maxW={{ base: "90%", md: "800px" }}
          mx="auto"
          p={8}
          borderRadius="lg"
          boxShadow="2xl"
          bg="white"
          color="gray.700"
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
            fontSize={{ base: "3xl", md: "4xl" }}
            mb={4}
            color="teal.500"
          >
            The Vault Gallery
          </Heading>

          <VStack spacing={4} align="center" mb={6} px={{ base: 4, md: 0 }}>
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
              Discover user albums, explore photos, and personalize your
              experience.
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
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
              mt={4}
            >
              Get Started
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default LandingPage;
