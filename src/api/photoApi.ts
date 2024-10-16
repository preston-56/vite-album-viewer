import api from "./api";
import { PhotoResponse, SimplifiedPhoto } from "./interfaces/interfaces";

const handleError = (error: unknown, action: string) => {
  console.error(`Error ${action}:`, error);
  throw error;
};

export const getPhotos = async (): Promise<SimplifiedPhoto[]> => {
  try {
    const { data } = await api.get<SimplifiedPhoto[]>("/photos/");
    return data;
  } catch (error) {
    handleError(error, "fetching photos");
    return [];
  }
};

export const getPhotoById = async (
  photoId: number,
): Promise<PhotoResponse | null> => {
  try {
    const { data } = await api.get<PhotoResponse>(`/photos/${photoId}`);
    return data;
  } catch (error) {
    handleError(error, `fetching photo with ID ${photoId}`);
    return null;
  }
};

export const createPhoto = async (
  newPhoto: Omit<PhotoResponse, "id">,
): Promise<PhotoResponse | null> => {
  try {
    const { data } = await api.post<PhotoResponse>("/photos/", newPhoto);
    return data;
  } catch (error) {
    handleError(error, "creating photo");
    return null;
  }
};

export const updatePhoto = async (
  photoId: number,
  updatedPhoto: PhotoResponse,
): Promise<PhotoResponse | null> => {
  try {
    const { data } = await api.put<PhotoResponse>(
      `/photos/${photoId}`,
      updatedPhoto,
    );
    return data;
  } catch (error) {
    handleError(error, `updating photo with ID ${photoId}`);
    return null;
  }
};

export const deletePhoto = async (photoId: number): Promise<void> => {
  try {
    await api.delete(`/photos/${photoId}`);
  } catch (error) {
    handleError(error, `deleting photo with ID ${photoId}`);
  }
};
