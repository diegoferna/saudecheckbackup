import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function FormMotivo() {
  const [nome, setNome] = useState("");
  const { Motivo } = useContext(ChecklistContext);
  const { criarMotivo } = Motivo;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await criarMotivo({
        nome,
      });

      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
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
        title="Motivo Cadastrado"
      />
    </div>
  );
}
