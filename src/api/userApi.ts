import api from "./api";
import { UserResponse, SimplifiedUser } from "./interfaces/interfaces";
export const getUsers = async (): Promise<UserResponse[]> => {
  try {
    const { data } = await api.get<UserResponse[]>("/users/");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userId: number): Promise<UserResponse> => {
  try {
    const { data } = await api.get<UserResponse>(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const createUser = async (
  newUser: SimplifiedUser,
): Promise<UserResponse> => {
  try {
    const { data } = await api.post<UserResponse>("/users/", newUser);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  updatedUser: Partial<SimplifiedUser>,
): Promise<UserResponse> => {
  try {
    const { data } = await api.put<UserResponse>(
      `/users/${userId}`,
      updatedUser,
    );
    return data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};
