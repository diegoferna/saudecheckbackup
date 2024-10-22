import { useEffect } from "react";
import { DataChecklist } from "./DataChecklist";
import { CheckListDiario } from "../../../components/core/ChecklistDiario";

export default function CheckLitSupervisor() {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();

  useEffect(() => {}, [CheckListDiario]);
  
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
