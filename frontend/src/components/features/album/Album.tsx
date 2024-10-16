import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Spinner,
  SimpleGrid,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";

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
        const response = await api.get<Photo[]>(`/api/photos?albumId=${albumId}`);
        setPhotos(response.data);
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
  }, [albumId, toast]);

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
