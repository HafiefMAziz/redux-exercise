import React from "react";
import { Route, Routes } from "react-router-dom";
import { About } from "../pages";

function MainContent() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default MainContent;
