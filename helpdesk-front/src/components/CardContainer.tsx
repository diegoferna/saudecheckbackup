export function CardContainer() {
  return (
    <div className="row">
      <div className="col-xl-3 col-md-6">
        <div className="card bg-primary text-white mb-4">
          <div className="card-body">Chamados Concluidos</div>
          <div className="card-footer d-flex align-items-center justify-content-between">
            <a className="small text-white stretched-link" href="#">
              Ver detalhes
            </a>
            <div className="small text-white">
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
