import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewQualifications from "./pages/view-qualifications/ViewQualifications";
import ViewRequests from "./pages/view-requests/ViewRequest";
import NewRequests from "./pages/new-requests/NewRequest";
import ViewStudents from "./pages/view-students/ViewStudents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/ver-notas" element={<ViewQualifications/>} />
        <Route path="/ver-solicitud" element={<ViewRequests/>} />
        <Route path="/nueva-solicitud" element={<NewRequests/>} />
        <Route path="/ver-alumnos-inscritos" element={<ViewStudents/>} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
