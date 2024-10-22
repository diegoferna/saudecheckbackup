import { useContext, useEffect, useMemo, useState } from "react";
import { ChecklistContext } from "../../../../context/useContext";
import { CardDasboard } from "./components/CardDashboard";
import { DataTable } from "./components/dataTable";
import { UnidadeDetails } from "./components/unidadeDetails";

export function DataChecklist() {
  const [itemChecklist] = useState("");
  const { Checklist, Unidade } = useContext(ChecklistContext);
  const { checklistsDodia,listarChecklistsDoDiaUnidade,  listarQuantidadeUnidadePorDistrito, quantidadeUnidade, checklistsDodiaunidade} = Checklist;
  const { unidades } = Unidade;
  const qtd_unidades_completas = useMemo(() => {
    const totalChecklistsEsperadosPorUnidade = quantidadeUnidade.quantidadeUnidades; 
    
    return (checklistsDodiaunidade.length / (totalChecklistsEsperadosPorUnidade * 2)) * 100;
}, [checklistsDodia, unidades]);


  const unidadesComPercentualMenorQue100 = checklistsDodia.filter(item => {
    return item.percentual_itens_marcados !== 100;
  });
  
  const quantidadeUnidadesComPercentualMenorQue100 = unidadesComPercentualMenorQue100.length;
  
  const unidadesComPercentual100 = checklistsDodia.filter(item => {
    return item.percentual_itens_marcados === 100;
  });
  
  const quantidadeUnidadesComPercentual100 = unidadesComPercentual100.length;
  
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  async function carregarUsuario () {
    if(user){
      await listarChecklistsDoDiaUnidade(user.id)
      await listarQuantidadeUnidadePorDistrito(user.id)
    }
  }


  useEffect(() => {
    carregarUsuario()
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <CardDasboard
          title="Unidades Cadastradas"
          legenda="Quantidade de unidades cadastradas no sistema"
          content={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">{quantidadeUnidade.quantidadeUnidades}</h5>
              </div>
            </div>
          }
        />
        <CardDasboard
          title="Unidades"
          legenda="Quantidade de unidades que realizaram o checklist hoje."
          content={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">{qtd_unidades_completas}%</h5>
              </div>
            </div>
          }
        />
        <CardDasboard title="Com conflitos" content={<div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">{quantidadeUnidadesComPercentualMenorQue100}</h5>
              </div>
            </div>} />
        <CardDasboard title="Checklist sem conflitos" content={<div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">{quantidadeUnidadesComPercentual100}</h5>
              </div>
            </div>} />
      </div>

      <div className="row">
        <div className="col-6 ">
          <div className="card text-bg-light mb-3 border-0 shadow rounded p-2">
            <div className="card-body">
              <div
                className="card-title-container d-flex gap-2 align-items-center overflow-auto"
                style={{ maxHeight: "430px", overflowY: "auto" }}
              >
                <DataTable/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <UnidadeDetails itemChecklist={itemChecklist} />
        </div>
      </div>
    </div>
  );
}
