import { Row } from "react-bootstrap";
import { ChecklistItem } from "./components/ChecklistItem";
import {
  CreateChecklistBody,
} from "../../../context/Checklist/Checklist";
import { useContext, useEffect, useMemo } from "react";
import { ChecklistContext } from "../../../context/useContext";
import iconeInativo from '../../../assets/checklist/checklist-inativo-topo.png';
import iconeAtivo from '../../../assets/checklist/checklist.png';

type SetChecklistData = React.Dispatch<React.SetStateAction<CreateChecklistBody>>;

interface CheckListDiarioProps {
  isClean: boolean;
  setClean: () => void;
  setChecklistData: SetChecklistData;
}

export function CheckListDiario({
  setChecklistData,
  isClean,
  setClean,
}: CheckListDiarioProps) {

  const { ItemChecklistMotivo } = useContext(ChecklistContext);
  const { listItemChecklistMotivo , itemChecklistMotivo} = ItemChecklistMotivo;

  useEffect(() => {
    setChecklistData((prventState: any) => ({
      ...prventState,
    }))

  },[])

  function getAccordionState() {
    const currentHour = new Date().getHours();
    if ((currentHour >= 8 && currentHour < 9) || (currentHour >= 13 && currentHour < 14)) {
      return "collapse";
    } else {
      return "collapsed";
    }
  }
 const accordionState = useMemo(() => getAccordionState(), []); 

  useEffect(() => {
  },[itemChecklistMotivo])
  return ( 
    <div className="accordion mt-4 " id="accordionExample" >
    {accordionState == "collapsed" && <div className="alert alert-light-info rounded-5 lh-1 mb-4" role="alert">
     <p className="small fs-4 fw-bold lh-1 px-3 mb-3"> Informamos que o checklsit diário só poderá ser realizado entre: </p>
     <p className="small lh-1 px-3 mb-0">8hs e 9hs e 13hs e 14hs</p>
    </div>}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button d-flex gap-2 border rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapseChecklistDiario`}
            aria-expanded="true"
            aria-controls={`collapseChecklistDiario`}
            disabled={accordionState === "collapsed" ? true : false}
          >
            <img src={accordionState === "collapsed" ? iconeInativo : iconeAtivo} style={{width: 24}}/>
            Checklist Diário
          </button>
        </h2>
        <div
          id={`collapseChecklistDiario`}
          className={`accordion-collapse collapse ${accordionState === "collapsed" ? '' : 'show'}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <Row>
              {listItemChecklistMotivo.map((item) => (
                <ChecklistItem
                  key={item.id}
                  itemId={item.id ? item.id : ""}
                  nome={item.nome}
                  tipo={item.tipo}
                  label={item.nome}
                  motivos={item.motivos}
                  setChecklistData={setChecklistData}
                  isClean={isClean}
                  setClean={setClean}
                  isAllow={accordionState}
                />
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
