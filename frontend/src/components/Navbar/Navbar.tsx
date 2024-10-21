import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { auth } from "../features/login/firebaseConfig";
import { signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("isLoggedIn");

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <Box bg="teal.500" padding="1rem">
      <Flex alignItems="center" justify="space-between">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Heading size="md" color="white" marginRight={2}>
            📸 Photo Gallery
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
              <Button
                colorScheme="red"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
