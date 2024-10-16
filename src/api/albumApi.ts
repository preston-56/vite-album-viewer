import api from "./api";
import { Album } from "./interfaces/interfaces";

export const getAlbums = async (): Promise<Album[]> => {
  try {
    const response = await api.get<Album[]>("http://127.0.0.1:8001/albums/");
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};

export const getAlbumById = async (albumId: number): Promise<Album> => {
  try {
    const response = await api.get<Album>(
      `http://127.0.0.1:8001/albums/${albumId}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching album with ID ${albumId}:`, error);
    throw error;
  }
};

export const createAlbum = async (albumData: Album): Promise<Album> => {
  try {
    const response = await api.post<Album>(
      "http://127.0.0.1:8001/albums/",
      albumData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating album:", error);
    throw error;
  }
};

export const updateAlbum = async (
  albumId: number,
  albumData: Partial<Album>,
): Promise<Album> => {
  try {
    const response = await api.put<Album>(
      `http://127.0.0.1:8001/albums/${albumId}`,
      albumData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating album with ID ${albumId}:`, error);
    throw error;
  }
};

export const deleteAlbum = async (albumId: number): Promise<void> => {
  try {
    await api.delete(`http://127.0.0.1:8001/albums/${albumId}`);
  } catch (error) {
    console.error(`Error deleting album with ID ${albumId}:`, error);
    throw error;
  }
};
