import { useContext, useEffect } from "react";
import { DataChecklist } from "../../components/core/DataChecklist";
import { ChecklistContext } from "../../context/useContext";

export default function CheckLit() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const { Checklist } = useContext(ChecklistContext);
  const {listarChecklistsDoDia } = Checklist;

  useEffect(() => {
    const intervalId = setInterval(() => {
     
      listarChecklistsDoDia();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <main className="px-4">
      <div className="container-fluid px-0">
        <h1 className="mt-4">Histórico</h1>
        <div className="alert alert-primary" role="alert">
          Histórico diário de checklists - {formattedDate}
        </div>
      </div>
      <div className="mb-4">
        <div className="">
          <hr className="bg-gray" />
          <DataChecklist />
        </div>
      </div>
    </main>
  );
}
