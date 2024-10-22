type dataType = {
  nome: string;
  descricao: string;
};

type DataItemProps = {
  data: dataType[];
};

export function DataItem({ data }: DataItemProps) {
  return (
    <ol
      className="list-group list-group-numbered"
      style={{ width: "100%", height: "300px" }}
    >
      {data.map((item) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-start"
          style={{ width: "100%", height: "100vh" }}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.nome}</div>
            {item.descricao}
          </div>

          <div
            className="progress"
            role="progressbar"
            aria-label="Basic example"
          >
            <div className="progress-bar" style={{ width: "25%" }}></div>
          </div>
        </li>
      ))}
    </ol>
  );
}
