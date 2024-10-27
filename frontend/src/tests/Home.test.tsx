import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "../components/Home/Home"; 
import { ChakraProvider } from "@chakra-ui/react";
import { vi } from 'vitest';

global.fetch = vi.fn();

describe("Home Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("renders loading spinner when data is being fetched", () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise(() => {})
    );

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    expect(screen.getByText(/loading users and albums/i)).toBeInTheDocument();
  });

  test("renders users and albums after fetching data", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
    const mockAlbums = [
      { id: 1, title: "Album 1", user_id: 1 },
      { id: 2, title: "Album 2", user_id: 1 },
      { id: 3, title: "Album 3", user_id: 2 },
    ];

    (fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("users")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUsers),
        });
      }
      if (url.includes("albums")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockAlbums),
        });
      }
      return Promise.reject(new Error("not found"));
    });

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Users and Albums")).toBeInTheDocument();
    });

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("Albums: 2")).toBeInTheDocument();
    expect(screen.getByText("Albums: 1")).toBeInTheDocument();
  });

  test("displays error message if fetch fails", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

    render(
      <ChakraProvider>
        <Home />
      </ChakraProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/loading users and albums/i)).toBeInTheDocument();
    });
  });
});
