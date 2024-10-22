import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type CardProps = {
  title: string;
  legenda?: string;
  content: JSX.Element;
};

export function CardDasboard({
  title,
  legenda = "Texto Informativo",
  content,
}: CardProps) {
  return (
    <div className="col-3">
      <div
        className="card text-bg-light mb-3 border-0 shadow rounded "
        style={{ maxWidth: "24rem", minHeight: "180px" }}
      >
        <div className="card-body">
          <div className="card-title-container d-flex gap-2 align-items-center ">
            <h6 className="card-title text-body-secondary m-0 ">{title}</h6>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="tooltip-top">{legenda}</Tooltip>}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                data-tip="Informação"
                style={{ color: "#9fc9fa" }}
              />
            </OverlayTrigger>
          </div>
          <div className="card-text">{content}</div>
        </div>
      </div>
    </div>
  );
}
