import React, { ChangeEvent } from "react";

import { Badge, Card, Form } from "react-bootstrap";
import { differenceInDays } from "date-fns";
import {
  criarChecklist,
} from "../../../../context/Checklist/Checklist";

type SetChecklistData = React.Dispatch<React.SetStateAction<criarChecklist>>;

interface AlvaraProps {
  label: string;
  nome: string;
  ultimaValidacao?: string;
  prazo?: number;
  setChecklistData: SetChecklistData;
}

export function AlvaraSanitario({
  label,
  nome,
  ultimaValidacao,
  prazo,
  setChecklistData,
}: AlvaraProps) {
  const isVigente =
    ultimaValidacao &&
    prazo &&
    differenceInDays(new Date(), new Date(ultimaValidacao)) <= prazo;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Atualize o estado no componente pai
    setChecklistData((prevState: any) => ({
      ...prevState,
      [nome]: event.target.value,
    }));
  };
  return (
    <Card className="mb-2 shadow-sm border-0">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Form.Label>
            {label}{" "}
            <Badge
              bg={isVigente ? "success" : "danger"}
              onChange={handleCheckboxChange}
            >
              {isVigente ? "Vigente" : "Vencido"}
            </Badge>
          </Form.Label>
        </div>
      </Card.Body>
    </Card>
  );
}
