import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoggIn from "./pages/LoggIn";
import LogOut from "./pages/LogOut";
import Profile from "./pages/Profile";
import Delete from "./pages/Delete";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/log-in" element={<LoggIn />} />
        <Route path="/log-out" element={<LogOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}
