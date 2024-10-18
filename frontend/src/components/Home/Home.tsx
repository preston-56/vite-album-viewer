import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Card,
  CardBody,
  Flex,
} from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Album {
  id: number;
  title: string;
  userId: number;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const albumResponse = await fetch("https://jsonplaceholder.typicode.com/albums");

        const usersData = await userResponse.json();
        const albumsData = await albumResponse.json();

        setUsers(usersData);
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
        textAlign="center"
        bg="gray.100"
      >
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
        <Text mt={4} fontSize="xl">
          Loading users and albums...
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h1" mb={6}>
        Users and Albums
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {users.map((user) => (
          <Card key={user.id} borderWidth="1px" borderRadius="lg">
            <CardBody>
              <Heading size="md">{user.name}</Heading>
              <Text>Email: {user.email}</Text>
              <Text>
                Albums:{" "}
                {albums.filter((album) => album.userId === user.id).length}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
