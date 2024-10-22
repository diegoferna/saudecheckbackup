import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { ChecklistContext } from "../../../context/useContext";
import { ConfirmModal } from "../../../components/core/Modal/ConfirmModal";
import { CheckListDiario } from "../../../components/core/ChecklistDiario";
import { CheckListOcasional } from "../../../components/core/ChecklistOcasional";
import { CreateChecklistBody } from "../../../context/Checklist/Checklist";
import { sessionUser } from "../../../context/User/User";

interface Props {
  user: sessionUser;
}

const TodoForm = ({ user }: Props) => {
  const { Checklist } = useContext(ChecklistContext);
  const {criarChecklist, setAtualizar} = Checklist;
  const { buscarChecklistDiario, temChecklist } = Checklist;
  const [showModal, setShowModal] = useState(false);
  const [addCheck, setAddcheck] = useState(false);
  const [clean, setClean] = useState(false);
  const [temChecklistdodia, setTemchecklistdodia] = useState(false);
  const [existeDoischecklist, setExisteDoischecklist] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [checklistData, setChecklistData] = useState<CreateChecklistBody>({
    data: new Date().toISOString(),
    gerente_id: user?.id,
    unidade_id: user?.unidade_id,
    justificativa: "",
    itemsDiario: [],
    itemsOcasional: [],
  });

  const justificativa = checklistData.justificativa;

  async function Temchecklistdodia() {
    const result = await temChecklist(user?.unidade_id);
    if(result){
      setTemchecklistdodia(true)
    } else {
      setTemchecklistdodia(false)
    }
  }

  const isAllow =  checklistData.itemsDiario.find(item => !item.disponivel)

  async function ExisteDoisChecklistsNoDia() {
    const result = await buscarChecklistDiario(user?.unidade_id);
    if(result){
      setExisteDoischecklist(true)
    } else {
      setExisteDoischecklist(false)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (isSaving) {
      return; // Evitar múltiplos envios enquanto estiver aguardando resposta do servidor
    }

    setIsSaving(true);

    if (user?.unidade_id === undefined || user?.id === undefined) {
      alert("Erro: unidadeId ou gerenteId não definidos");
      return;
    }
    try {
      if(checklistData.itemsDiario.length == 0 && temChecklistdodia != true){
          alert('Conclua o primeiro checklist diário.')
          return;
      }else if(checklistData.itemsDiario.length != 0 && existeDoischecklist == true){
        alert('Já existem 2 checklist feito no dia de hoje.')
        return;
      }else {
        const resultado = await criarChecklist(checklistData);
        
        if(resultado){
          setAtualizar(true);
          setShowModal(true);
          setAddcheck(true);

          setChecklistData(prevState => ({ ...prevState, justificativa: '' }));
        }else {
          alert('Falha ao criar o checklist. Verifique as informações e tente novamente.');
        }

      }
    } catch (error) {
      console.error(error); 
      setShowModal(false);
    }finally{
      setTimeout(() => {
        setIsSaving(false);
        window.location.reload();
      }, 8000);
    }
  };

  const handleCleaning = () => {
    setClean(true);
  };

  useEffect(() => {
    Temchecklistdodia()
    ExisteDoisChecklistsNoDia()
  }, [clean, checklistData]);

  return (
    <div className="container">
      <Form onSubmit={handleSubmit} className="container">
        <CheckListDiario
          setChecklistData={setChecklistData}
          isClean={clean}
          setClean={() => setClean(false)}
        />

        <CheckListOcasional
          setChecklistData={setChecklistData}
          isClean={clean}
          setClean={() => setClean(false)}
        />
        { checklistData.itemsDiario.some(item => !item.disponivel) &&  <div className="form-group mt-4">
          <textarea 
            className="form-control" 
            id="exampleFormControlTextarea3" 
            value={justificativa}
            rows={7} 
            placeholder="Justifique..."
            required={isAllow != null}
            onChange={e => setChecklistData(prevState => ({ ...prevState, justificativa: e.target.value }))}
          ></textarea>
        </div>}
       

        <div className="d-flex gap-2 mt-5 d-flex justify-content-center gap-4">
          <Button type="submit" disabled={isSaving} className="btn-lg btn-salvar" style={{width: 120, height: 60}}>Salvar</Button>
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={handleCleaning}
            style={{width: 120, height: 60}}
          >
            Cancelar
          </button>
        </div>
      </Form>
      
      <ConfirmModal
        isValid={addCheck}
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Checklist completo"
      />
    </div>
  );
};

export default TodoForm;
