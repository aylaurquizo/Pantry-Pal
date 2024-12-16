import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Register from "./components/LoginSignup/Register";
import Login from "./components/LoginSignup/Login";
import Pages from "./pages/Pages"; // Assuming this handles routing within the authenticated layout.
import Search from "./components/Search";
import styled from "styled-components";
import ImageFile from "./components/Assets/logo.png";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  // State to track if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false); // Replace this with your auth logic.

  return (
    <Router>
      {isSignedIn ? (
        <div className="App">
          <div className="headersearchbar">
        {/* Logo and Title on the same line */}
        <Nav>
          <Logo to="/">
            <StyledImage />
          </Logo>
          <Title>PantryPal</Title>
        </Nav>

        {/* Search bar below the title */}
        <SearchWrapper>
          <Search />
        </SearchWrapper>
      </div>
      <SidebarWrapper>
      <Sidebar />
      </SidebarWrapper>
      <Pages />
        </div>
      ) : (
        <main className="App">
          <div className="header">
        {/* Logo and Title on the same line */}
        <Nav>
          <Logo to="/">
            <StyledImage />
          </Logo>
          <Title>PantryPal</Title>
        </Nav>
      </div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsSignedIn={setIsSignedIn} />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      )}
    </Router>
  );
}

// Styled component for the logo and title container
const Nav = styled.div`
  display: flex;
  align-items: flex-start; /* Aligns logo and title horizontally */
  justify-content: center; /* Centers the logo and title */
  width: 100%;
  margin-bottom: 1rem; /* Adds spacing between Nav and Search */
`;

// Styled component for the logo
const StyledImage = styled.div`
  width: 50px;
  height: 50px;
  background: url(${ImageFile}) no-repeat center center;
  background-size: contain;
`;

// Styled component for the logo link
const Logo = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-right: 0.7rem;
`;

// Styled component for the title
const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  justify-content: flex-start;
`;

// Wrapper for the search bar
const SearchWrapper = styled.div`
  width: 100%; /* Ensures the search bar spans the width */
  display: flex;
  justify-content: center; /* Centers the search bar */
`;

// Wrapper for the search bar
const SidebarWrapper = styled.div`
  display: flex;
  justify-content: center; /* Centers the search bar */
`;



export default App;
