import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Card,
  CardBody,
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
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
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
