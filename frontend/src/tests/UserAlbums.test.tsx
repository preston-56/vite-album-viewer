import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserAlbums from "../components/albums/UserAlbums";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from "vitest";

global.fetch = vi.fn();

describe("UserAlbums Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders loading spinner initially", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/user/1"]}>
          <Routes>
            <Route path="/user/:user_id" element={<UserAlbums />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/loading albums.../i)).toBeInTheDocument();
  });

  test("displays user and album details after fetching data", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    const mockAlbums = [
      { user_id: 1, album_id: 1, title: "Album 1" },
      { user_id: 1, album_id: 2, title: "Album 2" }
    ];
    const mockPhotos = [
      { id: 1, title: "Photo 1", url: "https://via.placeholder.com/150" },
      { id: 2, title: "Photo 2", url: "https://via.placeholder.com/150" }
    ];

    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("/api/users/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser)
        });
      }
      if (url.includes("/api/albums")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAlbums)
        });
      }
      if (url.includes("/api/photos")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPhotos)
        });
      }
      return Promise.reject(new Error("not found"));
    });

    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/user/1"]}>
          <Routes>
            <Route path="/user/:user_id" element={<UserAlbums />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Check for album and photo rendering
    expect(screen.getByText("Album: 1")).toBeInTheDocument();
    expect(screen.getByText("Photo 1")).toBeInTheDocument();
    expect(screen.getByText("Photo 2")).toBeInTheDocument();
  });

  test("shows error toast on fetch failure", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error("Fetch error"))
    );

    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/user/1"]}>
          <Routes>
            <Route path="/user/:user_id" element={<UserAlbums />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test("navigates between albums correctly", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    const mockAlbums = [
      { user_id: 1, album_id: 1, title: "Album 1" },
      { user_id: 1, album_id: 2, title: "Album 2" }
    ];
    const mockPhotosAlbum1 = [
      { id: 1, title: "Photo 1", url: "https://via.placeholder.com/150" }
    ];
    const mockPhotosAlbum2 = [
      { id: 2, title: "Photo 2", url: "https://via.placeholder.com/150" }
    ];

    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("/api/users/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser)
        });
      }
      if (url.includes("/api/albums")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAlbums)
        });
      }
      if (url.includes("/api/photos?album_id=1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPhotosAlbum1)
        });
      }
      if (url.includes("/api/photos?album_id=2")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPhotosAlbum2)
        });
      }
      return Promise.reject(new Error("not found"));
    });

    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/user/1"]}>
          <Routes>
            <Route path="/user/:user_id" element={<UserAlbums />} />
          </Routes>
        </MemoryRouter>
      </ChakraProvider>
    );

    // Wait for the first album text to appear
    await waitFor(() =>
      expect(screen.getByText(/Album 1 of 2/i)).toBeInTheDocument()
    );

    // Select the navigation buttons by aria-label (update these to match your implementation)
    const nextButton = screen.getByLabelText("Next Album");
    const prevButton = screen.getByLabelText("Previous Album");

    // Navigate to the next album
    fireEvent.click(nextButton);

    // Check for the updated album text
    await waitFor(() => {
      expect(screen.getByText(/Album 2 of 2/i)).toBeInTheDocument();
    });

    // Navigate back to the previous album
    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(screen.getByText(/Album 1 of 2/i)).toBeInTheDocument();
    });
  });
});
