import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface Photo {
  id: number;
  title: string;
  url: string;
}

const Album: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
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
    };

    fetchPhotos();
  }, [albumId, toast]); // Add toast to dependencies for better practice

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Loader message="Loading photos..." size={40} color="#3498db" />
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading as="h1" mb={6}>
        Album {albumId}
      </Heading>
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
              <Button
                mt={2}
                onClick={() => alert(`Edit title of ${photo.title}`)}
              >
                Edit Title
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Album;
