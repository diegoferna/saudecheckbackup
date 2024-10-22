import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function FormMotivo() {
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("");
  const { Endereco } = useContext(ChecklistContext);
  const { criarEndereco } = Endereco;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await criarEndereco({
        nome,
        logradouro,
        numero,
        tipo
      });

      setAddcheck(true);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }

    setNome("");
    setLogradouro("");
    setNumero("");
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
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Logradouro:</Form.Label>
          <Form.Control
            type="text"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Numero:</Form.Label>
          <Form.Control
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo:</Form.Label>
          <Form.Select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "unidade" | "distrito")}
            required
          >
            <option value="">Selecione um tipo</option>
              <option  value="unidade">
                unidade
              </option>
              <option  value="distrito">
                distrito
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
        title="Endereço Cadastrado"
      />
    </div>
  );
}
