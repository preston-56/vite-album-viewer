import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Flex,
  Avatar,
  VStack,
  Divider,
} from "@chakra-ui/react";
import Loader from "../Loader/Loader";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const albumResponse = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );

        const usersData = await userResponse.json();
        const albumsData = await albumResponse.json();

        setUsers(usersData);
        setAlbums(albumsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
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
        height="20vh"
        flexDirection="column"
        textAlign="center"
      >
        <Box textAlign="center" py={10}>
          <Flex justifyContent="center" alignItems="center">
            <Loader message="" size={40} color="#3498db" />
            <Text ml={4}>Loading users and albums....</Text>
          </Flex>
        </Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh"
        flexDirection="column"
        textAlign="center"
      >
        <Text fontSize="xl" color="red.500">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box padding="1rem" mx={{ base: "10px", md: "auto" }} maxW="1000px"> 
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
            maxW="450px" 
          >
            <CardBody>
              <Flex alignItems="flex-start" mb={4}>
                <Avatar
                  name={user.name}
                  size="md"
                  mr={2}
                  bg="blue.500"
                  color="white"
                />
                <VStack
                  align="start"
                  spacing={{ base: 1, md: 2 }}
                  pr={{ base: 3, md: 5 }}
                  overflow="hidden" 
                >
                  <Heading size={{ base: "sm" }} color="blue.400">
                    {user.name}
                  </Heading>
                  <Text color="gray.600" fontSize={{ base: "sm" }} isTruncated>
                    {user.email}
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
