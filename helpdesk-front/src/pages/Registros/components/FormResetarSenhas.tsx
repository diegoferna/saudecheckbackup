import  { useState, useEffect, useContext } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";

export default function FormResetarSenhas() {
  const { User } = useContext(ChecklistContext);
  const { listarUsuariosReseteSenha, usuariosresetesenha, ReseteDeSenha } = User;
  const [senhaPorUsuario, setSenhaPorUsuario] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [filtroNome, setFiltroNome] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      await listarUsuariosReseteSenha();
    };

    fetchUsuarios();
  }, []);

  const handleResetSenha = async () => {
    if (!selectedUserId || !senhaPorUsuario[selectedUserId]) {
      // Adicione uma lógica aqui para lidar com campos em branco, se necessário
      return;
    }

    try {
      await ReseteDeSenha({
        id: selectedUserId,
        novaSenhaPadrao: senhaPorUsuario[selectedUserId],
      });

      setShowModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSenhaPorUsuario({});
      setSelectedUserId("");
    }
  };

  const handleChangeSenha = (userId:any, value:any) => {
    setSenhaPorUsuario((prev:any) => ({ ...prev, [userId]: value }));
  };

  const handleBuscar = () => {
    // Implemente a lógica de filtragem pelo nome aqui
    // Esta implementação assume que o nome do usuário é uma string
    // e que a comparação é case-insensitive
    return usuariosresetesenha.filter((usuario) =>
      usuario.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );
  };

  return (
    <div className="container mt-4">
      <Form className="mb-3">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Buscar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </Form.Group>
        <Button type="button" onClick={handleBuscar}>
          Buscar
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nova Senha</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {handleBuscar().map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>
                <Form.Control
                  type="password"
                  value={senhaPorUsuario[usuario.id] || ""}
                  onChange={(e) => handleChangeSenha(usuario.id, e.target.value)}
                  required
                />
              </td>
              <td>
                <Button
                  onClick={() => {
                    setSelectedUserId(usuario?.id);
                    handleResetSenha();
                  }}
                >
                  Resetar Senha
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ConfirmModal
        isValid={senhaPorUsuario[selectedUserId] !== undefined && selectedUserId !== ""}
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Senha Resetada"
      />
    </div>
  );
}
