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

interface Album {
  userId: number;
  id: number;
  title: string;
}

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      if (albumId) {
        try {
          // Fetch album details
          const albumResponse = await fetch(
            `https://jsonplaceholder.typicode.com/albums/${albumId}`,
          );
          if (!albumResponse.ok) throw new Error("Network response was not ok");
          const albumData: Album = await albumResponse.json();
          const userId = albumData.userId;

          // Fetch photos for the album
          const photoResponse = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
          );
          if (!photoResponse.ok) throw new Error("Network response was not ok");
          const photosData = await photoResponse.json();



          // Update the titles from local storage
          const updatedPhotos = photosData.map((photo: Photo) => {
            const savedTitle = localStorage.getItem(`photoTitle-${photo.id}`);
            return {
              ...photo,
              title: savedTitle || photo.title 
            };
          });

          setPhotos(updatedPhotos);


          // Fetch user details
          const userResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`,
          );
          if (!userResponse.ok) throw new Error("Network response was not ok");
          const userData: User = await userResponse.json();
          setUserName(userData.name);

          // Fetch albums for the current user
          const albumsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
          );
          if (!albumsResponse.ok)
            throw new Error("Network response was not ok");
          const albumsData = await albumsResponse.json();
          setUserAlbums(albumsData);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast({
            title: "Error",
            description: "Failed to load album details.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAlbumDetails();
  }, [albumId, toast]);

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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h4" size="sm">
          {userName}'s Album Number: {albumId}
        </Heading>
        <Button colorScheme="blue" onClick={() => navigate("/users")}>
          Back to Users
        </Button>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        {photos.map((photo) => (
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
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Text mb={2}>Select Your Album Number:</Text>
        <ButtonGroup spacing={2}>
          {userAlbums.map((album) => (
            <Button
              key={album.id}
              onClick={() => navigate(`/albums/${album.id}`)}
              colorScheme={albumId === album.id.toString() ? "teal" : "gray"}
            >
              {album.id}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default Album;