
type tipo = 'ocasional' | 'diario'

export interface ItemChecklist {
  id?: string;
  nome: string;
  disponivel: boolean;
  tipo_checklist: tipo;
}

