import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import LoggIn from "./pages/user/LoggIn";
import LogOut from "./pages/user/LogOut";
import Profile from "./pages/user/Profile";
import Delete from "./pages/user/Delete";
import Register from "./pages/user/Register";
import Header from "./components/Header";
import UpdateProfile from "./pages/user/UpdateProfile";

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
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
