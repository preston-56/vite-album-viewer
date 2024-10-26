import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Users from "./components/features/users/Users";
import Login from "./components/features/login/Login";
import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/Errorboundary/Errorboundary";
import ProtectedRoute from "./components/features/login/ProtectedRoute/ProtectedRoute";
import SignUp from "./components/features/signup/SignUp";
import EditPhoto from "./components/features/editphoto/EditPhoto";
import NotFound from "./components/features/404/NotFound";
import UserAlbums from "./components/albums/UserAlbums";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import "./App.css";

const App: React.FC = () => {

  return (
    <Router>
      <AuthProvider>
      <Navbar/>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/users" element={<ProtectedRoute component={Users} />} />
          <Route path="/users/:user_id/albums/" element={<ProtectedRoute component={UserAlbums} />} />
          <Route path="/edit-photo/:photo_id/" element={<ProtectedRoute component={EditPhoto} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
      </AuthProvider>

    </Router>
  );
};
export default App;
