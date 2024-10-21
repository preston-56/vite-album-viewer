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
  Avatar,
  VStack,
  Divider,
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
        const userResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        const albumResponse = await fetch(
          "https://jsonplaceholder.typicode.com/albums",
        );

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
        <Text mt={4} fontSize="xl" color="gray.600">
          Loading users and albums...
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={{ base: 4, md: 8 }} mx="auto"  bg="gray.50" minHeight="100vh">
      <Heading as="h4" mb={8} textAlign="center" color="blue.700">
        Users and Albums
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {users.map((user) => (
          <Card
            key={user.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            shadow="md"
            _hover={{ transform: "scale(1.05)", transition: "0.3s ease" }}
          >
            <CardBody>
              <Flex alignItems="center" mb={4} mr={2}>
                <Avatar
                  name={user.name}
                  size="md"
                  mr={4}
                  bg="blue.500"
                  color="white"
                />
                <VStack
                  align="start"
                  spacing={{ base: 1, md: 2 }}
                  pr={{ base: 3, md: 5 }}
                >
                  <Heading size={{ base: "sm" }} color="blue.400">
                    {user.name}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: "sm" }} mr={4}>
                    Email: {user.email}
                  </Text>
                </VStack>
              </Flex>
              <Divider mb={4} />
              <Text color="gray.600">
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
