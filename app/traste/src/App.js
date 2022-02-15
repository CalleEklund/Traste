import React from "react";
import MenuPage from "./screens/MenuPage";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import FactPage from "./screens/FactPage";
import Header from './components/Header'
function App() {
  return (
    <Container disableGutters={true}  sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/factpage" element={<FactPage />} />
      </Routes>
    </Container>
  );
}

export default App;
