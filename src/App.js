import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import VideosPage from "./components/VideosPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} exact />
      <Route path="/videos" element={<VideosPage />} />
    </Routes>
  );
}

export default App;
