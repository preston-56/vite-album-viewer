import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Users from "../components/features/users/Users"; 
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom"; 
import { vi } from 'vitest';

global.fetch = vi.fn();

describe("Users Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders loading spinner when fetching data", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));
    
    render(
      <ChakraProvider>
        <MemoryRouter> 
          <Users />
        </MemoryRouter>
      </ChakraProvider>
    );

    expect(screen.getByText(/loading users, please wait.../i)).toBeInTheDocument();
  });

  test("renders users and their album count after fetching data", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
    ];
    const mockAlbums = [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 1 },
      { id: 3, user_id: 2 },
    ];

    // Mock the fetch calls
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.endsWith("/api/users")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        });
      }
      if (url.endsWith("/api/albums")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAlbums),
        });
      }
      return Promise.reject(new Error("not found"));
    });

    render(
      <ChakraProvider>
        <MemoryRouter> 
          <Users />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Wait for "Users List" header to confirm users have loaded
    await waitFor(() => {
      expect(screen.getByText("Users List")).toBeInTheDocument();
    });

    // Verify that the mock users and album counts appear correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Albums: 2")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Albums: 1")).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

    render(
      <ChakraProvider>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Wait for loading message to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loading users, please wait.../i)).not.toBeInTheDocument();
    });

    // Confirm that an error message is displayed
    expect(await screen.findByText(/error fetching users/i)).toBeInTheDocument(); 
  });
});
