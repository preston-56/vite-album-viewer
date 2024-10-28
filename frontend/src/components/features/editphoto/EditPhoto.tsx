import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  useToast,
  Text,
  Flex
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface Photo {
  id: number;
  title: string;
  url: string;
  album_id: number;
}

interface Album {
  user_id: number;
  album_id: number;
  title: string;
}

const EditPhoto: React.FC = () => {
  const { photo_id } = useParams<{ photo_id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_AWS_API_URL;

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/photos/${photo_id}`);
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
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [photo_id, toast, apiUrl]);

  const handleSave = async () => {
    if (photo_id) {
      try {
        const response = await fetch(`${apiUrl}/api/photos/${photo_id}/title`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newTitle })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to update photo title: ${response.status}, ${errorText}`
          );
        }

        // Refetch the updated photo to get album_id
        const updatedPhoto = await response.json();
        setPhoto(updatedPhoto);

        toast({
          title: "Title Updated!",
          description: "Photo title updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true
        });

        // Fetch the album to get user_id
        const albumResponse = await fetch(
          `${apiUrl}/api/albums/${updatedPhoto.album_id}`
        );
        if (!albumResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const albumData: Album = await albumResponse.json();

        navigate(`/users/${albumData.user_id}/albums/`);
      } catch (error) {
        console.error("Error saving photo:", error);
        toast({
          title: "Error",
          description: "Failed to save photo title.",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
    }
  };

  return (
    <Box padding="1rem" mx={{ base: "20px", md: "auto" }} maxW="800px">
      <Heading as="h2" mb={4}>
        Edit Photo Title
      </Heading>
      {loading ? (
        <Box textAlign="center" py={10}>
          <Flex justifyContent="center" alignItems="center">
            <Loader message="" size={40} color="3498db" />
            <Text ml={4}>loading...</Text>
          </Flex>
        </Box>
      ) : photo ? (
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
        <Heading as="h4">Failed to load photo details.</Heading>
      )}
    </Box>
  );
};

export default EditPhoto;
