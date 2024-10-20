import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  useToast,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface Photo {
  id: number;
  title: string;
  url: string;
}

interface User {
  id: number;
  name: string;
}

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAlbums, setTotalAlbums] = useState<number>(0);
  const [userId, setUserId] = useState<number>(1);
  const [userName, setUserName] = useState<string>(""); // State for user name
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhotos = async () => {
      if (albumId) {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
            {
              mode: "cors", 
              headers: {
                "Cross-Origin-Embedder-Policy": "require-corp",
                "Cross-Origin-Opener-Policy": "same-origin",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          console.error("Error fetching photos:", error);
          toast({
            title: "Error",
            description: "Failed to load photos.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPhotos();
  }, [albumId, toast]);

  useEffect(() => {
    const fetchTotalAlbums = async () => {
      if (albumId) {
        const currentAlbumId = parseInt(albumId);
        setUserId(Math.floor((currentAlbumId - 1) / 10) + 1); // Calculate user ID based on album ID
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setTotalAlbums(data.length);

          // Fetch user information
          const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
          if (!userResponse.ok) {
            throw new Error("Network response was not ok");
          }
          const userData: User = await userResponse.json();
          setUserName(userData.name); // Set the user name
        } catch (error) {
          console.error("Error fetching albums or user:", error);
          toast({
            title: "Error",
            description: "Failed to load albums or user.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };

    fetchTotalAlbums();
  }, [albumId, userId, toast]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Flex justifyContent="center" alignItems="center">
          <Loader message="" size={40} color="#3498db" />
          <Text ml={4}>Loading photos...</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={5}>
      {/* Header with Album Title and User Name */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">
          {userName}'s Album {albumId}
        </Heading>
        <Button
          colorScheme="blue"
          onClick={() => navigate("/users")} // Adjust this path according to your routing
        >
          Back to Users
        </Button>
      </Flex>

      {/* Photo Grid */}
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {photos.map((photo) => (
          <Box key={photo.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={photo.url} alt={photo.title} />
            <Box p={3}>
              <Text fontWeight="bold">{photo.title}</Text>
              <Link to={`/edit-photo/${photo.id}`}>
                <Button mt={2} colorScheme="blue">
                  Edit Title
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Pagination Controls */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Text mb={2}>Select an Album:</Text>
        <ButtonGroup spacing={2}>
          {Array.from({ length: totalAlbums }).map((_, index) => {
            const albumNumber = index + 1;
            return (
              <Button
                key={albumNumber}
                onClick={() => navigate(`/albums/${albumNumber}`)}
                colorScheme={albumId === albumNumber.toString() ? "teal" : "gray"}
              >
                {albumNumber}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Album;
