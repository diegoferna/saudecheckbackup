import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function FormItemchecklist() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"diario" | "ocasional">("diario");

  const { ItemChecklist } = useContext(ChecklistContext);
  const { criarItemChecklist } = ItemChecklist;

  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await criarItemChecklist({
        nome,
        disponivel: false,
        tipo_checklist: tipo,
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
          <Form.Label>Nome Item:</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Tipo:</Form.Label>

          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "diario" | "ocasional")}
            required
          >
            <option value="">Selecione um tipo</option>
              <option  value="ocasional">
                 ocasional
              </option>
              <option  value="diario">
                 diario
              </option>
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
        title="Item Cadastrado"
      />
    </div>
  );
}
