import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function FormItemMotivo() {
  const { ItemChecklist, Motivo, ItemChecklistMotivo} = useContext(ChecklistContext);
  const { itemChecklist } = ItemChecklist;
  const { criarItemChecklistMotivo } = ItemChecklistMotivo;
  const {motivo} = Motivo;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedMotivos, setSelectedMotivos] = useState<string[]>([]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!selectedItem || selectedMotivos.length === 0) {
      return;
    }
    try {
      await criarItemChecklistMotivo({
        item_checklist_id: selectedItem,
        motivo_ids: selectedMotivos
      })

      setAddcheck(true);
      setShowModal(true);
    }catch (error) {
      console.log(error);
    }
    setSelectedItem("");
    setSelectedMotivos([]);
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5">
          <Form.Label>Selecione um Item: </Form.Label>
          <Form.Select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            required
          >
            <option value="">
              Selecione
            </option>
            {
              itemChecklist.map((item) =>(
                <option value={item.id}>{item.nome.toUpperCase()}</option>
              ))
            }
          </Form.Select>

        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Label>Selecione os Motivos: </Form.Label>
          {
              motivo.map((m, index) =>(
                <div 
                  key={index}
                  className="form-check form-switch"
                >
                  <input 
                    id={m.id}
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    checked={selectedMotivos.includes(m.id || "")}
                    onChange={() => {
                      const updatedMotivos = selectedMotivos.includes(m.id || "")
                        ? selectedMotivos.filter((motivoId) => motivoId !== m.id)
                        : [...selectedMotivos, m.id || ""];
    
                      setSelectedMotivos(updatedMotivos);
                    }}
                    
                  />
                  <label className="form-check-label" htmlFor={m.id}>{m.nome.toUpperCase()}</label>
                </div>
              ))
              }
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
        title="Item Motivo Cadastrado"
      />
    </div>
  );
}

/**
 *  <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{m.nome}</label>
                </div>
 */