export interface checklistItemProps {
  id: string;
  data: string;
}

export interface checklistDiario {

}

export interface checklistOcasional {
}
export interface criarChecklistProps {
  id?: string;
  data?: string;
  gerente_id?: string;
  unidade_id?: string;
  //Checklist Diário
  checklistDiario: checklistDiario;
  //Checklist Ocasional
  checklistOcasional: checklistOcasional;
}

export interface checklistItem {
  items: criarChecklistProps;
}

export interface Checklist {
  id?: string;
  data: string;
  unidade_id: string;
  gerente_id: string;
  created_at: string;
  nomeUnidade: string;
  nomeUsuario: string;
  totalTrueItems: number;
}

export interface ChecklistDodia {
  items: Checklist[];
}

export interface farmaciaProfissionalIndisponivel {
  data: string;
  count: number;
}

export interface criarChecklist {
  id?: string;
  data?: string;
  gerente_id?: string;
  unidade_id?: string;
  items: [],

  
}

interface Checklist_Item {
  id: string;
  nome: string;
  disponivel: boolean;
  tipo: "diario";
  motivo: string;
}

export interface ChecklistsItemDoDia {
  checklist_id: string;
  data: string;
  nome_unidade: string;
  nome_gerente: string;
  justificativa: string;
  itens_diario: Checklist_Item[];
  percentual_itens_marcados: number;
}

export interface ChecklistsDoDia {
  checklist_id: string;
  data: string;
  nome_unidade: string;
  nome_gerente: string;
  itens_diario: Checklist_Item[];
  percentual_itens_marcados: number;
}
interface ChecklistItemDiarios {
  id: string;
  nome: string;
  disponivel: boolean;
  tipo: "diario";
  item_id: string;
  motivo_id: string;
}

interface ChecklistItemOcasionals {
  id: string;
  nome: string;
  disponivel: boolean;
  tipo: "ocasional";
  justificativa: string;
}

export interface CreateChecklistBody {
  data?: string;
  unidade_id: string;
  gerente_id: string;
  justificativa: string;
  itemsDiario: ChecklistItemDiarios[];
  itemsOcasional: ChecklistItemOcasionals[];
}

export interface ChecklistResponse {
  checklistsDodia: ChecklistsDoDia[];
}

export interface ChecklistDiarioComConflitos{
  nome:string;
  disponivel: number;
  motivo_diario: string;
}

export interface ChecklistOcasionalComConflitos {
  nome: string;
  disponivel: number;
  justificativa: string;
}
export interface ChecklistComConflitos {
  checklist_id: string;
  data:string;
  nome_unidade:string;
  nome_gerente:string;
  tipo_checklist_diario:string;
  tipo_checklist_ocasional: string;
  conflitos_diario: ChecklistDiarioComConflitos[];
  conflitos_ocasional: ChecklistOcasionalComConflitos[];
}