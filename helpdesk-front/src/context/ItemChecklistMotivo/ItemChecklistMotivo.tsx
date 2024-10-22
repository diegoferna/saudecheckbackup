export interface ItemChecklistMotivo {
  id?: string;
  item_checklist_id: string;
  motivo_ids: string[];
}

export interface ItemChecklistMotivoLista {
  id?: string;
  idItemMotivo: string;
  disponivel: boolean;
  nome: string;
  tipo: string;
  motivos: motivo[];
}

export interface motivo {
  id_motivo: string;
  motivo_nome: string;
}

export interface ItemChecklistMotivoConsulta {
  id: string,
	item_checklist_id: string,
	motivo_id: string,
	created_at: string
}





