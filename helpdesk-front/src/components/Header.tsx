import { useContext } from "react";
import { ChecklistContext } from "../context/useContext";
import { useNavigate } from "react-router-dom";
import iconeSaudeCheck from '../assets/marca-saudecheck.png'

export function Header() {
  const { Login } = useContext(ChecklistContext);
  const { logout } = Login;
  const navigate = useNavigate();

  return (
    <nav
      className="sb-topnav navbar navbar-expand navbar-dark shadow-lg d-flex justify-content-between h-auto  "
      style={{ backgroundColor: "#aad3ee", color: "#336699"}}
    >
      <div >
        <img src={iconeSaudeCheck} alt="`logo-prefeitura" className="ps-4" style={{width: 60}}/>
      </div>
     
      <div className="h-100">
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 ">
        <li className="nav-item dropdown ">
          <a
            className="nav-link-icon dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw" ></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
             <li className=" pb-4">
              <a className="dropdown-item" href="#!" onClick={() => navigate("/")}>
                Checklist
              </a>
            </li>
            <li className=" pb-4">
              <a className="dropdown-item" href="#!" onClick={() => navigate("/perfil")}>
                Configurações
              </a>
            </li>
            <li >
              <hr className="dropdown-divider" />
            </li>
            <li className=" pb-4">
              <a className="dropdown-item" href="#!" onClick={logout}>
                Sair
              </a>
            </li>
          </ul>
        </li>
      </ul>
      </div>
    </nav>
  );
}
