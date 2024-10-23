import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useToast,
  Flex,
  Image
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
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
  const { isLoggedIn } = useAuth();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const albumsPerPage = 5;

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "You are logged out",
        description: "Please log in to access this page.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      setAlbums([]);
      setPhotos([]);
      setLoading(false);
      return;
    }

    fetchUserAndAlbums();
  }, [isLoggedIn, userId, toast]);

  const fetchUserAndAlbums = async () => {
    try {
      const [userResponse, albumsResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
        fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
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
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
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
      isClosable: true
    });
  };

  useEffect(() => {
    if (albums.length) {
      fetchAlbumDetails(albums[0].id);
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box
      padding="1rem"
      mx={{ base: "20px", md: "auto" }}
      maxW="1200px"
      minWidth="200px"
    >
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
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Image
              src={photo.url}
              alt={photo.title}
              width="100%"
              height="auto"
            />
            <Box p={3} textAlign="center">
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
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        flexDirection={{ base: "row", sm: "row" }}
      >
        {" "}
        <Button
          onClick={handlePreviousPage}
          isDisabled={currentPage === 1}
          aria-label="Previous Page"
        >
          &#9664; {/* Left arrow */}
        </Button>
        <Text fontSize={{ base: "sm", sm: "md" }} textAlign="center">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          &#9654; {/* Right arrow */}
        </Button>
      </Flex>
    </Box>
  );
};

export default UserAlbums;
