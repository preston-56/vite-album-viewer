import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, useToast, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface User {
  id: number;
  name: string;
  albumCount: number;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const albumResponse = await fetch(
          "https://jsonplaceholder.typicode.com/albums",
        );

        if (!userResponse.ok || !albumResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const usersData = await userResponse.json();
        const albumsData = await albumResponse.json();

        const usersWithAlbumCount = usersData.map((user: any) => ({
          id: user.id,
          name: user.name,
          albumCount: albumsData.filter(
            (album: any) => album.userId === user.id,
          ).length,
        }));

        setUsers(usersWithAlbumCount);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error fetching users.",
          description: "There was an error fetching the user data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Flex justifyContent="center" alignItems="center">
          <Loader message="" size={40} color="3498db" />
          <Text ml={4}>Loading users, please wait...</Text>
        </Flex>
      </Box>
    );
  }

  const handleViewAlbums = (userId: number) => {
    // Navigate to the user's albums using the correct URL format
    navigate(`/users/${userId}/albums`);
  };

  return (
    <VStack spacing={4} padding={4}>
      {users.map((user) => (
        <Box
          key={user.id}
          borderWidth={1}
          borderRadius="lg"
          padding={4}
          width="100%"
        >
          <Text fontSize="xl">{user.name}</Text>
          <Text fontSize="md">Albums: {user.albumCount}</Text>
          <Button
            colorScheme="teal"
            marginTop={2}
            onClick={() => handleViewAlbums(user.id)}
          >
            View Albums
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default Users;
