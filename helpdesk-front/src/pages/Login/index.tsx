import { FormEvent, useContext, useState } from "react";
import imgLogoLogin from "../../assets/marca-saudecheck.png";
import inconeUsuario from "../../assets/icone-usuario.png";
import inconeSenha from "../../assets/icone-senha.png";
import marcaNTI from "../../assets/marca-nti.png";
import marcaPrefeitura from "../../assets/marca-prefeitura.png";
import { ChecklistContext } from "../../context/useContext";

export function Login() {
  const { Login } = useContext(ChecklistContext);
  const { login } = Login;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await login(username.trim(), password);
    }catch(error){
      alert(`Nome de usuário ou senha incorretos`);
    }
  }

  return (
    <section
      className="container-fluid h-100 gradient-form img-fluid"
      style={{ 
        backgroundImage: "url('./src/assets/backgroundPC.jpg') ", 
        backgroundSize: 'cover',  
        backgroundRepeat: 'no-repeat', 
        }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" >
          <div className="d-flex justify-content-center align-items-center" >
            <div className="card rounded-3 text-black" style={{width:400}}>
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-4 mx-md-2">
                    <div className="text-center">
                      <img
                        className="mb-4"
                        src={imgLogoLogin}
                        style={{ width: "80px" }}
                        alt="logo"
                      />
                    </div>

                    <form onSubmit={handleLogin} className="px-2">
                      <div className="form-outline input-group mb-3 border border-2 rounded">
                        <span className="input-group-text border-0">
                          <img src={inconeUsuario} className="border-0"/>
                        </span>
                        <input
                          id="nome"
                          name="nome"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control border-0 fw-light "
                          style={{ backgroundColor: '#e9ecef' }}
                          placeholder="NOME DO USUÁRIO"
                          autoComplete="username"
                        />
                      </div>

                      <div className="form-outline input-group mb-3 border border-2 rounded ">
                        <span className="input-group-text border-0">
                          <img src={inconeSenha} />
                        </span>
                        <input
                          id="senha"
                          name="senha"
                          type="password"
                          value={password}
                          style={{ backgroundColor: '#e9ecef' }}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control border-0 fw-light "
                          placeholder="SENHA"
                          autoComplete="current-password"
                        />
                      </div>

                      <div className="text-center  d-grid">
                        <button
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 "
                          type="submit"
                        >
                          ENTRAR
                        </button>
                      </div>
               
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-between px-1">
          <img src={marcaNTI} style={{ width: "120px" }}/>
          <img src={marcaPrefeitura} style={{ width: "120px" }}/>
        </div>
      </div>
      
    </section>
  );
}
