import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function UnidadeForm() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [gerenteId, setGerenteId] = useState("");
  const [distritoId, setDistritoId] = useState("");
  const { Unidade, User, Distrito, Endereco } = useContext(ChecklistContext);
  const { criarUnidade } = Unidade;
  const {endereco} = Endereco;
  const { distrito } = Distrito;
  const { usuarios } = User;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await criarUnidade({
        nome,
        local,
        gerenteId,
        distritoId,
      });

      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setLocal("");
    setDistritoId("");
    setGerenteId("");
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome:</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Local:</Form.Label>
          <Form.Select
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          >
            <option value="">
              Selecione
            </option>
            {
              endereco.map((item) =>(
                item.tipo == "unidade" && <option value={item.id}>{item.nome.toUpperCase()}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Gerente:</Form.Label>

          <Form.Select
            value={gerenteId}
            onChange={(e) => setGerenteId(e.target.value)}
            required
          >
            <option value="">Selecione um gerente</option>
            {usuarios?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nome}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Distrito:</Form.Label>

          <Form.Select
            value={distritoId}
            onChange={(e) => setDistritoId(e.target.value)}
            required
          >
            <option value="">Selecione um distrito</option>
            {distrito.map((distrito) => (
              <option key={distrito.id} value={distrito.id}>
                {distrito.nome}
              </option>
            ))}
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
        title="Distrito Cadastrado"
      />
    </div>
  );
}
