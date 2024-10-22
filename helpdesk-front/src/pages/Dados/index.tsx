import { useContext, useEffect } from "react";
import { Card } from "../../components/core/Card";
import { ChecklistContext } from "../../context/useContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Dados() {
  const {} = useContext(ChecklistContext);

  useEffect(() => {}, []);

  return (
    <main className="px-4">
      <div className="container-fluid px-0">
        <h1 className="mt-4">Dados dos checklists</h1>
        <div className="alert alert-primary" role="alert">
          Dados disponíveis dos ultimos 30 dias
        </div>

        <div className="row ">
          <Card
            title="Checklist com Farmácia Indisponível"
            statuscolor="yellow"
            qtdChamados={0}
            // qtdChamados={farmaciaData.length}
          />
          <Card
            title="Checklist com Profissionais Ausente"
            statuscolor="red"
            qtdChamados={0}
            // qtdChamados={profissionalData.length}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="">
          <hr className="bg-gray" />
          <h1>Gráficos</h1>
        </div>
        <div className="container d-flex flex-row ">
          <BarChart
            width={500}
            height={300}
            //data={farmaciaData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <BarChart
            width={500}
            height={300}
            //data={profissionalData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </main>
  );
}
