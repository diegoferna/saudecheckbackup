import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";

interface Props {
  show: boolean;
  onHide: () => void;
  title: string;
  isValid: boolean;
}

export function ConfirmModal({ show, onHide, title, isValid }: Props) {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (show) {
      setTimer(setTimeout(onHide, 2000));
    } else {
      if (timer) clearTimeout(timer);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Body className="text-center">
        {isValid ? (
          <CheckCircle size={60} className="text-success mb-3" />
        ) : (
          <CheckCircle size={60} className="text-danger mb-3" />
        )}
        <span className="ml-2"> {title}</span>
      </Modal.Body>
    </Modal>
  );
}
