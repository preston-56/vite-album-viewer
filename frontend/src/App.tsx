import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Users from "./components/features/users/Users";
import Album from "./components/features/album/Album";
import Photo from "./components/features/photos/Photo";
import Login from "./components/features/login/Login";
import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/Errorboundary/Errorboundary";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/albums/:albumId" element={<Album />} />
          <Route path="/photos/:photoId" element={<Photo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
