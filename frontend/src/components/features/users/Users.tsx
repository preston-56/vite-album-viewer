import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await fetch("http://127.0.0.1:4000/api/users");
        const albumResponse = await fetch("http://127.0.0.1:4000/api/albums");

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
        <Loader message="Loading users, please wait..." />
      </Box>
    );
  }

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
          <Link to={`/albums/${user.id}`}>
            <Button colorScheme="teal" marginTop={2}>
              View Albums
            </Button>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default Users;
