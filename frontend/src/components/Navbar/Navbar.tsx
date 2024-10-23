import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Heading, Button, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../AuthContext/AuthContext";
import LogOut from "../features/logout/LogOut";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      timer = setTimeout(() => {
        onToggle(); 
      }, 10000); 

      return () => clearTimeout(timer);
    }
  }, [isOpen, onToggle]);

  const renderUserButtons = () => (
    <Flex direction={{ base: "column", md: "row" }} alignItems="center" gap={2} width="100%">
      <Button
        colorScheme="blue"
        variant="solid"
        as={Link}
        to="/users"
        size="lg"
        width="100%"
      >
        Users
      </Button>
      <Button
        onClick={LogOut}
        colorScheme="orange"
        variant="solid"
        size="lg"
        width="100%"
      >
        Log Out
      </Button>
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
        {/* Hamburger Icon for Mobile */}
        <Box display={{ base: "flex", md: "none" }} onClick={onToggle}>
          <HamburgerIcon boxSize={6} color="white" aria-label="Open menu" />
        </Box>

        {/* Close Icon for Mobile */}
        {isOpen && (
          <Box onClick={onToggle} marginLeft={2} marginBottom={0.5}>
            <CloseIcon boxSize={4} color="white" aria-label="Close menu" />
          </Box>
        )}

        {/* Title closer to Hamburger */}
        <Link to="/home" style={{ textDecoration: "none", flex: 1, textAlign: 'center' }}>
          <Heading size="sm" color="white">
            📸 The Vault Gallery
          </Heading>
        </Link>

        {/* Desktop User Buttons */}
        <Flex display={{ base: "none", md: "flex" }}>
          {isLoggedIn && renderUserButtons()}
        </Flex>
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
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
