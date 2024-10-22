import { useContext, useEffect, useState } from "react";
import { ChecklistContext } from "../../../../context/useContext";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Popover } from "react-bootstrap";

type unidadeDetailsProps = {
  itemChecklist: string;
};

const colorItem = [
  "bg-success",
  "bg-danger",
  "bg-warning",
  "bg-info",
  "bg-primary",
 ]


export function UnidadeDetails({ itemChecklist }: unidadeDetailsProps) {
  const { Checklist } = useContext(ChecklistContext);
  const { checklistItem } = Checklist;
  const [itemColors, setItemColors] = useState<string[]>([]);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Justificativa</Popover.Header>
      <Popover.Body>
        {checklistItem.justificativa}
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    const generateRandomColors = () => {
      const colors = Array.from({ length: checklistItem.itens_diario.length }, () => {
        const randomItem = Math.floor(Math.random() * colorItem.length);
        return colorItem[randomItem];
      });
      setItemColors(colors);
    };

    if (checklistItem && checklistItem.itens_diario) {
      generateRandomColors();
    }
  }, [checklistItem]);

  if (itemChecklist === "" || itemChecklist === undefined) {
    return (
      <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={popover}
    >
      <div
        className="card text-bg-light mb-3 border-0 shadow rounded p-2"
        style={{ maxHeight: "480px", overflowY: "auto" }}
      >
        <div className="card-body ">
          {checklistItem ? <p className="text-primary"><span className="text-dark">Unidade Selecionada:</span> {checklistItem.nome_unidade.toUpperCase()}</p> : <a>Selecione uma unidade ao lado</a>}
          <div className="card-title-container d-flex gap-2 align-items-center overflow-auto">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
                <tr>
                    <th>Item</th>
                    <th>Status</th>
                    <th>Motivo</th>
                </tr>
            </thead>
              <tbody>
                {checklistItem.itens_diario.map((item, index) =>(
                  <tr className="container">
                    <td>
                    
                        <div className="d-flex align-items-center">
                          <div
                              style={{width: '45px', height: '45px'}}
                              className={`rounded-circle ${itemColors[index]} d-flex justify-content-center align-items-center`}
                            >
                              <p className="m-0 text-light">{item.nome.charAt(0).toUpperCase()}</p>
                            </div>
                          <div className="ms-3">
                              <p className="fw-bold mb-1">{item.nome}</p>
                          </div>
                      </div>
                      </td>
                      <td>
                          {item.disponivel ? <span className="badge text-bg-success">Disponível</span> : <span className="badge text-bg-danger">Indisponível</span>}
                      </td>
                      <td className="">
                          <p>{item.disponivel ?  
                          <FontAwesomeIcon
                            icon={faCheck}
                            data-tip="Informação"
                            style={{ color: "#02992f" }}
                          />: item.motivo}</p>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </OverlayTrigger>
    );
  }
  return <div></div>;
  
}
