import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useToast,
  Flex,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  id: number;
  title: string;
  url: string;
}

const UserAlbums: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const toast = useToast();
  const navigate = useNavigate();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const albumsPerPage = 5;

  const fetchUserAndAlbums = async () => {
    try {
      const [userResponse, albumsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
      ]);

      if (!userResponse.ok || !albumsResponse.ok) {
        throw new Error("Failed to fetch user data or albums");
      }

      const userData = await userResponse.json();
      setUserName(userData.name);
      const albumsData = await albumsResponse.json();
      setAlbums(albumsData);
    } catch (error) {
      handleError(error, "Failed to load user or albums.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbumDetails = async (albumId: number) => {
    try {
      const photosResponse = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
      );
      if (!photosResponse.ok) throw new Error("Network response was not ok");
      const photosData = await photosResponse.json();
      setPhotos(photosData);
    } catch (error) {
      handleError(error, "Failed to load album details.");
    }
  };

  const handleError = (error: any, message: string) => {
    console.error("Error fetching data:", error);
    const errorMessage = error instanceof Error ? error.message : message;
    toast({
      title: "Error",
      description: errorMessage,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchUserAndAlbums();
  }, [userId]);

  useEffect(() => {
    if (albums.length) {
      fetchAlbumDetails(albums[0].id); // Fetch details for the first album
    }
  }, [albums]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Flex justifyContent="center" alignItems="center">
          <Loader message="" size={40} color="#3498db" />
          <Text ml={4}>Loading albums...</Text>
        </Flex>
      </Box>
    );
  }

  // Pagination Logic
  const indexOfLastPhoto = currentPage * albumsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - albumsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(photos.length / albumsPerPage);

  return (
    <Box padding="1rem" mx={{ base: "20px", md: "auto" }} maxW="800px">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h4" size="sm">
          <Text fontSize="sm" mb={4}>
            {userName}'s Albums
          </Text>
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate("/users")}>
          Back to Users
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {currentPhotos.map((photo) => (
          <Box
            key={photo.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
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
      <Flex justifyContent="center" mt={4}>
        <ButtonGroup spacing={2}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              colorScheme={currentPage === index + 1 ? "teal" : "gray"}
            >
              {index + 1}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default UserAlbums;
