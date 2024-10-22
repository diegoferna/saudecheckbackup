import "react-tabs/style/react-tabs.css";
import DistritoForm from "./components/FormDistrito";
import UnidadeForm from "./components/FormUnidade";
import UsuarioForm from "./components/FormUsuarios";
import FormItemchecklist from "./components/FormItemChecklist";
import FormMotivo from "./components/FormMotivo";
import FormItemMotivo from "./components/FormItemMotivo";
import EnderecoForm from "./components/FormEndereço";
import FormResetarSenhas from "./components/FormResetarSenhas";


export default function Registros() {
  return (
    <main className="px-4">
      <div className="container-fluid px-0">
        <h1 className="mt-4">Registro</h1>
      </div>

      <div className="mb-4">
        <div className="">
          <hr className="bg-gray" />

          <div className="pb-5 bg-white rounded shadow mb-5 ">
            <ul
              id="myTab"
              role="tablist"
              className="nav nav-tabs nav-pills flex-column flex-sm-row text-center  border-0 rounded-nav"
            >
              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#endereco"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold active"
                >
                  Endereço
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Usuário
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold "
                >
                  Distrito
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Unidade
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#itemChecklist"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Items
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#motivo"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Motivo
                </a>
              </li>
              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#itemMotivo"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Motivos Items
                </a>
              </li>

              <li className="nav-item flex-sm-fill">
                <a
                  id="contact-tab"
                  data-toggle="tab"
                  href="#resetSenha"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                  className="nav-link p-3 border-0 text-uppercase font-weight-bold"
                >
                  Resete de Senhas
                </a>
              </li>
            </ul>

          <div id="myTabContent" className="tab-content">
            <div
                id="endereco"
                role="tabpanel"
                aria-labelledby="endereco-tab"
                className="tab-pane fade px-4 py-5  show active"
              >
                <EnderecoForm />
              </div>
              <div
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
                className="tab-pane fade px-4 py-5"
              >
                <UsuarioForm />
              </div>
              <div
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
                className="tab-pane fade px-4 py-5  "
              >
                <DistritoForm />
              </div>
             
              <div
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
                className="tab-pane fade px-4 py-5"
              >
                <UnidadeForm />
              </div>
              <div
                id="itemChecklist"
                role="tabpanel"
                aria-labelledby="contact-tab"
                className="tab-pane fade px-4 py-5"
              >
                <FormItemchecklist />
              </div>
              <div
                id="motivo"
                role="tabpanel"
                aria-labelledby="contact-tab"
                className="tab-pane fade px-4 py-5"
              >
                <FormMotivo />
              </div>
              <div
                id="itemMotivo"
                role="tabpanel"
                aria-labelledby="contact-tab"
                className="tab-pane fade px-4 py-5"
              >
                <FormItemMotivo />
              </div>
              <div
                id="resetSenha"
                role="tabpanel"
                aria-labelledby="contact-tab"
                className="tab-pane fade px-4 py-5"
              >
                <FormResetarSenhas />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
