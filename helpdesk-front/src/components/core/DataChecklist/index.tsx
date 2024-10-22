import { useContext, useMemo, useState } from "react";
import { ChecklistContext } from "../../../context/useContext";
import { CardDasboard } from "./components/CardDashboard";
import { DataTable } from "./components/dataTable";
import { UnidadeDetails } from "./components/unidadeDetails";
import { NavLink } from "react-router-dom";
import { AnimatedCounter } from "../../AnimatedCounter";

export function DataChecklist() {
  const [itemChecklist] = useState("");
  const { Checklist, Unidade } = useContext(ChecklistContext);
  const { checklistsDodia } = Checklist;
  const { unidades } = Unidade;
  const qtd_unidades_completas = useMemo(() => {
    const totalChecklistsEsperadosPorUnidade = 2; // 2 checklists por unidade
    const unidadesCompletas = unidades.filter((unidade) => {
      const checklistsConcluidosPorUnidade = checklistsDodia.filter(
        (checklist) => checklist.nome_unidade === unidade.nome
      ).length;
      return (
        checklistsConcluidosPorUnidade != 0 &&
        checklistsConcluidosPorUnidade <= totalChecklistsEsperadosPorUnidade
      );
    });

    return (unidadesCompletas.length * 100) / unidades.length;
  }, [checklistsDodia, unidades]);

  const unidadesComPercentualMenorQue100 = checklistsDodia.filter((item) => {
    return item.percentual_itens_marcados !== 100;
  });

  const quantidadeUnidadesComPercentualMenorQue100 =
    unidadesComPercentualMenorQue100.length;

  const unidadesComPercentual100 = checklistsDodia.filter((item) => {
    return item.percentual_itens_marcados === 100;
  });

  const quantidadeUnidadesComPercentual100 = unidadesComPercentual100.length;

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
                <h5 className="fs-1">{unidades.length - 1}</h5>
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
                <h5 className="fs-1">
                  <AnimatedCounter count={qtd_unidades_completas}/>%
                </h5>
              </div>
            </div>
          }
        />
        <CardDasboard
          title="Com conflitos"
          borderColor="border-danger"
          content={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">
                  <NavLink
                    to={"/checklistComConflitos"}
                    style={{ textDecoration: "none" }}
                  >
                    <AnimatedCounter
                      count={quantidadeUnidadesComPercentualMenorQue100}
                    />
                  </NavLink>
                </h5>
              </div>
            </div>
          }
        />
        <CardDasboard
          title="Checklist sem conflitos"
          borderColor="border-success"
          content={
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "130px" }}
            >
              <div>
                <h5 className="fs-1">
                  <AnimatedCounter count={quantidadeUnidadesComPercentual100} />
                </h5>
              </div>
            </div>
          }
        />
      </div>

      <div className="row ">
        <div className="col-6">
          <DataTable />
        </div>
        <div className="col-6">
          <UnidadeDetails itemChecklist={itemChecklist} />
        </div>
      </div>
    </div>
  );
}
