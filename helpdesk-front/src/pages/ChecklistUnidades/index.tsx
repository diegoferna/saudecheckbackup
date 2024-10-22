import { useContext, useEffect } from "react";
import { Accordion, Card, Container, Table } from "react-bootstrap";
import { ChecklistContext } from "../../context/useContext";


export function ChecklistsComConflitosPage() {
  const { Checklist } = useContext(ChecklistContext);
  const { checklisComConflitos, listarChecklistsComConflitos } = Checklist;

  useEffect(() => {
    listarChecklistsComConflitos();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Checklists com Conflitos</h1>

      {checklisComConflitos.map((checklist: any, index:any) => (
        <Card key={checklist.checklist_id}>
          <Table striped bordered hover>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{checklist.nome_unidade} </Accordion.Header>
                <Accordion.Body>
                  <thead>
                    <tr>
                      <th>Unidade</th>
                      <th>Gerente</th>
                      <th>Conflitos Diário</th>
                      <th>Conflitos Ocasional</th>
                      <th>Justificativa</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{checklist.nome_unidade}</td>
                      <td>{checklist.nome_gerente}</td>
                      <td>
                        <ul>
                          {checklist.conflitos_diario.map(
                            (conflito: any, index: any) =>
                              conflito.motivo_nome != null && (
                                <li
                                  key={index}
                                >{`${conflito.nome} - ${conflito.motivo_nome}`}</li>
                              )
                          )}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {checklist.conflitos_ocasional.map(
                            (conflito: any, index: any) => (
                              <li
                                key={index}
                              >{`${conflito.nome} - ${conflito.justificativa}`}</li>
                            )
                          )}
                        </ul>
                      </td>
                      <td>{checklist.justificativa}</td>
                    </tr>
                  </tbody>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Table>
        </Card>
      ))}
    </Container>
  );
}
