import { useContext, useEffect } from "react";
import { ChecklistContext } from "../../../../context/useContext";
import "./table.css";
import { listarChecklistsDoDia } from "../../../../context/Checklist/checkListQueries";

export function DataTable() {
  const { Checklist } = useContext(ChecklistContext);
  const { checklistsDodia, buscarChecklistItem } = Checklist;

  async function filteredChecklistItem(id: string) {
    await buscarChecklistItem(id);
  }

  useEffect(() => {
    listarChecklistsDoDia();
  }, [checklistsDodia]);

  return (
    <div
      className="card text-bg-light mb-3 border-0 shadow rounded p-2"
      style={{ maxHeight: "480px", overflowY: "auto" }}
    >
      <div className="card-body ">
        <div className="card-title-container d-flex gap-2 align-items-center overflow-auto">
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Unidade</th>
                <th>Gerente</th>
                <th>Checklist Status</th>
              </tr>
            </thead>
            <tbody>
              {checklistsDodia?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    role="button"
                    onClick={() => filteredChecklistItem(item.checklist_id)}
                    className="container"
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{item.nome_unidade}</td>
                    <td>{item.nome_gerente}</td>
                    <td>
                      <div
                        className="progress"
                        role="progressbar"
                        aria-label="Basic example"
                        aria-valuenow={parseFloat(
                          item.percentual_itens_marcados.toFixed(2)
                        )}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar "
                          style={{
                            width: `${item.percentual_itens_marcados}%`,
                          }}
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
        </div>
      </div>
    </div>
  );
}
