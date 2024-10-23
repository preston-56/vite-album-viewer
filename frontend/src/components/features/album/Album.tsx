import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  useToast,
  Flex
} from "@chakra-ui/react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
            `https://jsonplaceholder.typicode.com/albums/${albumId}`
          );
          if (!albumResponse.ok) throw new Error("Network response was not ok");
          const albumData: Album = await albumResponse.json();
          const userId = albumData.userId;

          // Fetch photos for the album
          const photoResponse = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
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
            `https://jsonplaceholder.typicode.com/users/${userId}`
          );
          if (!userResponse.ok) throw new Error("Network response was not ok");
          const userData: User = await userResponse.json();
          setUserName(userData.name);

          // Fetch albums for the current user
          const albumsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
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
            isClosable: true
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

  const handleNavigateAlbum = (direction: "next" | "prev") => {
    const currentAlbumIndex = userAlbums.findIndex(
      (album) => album.id === Number(albumId)
    );
    const nextAlbumIndex =
      direction === "next" ? currentAlbumIndex + 1 : currentAlbumIndex - 1;

    if (nextAlbumIndex >= 0 && nextAlbumIndex < userAlbums.length) {
      navigate(`/albums/${userAlbums[nextAlbumIndex].id}`);
    }
  };

  const currentAlbumIndex = userAlbums.findIndex(
    (album) => album.id === Number(albumId)
  );

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
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          onClick={() => handleNavigateAlbum("prev")}
          isDisabled={currentAlbumIndex === 0}
        >
          <ChevronLeftIcon />
        </Button>
        <Text>
          Page {currentAlbumIndex + 1} of {userAlbums.length}
        </Text>
        <Button
          onClick={() => handleNavigateAlbum("next")}
          isDisabled={currentAlbumIndex === userAlbums.length - 1}
        >
          <ChevronRightIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default Album;
