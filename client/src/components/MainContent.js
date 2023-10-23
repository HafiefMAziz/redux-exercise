import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, About, Posting, Login } from "../pages";

function MainContent({logged}) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {logged ? 
        <Route path="/posting" element={<Posting />} />
        : null}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default MainContent;
