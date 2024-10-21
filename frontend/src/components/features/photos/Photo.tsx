import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Image, useToast } from "@chakra-ui/react";
import Loader from "../../Loader/Loader";

interface Photo {
  id: number;
  title: string;
  url: string;
}

const Photo: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${albumId}`,
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        console.error("Error fetching photo:", error);
        toast({
          title: "Error",
          description: "Failed to load photo.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [albumId, toast]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Loader message="Loading photo..." size={40} color="#3498db" />
      </Box>
    );
  }

  return (
    <Box p={5}>
      {photo && (
        <>
          <Heading as="h1" mb={6}>
            {photo.title}
          </Heading>
          <Image src={photo.url} alt={photo.title} />
        </>
      )}
    </Box>
  );
};

export default Photo;
