import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser();
  const isLocalLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoaded) return <div>Loading...</div>;

  return isSignedIn || isLocalLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard - protected route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback for unmatched routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
