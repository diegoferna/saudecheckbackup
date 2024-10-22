import { Routes, Route, useNavigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Home } from "./pages/Home";

import { Login } from "./pages/Login";
import { useEffect } from "react";
import CheckLit from "./pages/CheckLists";
import Registros from "./pages/Registros";
import Perfil from "./pages/Perfil/Perfil";
import CheckLitSupervisor from "./pages/CheckLists/ChecklistsSupervisor";
import { ChecklistsComConflitosPage } from "./pages/ChecklistUnidades";

export function Router() {
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const isAuthenticated = user !== null;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          {user && user.tipo === "administrador" && (
            <>
              <Route path="/checklist" element={<CheckLit />} />
              <Route path="/registros" element={<Registros />} />
              <Route path="/checklistComConflitos" element={<ChecklistsComConflitosPage />} />
            </>
          )}
          {
            user && user.tipo === "supervisor" && (
              <>
                <Route path="/checklist" element={<CheckLitSupervisor />} />
              </>
            )
          }
        </Route>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
    </Routes>
  );
  
}
