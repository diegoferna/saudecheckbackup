import { SignOut } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChecklistContext } from "../context/useContext";

interface sessionUser {
  id: string;
  email: string;
  nome: string;
  tipo: string;
  unidade_id: string;
}

export function SideBar() {
  const [userData, setUserdata] = useState<sessionUser | null>(null);
  const { Login } = useContext(ChecklistContext);
  const { logout } = Login;

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user) as sessionUser;
      setUserdata(userData);
    }
  }, []);

  const isDisabled = userData?.tipo == "administrador" || userData?.tipo == "supervisor" ? true : false  ;
  
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion mt-2 "
        id="sidenavAccordion"
        style={{ backgroundColor: "#aad3ee", color: "#336699" }}
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Inicio</div>
            <NavLink
              style={{ display: `${!isDisabled  ? "none" : ""}` }}
              className={`nav-link ${!isDisabled ? "disabled" : ""}`}
              to={!isDisabled ? "" : "/checklist"}
              aria-disabled={isDisabled}
            >
              <div className="sb-nav-link-icon text-light-menu">
                <i className="fa-solid fa-clipboard-list"></i>
              </div>
              <span className="text-light-menu">Dashboard</span>
            </NavLink>

            <NavLink className="nav-link " to={"/"}>
              <div className="sb-nav-link-icon text-light-menu">
                <i className="fas fa-tachometer-alt "></i>
              </div>
              <span className="text-light-menu">Listar Checklist</span>
            </NavLink>

            <div 
              className="sb-sidenav-menu-heading"
              style={{  display: `${ userData?.tipo != "administrador" ? "none" : ""}`}}

            >Controle</div>
            <NavLink
              style={{ opacity: `${!isDisabled ? "0.5" : ""}`, display: `${ userData?.tipo != "administrador" ? "none" : ""}`}}
              to={!isDisabled ? "" : "/registros"}
              className={`nav-link ${!isDisabled ? "disabled" : ""}`}
            >
              <div className="sb-nav-link-icon text-light-menu">
                <i className="fa-regular fa-address-card"></i>
              </div>
              <span className="text-light-menu ">Registros</span>
            </NavLink>

          </div>
        </div>

        <div className="sb-sidenav-footer d-flex justify-content-between">
          <div className="small">Deslogar:</div>

          <SignOut
            size={24}
            className="cursor-pointer"
            onClick={logout}
            role="button"
          />
        </div>
      </nav>
    </div>
  );
}
