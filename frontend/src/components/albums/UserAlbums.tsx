import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Box, Heading, Text, SimpleGrid, Image, Button, useToast, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Loader from "../Loader/Loader";

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
  user_id: number;
  album_id: number; 
  title: string;
}

const UserAlbums: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [userAlbums, setUserAlbums] = useState<Album[]>([]);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState<number>(0);
  const apiUrl = import.meta.env.VITE_AWS_API_URL;

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAlbums = async () => {
      if (!user_id) {
        toast({
          title: "Error",
          description: "User ID is missing.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      setLoading(true);
      try {
        // Fetch user details
        const userResponse = await fetch(`${apiUrl}/api/users/${user_id}`);

        if (!userResponse.ok) throw new Error("Network response was not ok");
        const userData: User = await userResponse.json();
        setUserName(userData.name);

        // Fetch albums for the user
        const albumsResponse = await fetch(`${apiUrl}/api/albums?user_id=${user_id}`);
        if (!albumsResponse.ok) throw new Error("Network response was not ok");
        const albumsData = await albumsResponse.json();
        setUserAlbums(albumsData);

        // Fetch photos for the first album
        if (albumsData.length > 0) {
          fetchAlbumPhotos(albumsData[0].album_id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to load user albums.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAlbums();
  }, [user_id, toast, apiUrl]);

  const fetchAlbumPhotos = async (album_id: number) => {
    try {
      const photoResponse = await fetch(`${apiUrl}/api/photos?album_id=${album_id}`);
      if (!photoResponse.ok) throw new Error("Network response was not ok");
      const photosData = await photoResponse.json();
      setPhotos(photosData);
    } catch (error) {
      console.error("Error fetching photos:", error);
      toast({
        title: "Error",
        description: "Failed to load album photos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNavigateAlbum = (direction: "next" | "prev") => {
    const nextAlbumIndex =
      direction === "next" ? currentAlbumIndex + 1 : currentAlbumIndex - 1;

    // Ensure nextAlbumIndex is within bounds
    if (nextAlbumIndex >= 0 && nextAlbumIndex < userAlbums.length) {
      setCurrentAlbumIndex(nextAlbumIndex);
      fetchAlbumPhotos(userAlbums[nextAlbumIndex].album_id); 
    } else {
      toast({
        title: "Navigation Error",
        description: `No ${direction} album available.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex direction={{ base: "column", md: "row" }} alignItems={{ base: "flex-start", md: "center" }}>
          <Heading as="h4" size={{ base: "xs", md: "sm" }} noOfLines={1} marginRight={{ md: 2 }}>
            {userName}
          </Heading>
          <Heading as="h4" size={{ base: "xs", md: "sm" }} noOfLines={1}>
            Album: {userAlbums[currentAlbumIndex]?.album_id} {/* Fetch current album ID */}
          </Heading>
        </Flex>
        <Button size={{ base: "sm", md: "md" }} colorScheme="blue" onClick={() => navigate("/users")}>
          Back to Users
        </Button>
      </Flex>

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
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          onClick={() => handleNavigateAlbum("prev")}
          isDisabled={currentAlbumIndex === 0}
        >
          <ChevronLeftIcon />
        </Button>
        <Text>
          Album {currentAlbumIndex + 1} of {userAlbums.length}
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

export default UserAlbums;
