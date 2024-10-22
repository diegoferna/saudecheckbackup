import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { CreateChecklistBody } from "../../../../context/Checklist/Checklist";
import { ChecklistContext } from "../../../../context/useContext";
import { motivo } from "../../../../context/ItemChecklistMotivo/ItemChecklistMotivo";

interface ChecklistItemProps {
  itemId:string;
  nome:string;
  tipo:string;
  label: string;
  motivos: motivo[];
  isClean: boolean;
  isAllow: string;
  setClean: () => void;
  setChecklistData: React.Dispatch<React.SetStateAction<CreateChecklistBody>>;
}

export function ChecklistItem({
  itemId,
  nome,
  tipo,
  label,
  motivos,
  isClean,
  isAllow,
  setChecklistData,
  setClean,
}: ChecklistItemProps) {
  const [checked, setChecked] = useState(false);
  const [motivo, setMotivo] = useState("");
  const { ItemChecklistMotivo } = useContext(ChecklistContext);
  const { todosItemChecklistMotivo } = ItemChecklistMotivo;


  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setClean();
   
    if (event.target.checked) {
      setMotivo("default");
    }

    
    setChecklistData((prevState: any) => {
      const isItemExists = prevState.itemsDiario.some((item: any) => item.nome === nome);

      if (isItemExists) {
        const updatedItems = prevState.itemsDiario.map((item: any) => {
          if (item.nome === nome) {
            return {
              ...item,
              disponivel: !item.disponivel,
              motivo_id: "",
              motivos: "",
            };
          }
          return item;
        });
  
        return {
          ...prevState,
          itemsDiario: updatedItems,
        };
      }else {
        const newItem = {
          id: itemId,
          nome: nome,
          tipo: tipo,
          disponivel: true,
          motivo_id: "",
          motivos: "",
        };
  
        return {
          ...prevState,
          itemsDiario: [...prevState.itemsDiario, newItem],
        };
      }
    });
  };
  

  const handleMotivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedMotivo = event.target.value;
    setMotivo(selectedMotivo);
  
    encontrarIdPorItemEMotivo(itemId, selectedMotivo, (novoItemMotivo) => {
      // A função de retorno de chamada será executada após o estado ser atualizado
      setChecklistData((prevState: any) => {
        const isItemExists = prevState.itemsDiario.some((item: any) => item.nome === nome);
  
        if (isItemExists) {
          const updatedItems = prevState.itemsDiario.map((item: any) => {
            if (item.nome === nome) {
              return {
                ...item,
                disponivel: false,
                motivo_id: novoItemMotivo, // Usar o novoItemMotivo ao invés de itemMotivo
                motivos: selectedMotivo,
              };
            }
            return item;
          });
          return {
            ...prevState,
            itemsDiario: updatedItems,
          };
        } else {
          const newItem = {
            id: itemId,
            nome: nome,
            tipo: tipo,
            motivo_id: novoItemMotivo, // Usar o novoItemMotivo ao invés de itemMotivo
            disponivel: false,
            motivos: selectedMotivo,
          };
          return {
            ...prevState,
            itemsDiario: [...prevState.itemsDiario, newItem],
          };
        }
      });
    });
  };
  
  // ...
  
  function encontrarIdPorItemEMotivo(item_checklist_id: string, motivo_id: string, callback: (novoItemMotivo: string) => void) {
    const objetoEncontrado = todosItemChecklistMotivo.find(objeto => objeto.item_checklist_id === item_checklist_id && objeto.motivo_id === motivo_id);
  
    if (objetoEncontrado) {
      // Usar a função de retorno de chamada para atualizar o estado
      callback(objetoEncontrado.id);
    } else {
      callback(""); // Se não encontrado, passar uma string vazia
    }
  }
  

  useEffect(() => {
    if (isClean) {
      setChecked(false);
      setMotivo("default");
    }
  }, [isClean]);
  return (
    <Card className="mb-2 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex flex-row justify-content-between">
          <Form.Check
            inline
            type="checkbox"
            label={label}
            checked={checked}
            onChange={handleCheckboxChange}
            className="col"
            
          />
          {!checked && (
              <Form.Control
              as="select"
              value={checked ? "default" : motivo}
              onChange={handleMotivoChange}
              className="selectpicker border-0 p-1 rounded bg-dark bg-opacity-10 fw-light px-2"
              style={{width:'150px'}}
              required={isAllow != "collapsed"}
            >
              <option value="">
                  Selecione
                 
              </option>
              {motivos.map((m) => (
                <option key={m.id_motivo} value={m.id_motivo}>
                  {m.motivo_nome}
                </option>
              ))} 
            </Form.Control>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}