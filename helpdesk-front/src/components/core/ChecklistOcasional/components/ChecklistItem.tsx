import React, { ChangeEvent, useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { CreateChecklistBody } from "../../../../context/Checklist/Checklist";

type SetChecklistData = React.Dispatch<React.SetStateAction<CreateChecklistBody>>;


interface ChecklistItemProps {
  itemId: string;
  nome: string;
  tipo: string;
  label: string;
  isClean: boolean;
  setClean: () => void;
  setChecklistData: SetChecklistData;
}

export function ChecklistItem({
  itemId,
  nome,
  tipo,
  label,
  isClean,
  setClean,
  setChecklistData,
}: ChecklistItemProps) {
  const [checked, setChecked] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [dataHora, setDataHora] = useState("");

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setClean();
  
    setChecklistData((prevState: any) => {
      const isItemExists = prevState.itemsOcasional.some((item: any) => item.nome === nome);
  
      if (isItemExists) {
        // Atualizar o motivo do item existente
        const updatedItems = prevState.itemsOcasional.map((item: any) => {
          if (item.nome === nome) {
            return {
              ...item,
              disponivel: !item.disponivel,
              justificativa: justificativa || "", // Adicionando uma verificação para justificativa
            };
          }
  
          return item; // Retornar o item não modificado
        });
  
        return {
          ...prevState,
          itemsOcasional: updatedItems,
        };
      } else {
        const newItem = {
          id: itemId,
          nome: nome,
          tipo: tipo,
          disponivel: false,
          justificativa: justificativa || "", // Adicionando uma verificação para justificativa
        };
  
        return {
          ...prevState,
          itemsOcasional: [...prevState.itemsOcasional, newItem],
        };
      }
    });
  };
  
  

  const handleJustificativaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedMotivo = event.target.value;
    setJustificativa(selectedMotivo);
  
    setChecklistData((prevState: any) => {
      const isItemExists = prevState.itemsOcasional.some((item: any) => item.nome === nome);
  
      if (isItemExists) {
        // Atualizar o motivo do item existente
        const updatedItems = prevState.itemsOcasional.map((item: any) => {
          if (item.nome === nome) {
            return {
              ...item,
              disponivel: false,
              justificativa: selectedMotivo,
            };
          }
          return item;
        });
  
        return {
          ...prevState,
          itemsOcasional: updatedItems,
        };
      } else {
        // Adicionar um novo item se não existir
        const newItem = {
          id: itemId,
          nome: nome,
          tipo: tipo,
          disponivel: false,
          justificativa: selectedMotivo,
        };
  
        return {
          ...prevState,
          itemsOcasional: [...prevState.itemsOcasional, newItem],
        };
      }
    });
  };

  const handleDataHoraChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDataHora(event.target.value);
    setChecklistData((prevState: any) => {
      const isItemExists = prevState.itemsOcasional.some((item: any) => item.nome === nome);
  
      if (isItemExists) {
        // Atualizar o motivo do item existente
        const updatedItems = prevState.itemsOcasional.map((item: any) => {
          if (item.nome === nome) {
            return {
              ...item,
              disponivel: true,
              data: dataHora
            };
          }
          return item;
        });
  
        return {
          ...prevState,
          itemsOcasional: updatedItems,
        };
      } else {
        // Adicionar um novo item se não existir
        const newItem = {
          id: itemId,
          nome: nome,
          tipo: tipo,
          disponivel: false,
          data: dataHora,
          justificativa: justificativa,
        };
  
        return {
          ...prevState,
          itemsDiario: prevState.itemsDiario ? [...prevState.itemsDiario] : [], 
          itemsOcasional: [...prevState.itemsOcasional, newItem],
        };
      }
    });
  };

  useEffect(() => {
    if (isClean) {
      setChecked(false);
      setJustificativa("");
    }
  }, [isClean]);

  return (
    <Card className="mb-2 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex flex-row justify-content-between">
          <Form.Check
            inline
            type="checkbox"
            checked={checked}
            label={label}
            onChange={handleCheckboxChange}
          />
          <div className="ms-auto d-flex flex-row">
            {checked && (
              <Form.Control
                type="text"
                value={justificativa}
                onChange={handleJustificativaChange}
                placeholder="Informe os dados"
                className="col"
                size="sm"
                required={checked}
              />
            )}
            {checked  && (
              <Form.Control
                type="datetime-local"
                value={dataHora}
                onChange={handleDataHoraChange}
                className="col"
                size="sm"
                required={checked}
              />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
