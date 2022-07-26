import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Post from './components/Post';
import Navbar from "./components/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div >
  );
}

export default App;
