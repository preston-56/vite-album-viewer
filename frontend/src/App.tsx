import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Users from "./components/features/users/Users";
import Album from "./components/features/album/Album";
import Photo from "./components/features/photos/Photo";
import Login from "./components/features/login/Login";
import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/Errorboundary/Errorboundary";
import ProtectedRoute from "./components/features/login/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/features/signup/SignUp";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route
            path="/users"
            element={<ProtectedRoute component={Users} />}/>
          <Route path="/albums/:albumId" element={<Album />} />
          <Route path="/photos/:photoId" element={<Photo />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
