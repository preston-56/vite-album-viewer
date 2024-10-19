import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";

interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
}

const EditPhoto: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos/${photoId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPhoto(data);
        setNewTitle(data.title);
      } catch (error) {
        console.error("Error fetching photo:", error);
        toast({
          title: "Error",
          description: "Failed to load photo details.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPhoto();
  }, [photoId, toast]);

  const handleSave = () => {
    // Simulate saving the title (usually would be a PUT request)
    setPhoto((prevPhoto) => (prevPhoto ? { ...prevPhoto, title: newTitle } : prevPhoto));

    toast({
      title: "Success",
      description: "Photo title updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Navigate back to the album after saving
    navigate(`/albums/${photo?.albumId}`);
  };

  return (
    <Box p={5}>
      <Heading as="h2" mb={4}>
        Edit Photo Title
      </Heading>
      {photo ? (
        <FormControl>
          <FormLabel>Photo Title</FormLabel>
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Button colorScheme="blue" mt={4} onClick={handleSave}>
            Save
          </Button>
        </FormControl>
      ) : (
        <Heading as="h4">Loading...</Heading>
      )}
    </Box>
  );
};

export default EditPhoto;
