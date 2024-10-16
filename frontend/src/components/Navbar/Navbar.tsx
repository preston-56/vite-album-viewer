import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Box bg="teal.500" padding="1rem">
      <Flex alignItems="center" justify="space-between">
        <Heading size="md" color="white" marginRight={2}>
          Sage
        </Heading>
        <Flex alignItems="center" gap={2}>
          <Button colorScheme="teal" variant="outline" as={Link} to="/">
            Home
          </Button>
          <Button colorScheme="teal" variant="outline" as={Link} to="/users">
            Users
          </Button>
          <Button colorScheme="teal" variant="outline" as={Link} to="/login">
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
