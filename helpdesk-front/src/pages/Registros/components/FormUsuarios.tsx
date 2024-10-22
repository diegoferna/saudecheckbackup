import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const { User } = useContext(ChecklistContext);
  const { criarUsuario } = User;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await criarUsuario({
        nome,
        email,
        senha,
        tipo,
      });
      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setEmail("");
    setSenha("");
    setTipo("");
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            autoComplete="username"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha:</Form.Label>
          <Form.Control
            type="password"
            value={senha}
            autoComplete="current-password"
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo:</Form.Label>
          {/* Aqui você pode renderizar um select com as opções de tipos. */}
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            {/* As opções do select podem ser geradas dinamicamente com os dados dos tipos. */}
            <option value="">Selecione um tipo</option>
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="gerente">Gerente</option>
            <option value="representante">Representante</option>
            <option value="suporte">Suporte</option>

          </Form.Select>
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
        title="Usuário Cadastrado"
      />
    </div>
  );
}
