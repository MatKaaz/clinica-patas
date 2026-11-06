import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import TutorListPage from "./pages/TutorListPage";
import TutorFormPage from "./pages/TutorFormPage";
import AnimalListPage from "./pages/AnimalListPage";
import AnimalFormPage from "./pages/AnimalFormPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/tutores" replace />} />
        <Route path="/tutores" element={<TutorListPage />} />
        <Route path="/tutores/novo" element={<TutorFormPage />} />
        <Route path="/tutores/:id/editar" element={<TutorFormPage />} />
        <Route path="/tutores/:tutorId/animais" element={<AnimalListPage />} />
        <Route path="/tutores/:tutorId/animais/novo" element={<AnimalFormPage />} />
        <Route
          path="/tutores/:tutorId/animais/:animalId/editar"
          element={<AnimalFormPage />}
        />
      </Route>
    </Routes>
  );
}