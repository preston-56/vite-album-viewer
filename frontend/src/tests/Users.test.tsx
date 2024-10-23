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
    (fetch as jest.Mock).mockImplementation(() => 
      new Promise(() => {})
    );

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
      { id: 1, userId: 1 },
      { id: 2, userId: 1 },
      { id: 3, userId: 2 },
    ];

    // Mock fetch for users
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url === "https://jsonplaceholder.typicode.com/users") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        });
      }
      if (url === "https://jsonplaceholder.typicode.com/albums") {
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

    await waitFor(() => {
      expect(screen.getByText("Users List")).toBeInTheDocument();
    });

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

    //check for error toast or message
    expect(await screen.findByText(/error fetching users/i)).toBeInTheDocument(); 
  });
});


test("renders users and their album count after fetching data", async () => {
  const mockUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ];
  const mockAlbums = [
    { id: 1, userId: 1 },
    { id: 2, userId: 1 },
    { id: 3, userId: 2 },
  ];

  (fetch as jest.Mock).mockImplementation((url) => {
    if (url === "https://jsonplaceholder.typicode.com/users") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      });
    }
    if (url === "https://jsonplaceholder.typicode.com/albums") {
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

  await waitFor(() => {
    expect(screen.getByText("Users List")).toBeInTheDocument();
  });

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Albums: 2")).toBeInTheDocument();
  expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  expect(screen.getByText("Albums: 1")).toBeInTheDocument();
});
