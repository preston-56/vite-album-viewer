import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../AuthContext/AuthContext";
import LogOut from "../features/logout/LogOut";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  const renderUserButtons = () => (
    <Flex alignItems="center" gap={2}> 
      <Button
        colorScheme="blue"
        variant="solid"
        as={Link}
        to="/users"
        size="lg"
      >
        Users
      </Button>
      <LogOut /> 
    </Flex>
  );

  return (
    <Box
      bg="teal.500"
      padding="1rem"
      mx={{ base: "0", md: "auto" }}
      maxW="100%"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      height="60px"
    >
      <Flex alignItems="center" justify="space-between" height="100%">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Heading size="sm" color="white" marginRight={2}>
            📸 The Vault Gallery
          </Heading>
        </Link>

        {/* Desktop User Buttons */}
        <Flex display={{ base: "none", md: "flex" }}>
          {isLoggedIn && renderUserButtons()}
        </Flex>

        {/* Hamburger Icon for Mobile */}
        <Box display={{ base: "flex", md: "none" }} onClick={onToggle}>
          <HamburgerIcon boxSize={6} color="white" />
        </Box>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          display={{ base: "flex", md: "none" }}
          flexDirection="column"
          position="absolute"
          top="60px"
          left="0"
          right="0"
          bg="teal.500"
          padding="1rem"
          zIndex="999"
        >
          {isLoggedIn && renderUserButtons()}
          <CloseIcon 
           onClick={onToggle} 
           color="white" 
           boxSize={4} 
           marginTop={2} 
           marginBottom={2}
           marginLeft={2} />
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
