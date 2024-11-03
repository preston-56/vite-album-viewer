import React from "react";
import { useToast, Box } from "@chakra-ui/react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorFallback: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box fontSize="2xl" mb={4}>Something went wrong.</Box>
      <Box>Please try refreshing the page.</Box>
    </Box>
  );
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const toast = useToast();

  const handleError = (error: Error, info: React.ErrorInfo) => {
    console.error("Error Boundary caught an error:", error, info);
    toast({
      title: "An error occurred.",
      description: "Something went wrong. Please try reloading the page.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
