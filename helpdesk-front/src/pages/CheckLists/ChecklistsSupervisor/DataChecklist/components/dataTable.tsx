import { useContext, useEffect } from "react";
import { ChecklistContext } from "../../../../../context/useContext";

export function DataTable() {
  const { Checklist } = useContext(ChecklistContext);
  const {  buscarChecklistItem, checklistsDodiaunidade } =
    Checklist;

  async function filteredChecklistItem(id: string) {
     await buscarChecklistItem(id);
  }

  useEffect(() => {
  }, [])

  return (
    <table className="table">
      <thead className="h-25">
        <tr style={{ height: "100px" }}>
          <th scope="col">#</th>
          <th scope="col">Unidade</th>
          <th scope="col">Gerente</th>
          <th scope="col">Checklist Status</th>
        </tr>
      </thead>
      <tbody className="">
        {checklistsDodiaunidade && checklistsDodiaunidade?.map((item, index) => {
          return (
            <tr
              key={index}
              role="button"
              onClick={() => filteredChecklistItem(item.checklist_id)}
            >
              <th scope="row">{index + 1}</th>
              <td>{item.nome_unidade}</td>
              <td>{item.nome_gerente}</td>
              <td>
                <div
                  className="progress"
                  role="progressbar"
                  aria-label="Basic example"
                  aria-valuenow={item.percentual_itens_marcados}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="progress-bar "
                    style={{ width: `${item.percentual_itens_marcados}%` }}
                  >
                    {item.percentual_itens_marcados}%
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}