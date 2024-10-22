import { useContext, useEffect, useState } from "react";

import { ChecklistContext } from "../../context/useContext";
import CheckListForm from "./component";
import "./styles.css";
import { sessionUser } from "../../context/User/User";

export function Home() {
  const { Unidade, Login } = useContext(ChecklistContext);
  const [unidade, setUnidade] = useState("");
  const { userData } = Login;
  const { buscarUnidade } = Unidade;

  const userString = sessionStorage.getItem("user");
  const user: sessionUser = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (user) {
      buscarUnidade(user.id).then((unidade) => {
        if (unidade) {
          setUnidade(unidade.nome);
        } else {
          setUnidade("Unidade não encontrada");
        }
      });
    }
  }, [user, buscarUnidade]);

  useEffect(() => {}, [userData]);

  return (
    <main className="container d-flex flex-column justify-content-center align-items-center py-4 ">
      <div className="w-100 px-4 mt-4 mb-2">
        <h1
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-title="Faltando ginecologista"
        >
          Checklist
        </h1>
        <span>Pagina para acesso aos dados de checklist</span>

        <div className="bg-danter row mt-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-arrow">
              <li className="breadcrumb-item">
                <a
                  className="text-uppercase pl-6 text-truncate "
                  style={{ maxWidth: "400px" }}
                >
                  {unidade}
                </a>
              </li>
              <li className="breadcrumb-item pl-0">
                <a className="text-uppercase">{user.nome}</a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <CheckListForm user={user} />
    </main>
  );
}
