import { Row } from "react-bootstrap";
import { ChecklistItem } from "./components/ChecklistItem";
import { CreateChecklistBody } from "../../../context/Checklist/Checklist";
import { useContext } from "react";
import { ChecklistContext } from "../../../context/useContext";
import iconeAtivo from '../../../assets/checklist/checklist.png';

type SetChecklistData = React.Dispatch<React.SetStateAction<CreateChecklistBody>>;

interface CheckListDiarioProps {
  isClean: boolean;
  setClean: () => void;
  setChecklistData: SetChecklistData;
}

export function CheckListOcasional({
  setChecklistData,
  isClean,
  setClean,
}: CheckListDiarioProps) {

  
  const { ItemChecklist } = useContext(ChecklistContext);
  const { itemChecklistOcasional} = ItemChecklist
  return (
    <div className="accordion mt-4" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button d-flex gap-2 border rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapseChecklistOcasional`}
            aria-expanded="true"
            aria-controls={`collapseChecklistOcasional`}
          >
            <img src={iconeAtivo} style={{width: 24}}/>
            Checklist Ocasional
          </button>
        </h2>
        <div
          id={`collapseChecklistOcasional`}
          className="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <Row>
              {
              itemChecklistOcasional.map((item)=> (
                 <ChecklistItem
                key={item.id}
                itemId={item.id ? item.id : ""}
                nome={item.nome}
                tipo={item.tipo_checklist}
                label={item.nome}
                setChecklistData={setChecklistData}
                isClean={isClean}
                setClean={setClean}
              />
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
