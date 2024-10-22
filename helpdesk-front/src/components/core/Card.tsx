const STATUS_COLORS = {
  blue: "bg-primary",
  green: "bg-success",
  yellow: "bg-warning",
  red: "bg-danger",
} as const;

type CardProperty = {
  title: string;
  statuscolor: keyof typeof STATUS_COLORS;
  qtdChamados: number;
};

export function Card({
  title,
  statuscolor = "green",
  qtdChamados = 0,
}: CardProperty) {
  return (
    <div className="col-xl-3 col-md-6 ">
      <div className={`card  text-white mb-4  ${STATUS_COLORS[statuscolor]}`}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="card-body shadow-lg">{title}</div>
          <span className="p-2">{qtdChamados}</span>
        </div>
        <div className="card-footer d-flex align-items-center justify-content-between">
          <a className="small text-white stretched-link" href="#">
            Filtrar
          </a>
          <div className="small text-white">
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
