import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Register from "./components/LoginSignup/Register";
import Login from "./components/LoginSignup/Login";
import Pages from "./pages/Pages"; // Assuming this handles routing within the authenticated layout.

function App() {
  // State to track if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false); // Replace this with your auth logic.

  return (
    <Router>
      {isSignedIn ? (
        // If signed in, show Sidebar and Pages
        <div className="App">
          <h1>Welcome to PantryPal</h1>
          <Sidebar />
          <Pages />
        </div>
      ) : (
        // If not signed in, show Routes for Login/Register
        <main className="App">
          <Routes>
            <Route path="/register" element={<Register />} />

            <Route
              path="/login"
              element={<Login setIsSignedIn={setIsSignedIn} />}
            />

            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      )}
    </Router>
  );
}

export default App;
