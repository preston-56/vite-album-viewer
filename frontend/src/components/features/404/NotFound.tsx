import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" py={50}>
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" mb={8}>
        Sorry, the page you are looking for does not exist.
      </Text>
      <Link to="/">
        <Button colorScheme="blue" size="lg">
          Go Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
