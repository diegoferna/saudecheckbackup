import { useContext, useEffect, useState } from "react";
import { ChecklistContext } from "../../context/useContext";
import { ConfirmModal } from "../../components/core/Modal/ConfirmModal";
import { Form, Button } from "react-bootstrap";

interface sessionUser {
  id: string;
  email: string;
  nome: string;
  tipo: string;
  unidade_id: string;
}

export default function Perfil() {
  const {} = useContext(ChecklistContext);
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);
  const [userData, setUserdata] = useState<sessionUser | null>(null);
  const [nome, setNome] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const { User } = useContext(ChecklistContext);
  const { alterarSenha } = User;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await alterarSenha(
        nome,
        senhaAtual,
        novaSenha,
      );

      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setSenhaAtual("");
    setNovaSenha("");
  };

   useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user) as sessionUser;
      setUserdata(userData);
      setNome(userData.nome)
    }
  }, []);

    return (
      <div className="container mt-4">
        <div className="container-fluid px-0">
        <h1 className="mt-4">Conta</h1>
      </div>
        <Form onSubmit={handleSubmit} className="p-2">
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              value={userData?.nome}
              type="text"
              required
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha Atual:</Form.Label>
            <Form.Control
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
              
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nova Senha:</Form.Label>
            <Form.Control
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </Form.Group>
      
          <div className="d-flex gap-2 mt-4">
            <Button type="submit">Salvar</Button>
            <button type="button" className="btn btn-danger">
              Cancelar
            </button>
          </div>
        </Form>
        <ConfirmModal
          isValid={addCheck}
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Senha alterada com sucesso"
        />
      </div>
    );
}
