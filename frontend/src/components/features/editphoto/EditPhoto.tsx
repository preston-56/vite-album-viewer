import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  useToast
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

interface Photo {
  id: number;
  title: string;
  url: string;
  albumId: number;
}

const EditPhoto: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
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

        // check for existing title in local storage
        const savedTitle = localStorage.getItem(`photoTitle-${photoId}`);
        if (savedTitle) {
          data.title = savedTitle;
        }

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
  }, [photoId, toast]);

  const handleSave = () => {
    // simulate saving title by s storing it in local storage
    if (photoId) {
      localStorage.setItem(`photoTitle-${photoId}`, newTitle);

      setPhoto((prevPhoto) =>
        prevPhoto ? { ...prevPhoto, title: newTitle } : prevPhoto
      );

      toast({
        title: "Title Updated!",
        description: "Photo title updated and saved locally.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      /**
       * This is the main album for each specified user.
       * The specified user has 10 albums.
       * Each album displays 50 photos.
       * Therefore, each specied user has a total of 500 photos for the 10 albums.
       */
      navigate(`/albums/${photo?.albumId}`);
    }
  };

  return (
    <Box padding="1rem" mx={{ base: "20px", md: "auto" }} maxW="800px">
      <Heading as="h2" mb={4}>
        Edit Photo Title
      </Heading>
      {loading ? (
        <Loader />
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

/**
 * Photo Title Editing Implementation with JSONAPI
 * 
 * current approach
 * - using local storage to save the titke after editing.
 * - this change update almost immediately but there are concerns.
 * 
 * concerns: 
 * - local storage data is lost after logging out or clearing the browser.
 * - therefore, this is not a reliable way to keep user data.
 * 
 * What I should do:
 * - Send a PATCH/PUT request to a backend server to save changes.
 * - Use a GET request to fetch and display the updated title afterward.
 * 
 * Benefits of Backend:
 * - Keeps user data consistent across sessions.
 * - Users can access their changes anytime, on any device.
 * - Follows better practices for data management.
 * 
 **/ 