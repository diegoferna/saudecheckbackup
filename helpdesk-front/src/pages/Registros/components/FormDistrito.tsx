import { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function DistritoForm() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [coordenador, setCoordenador] = useState("");
  const { Distrito, Endereco, User } = useContext(ChecklistContext);
  const { criarDistrito } = Distrito;
  const { usuarios } = User;
  const {endereco} = Endereco;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await criarDistrito({
        nome,
        local,
        coordenador,
      });
      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setLocal("");
    setCoordenador("");
  };

  useEffect(() => {}, []);

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
                item.tipo == "distrito" && <option value={item.id}>{item.nome.toUpperCase()}</option>
              ))
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Coordenador:</Form.Label>
          <Form.Select
            value={coordenador}
            onChange={(e) => setCoordenador(e.target.value)}
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
