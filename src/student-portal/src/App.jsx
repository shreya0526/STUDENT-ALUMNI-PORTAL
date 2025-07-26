import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AlumniDashboard from "./components/AlumniDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      { <Route path="/AdminDashboard" element={<AdminDashboard />} /> }
       <Route path="/StudentDashboard" element={<StudentDashboard />} />
      <Route path="/alumnidashboard" element={<AlumniDashboard />} />
    </Routes>
  );
}

export default App;
