import { Routes, Route, Navigate } from "react-router";
import AuthForm from "./auth/AuthForm";
import ProtectedLayout from "./ProtectedLayout";
import FavoritePage from "./favorite/FavoritePage";
import MainSearch from "./search/MainSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/search" element={<MainSearch />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
