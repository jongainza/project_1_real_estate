import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoggIn from "./pages/LoggIn";
import LogOut from "./pages/LogOut";
import Profile from "./pages/Profile";
import Delete from "./pages/Delete";
import Register from "./pages/Register";

import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/log-in" element={<LoggIn />} />
        <Route path="/log-out" element={<LogOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
