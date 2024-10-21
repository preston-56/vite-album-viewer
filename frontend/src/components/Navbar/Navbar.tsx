import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useAuth } from "../AuthContext/AuthContext";
import LogOut from "../features/logout/LogOut";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box bg="teal.500" padding="1rem" mx={{ base: "20px", md: "auto" }} maxW="100%">
      <Flex alignItems="center" justify="space-between">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Heading size="sm" color="white" marginRight={2}>
            📸 Vault
          </Heading>
        </Link>
        <Flex alignItems="center" gap={2}>
          {isLoggedIn && (
            <>
              <Button
                colorScheme="teal"
                variant="outline"
                as={Link}
                to="/users"
              >
                Users
              </Button>
              <LogOut /> 
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
