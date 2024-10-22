import { createContext } from "react";
import {
  Checklist,
  ChecklistComConflitos,
  ChecklistsDoDia,
  ChecklistsItemDoDia,
  CreateChecklistBody,
  criarChecklistProps,
} from "./Checklist/Checklist";
import { ReseteSenha, User, UsuarioReseteSenha, sessionUser } from "./User/User";
import { Unidade } from "./Unidade/Unidade";
import { Distrito } from "./Distrito/Distrito";
import { ItemChecklist } from "./ItemChecklist/ItemChecklist";
import { Motivo } from "./Motivo/Motivo";
import { ItemChecklistMotivo, ItemChecklistMotivoConsulta, ItemChecklistMotivoLista } from "./ItemChecklistMotivo/ItemChecklistMotivo";
import { Endereco } from "./Endereco/endereco";

type LoginProps = {
  login(username: string, password: string): Promise<void>;
  logout(): void;
  user?: User | null;
  userData: sessionUser | null;
};

type UsuarioProps = {
  usuarios: User[];
  usuariosresetesenha:UsuarioReseteSenha[], 
  listarUsuarios(): Promise<void>;
  listarUsuariosReseteSenha(): Promise<void>;
  criarUsuario(usuario: User): Promise<void>;
  atualizarUsuario(id: string, usuario: Omit<User, "id">): void;
  alterarSenha(nome: string, senhaAtual:string, novaSenha:string): void;
  deletarUsuario(id: string): void;
  ReseteDeSenha(dados:ReseteSenha): void;
};

type DistritoProps = {
  distrito: Distrito[];
  listarDistrito(): Promise<void>;
  criarDistrito(distrito: Distrito): Promise<void>;
  atualizarDistrito(id: string, distrito: Omit<Distrito, "id">): void;
  deletarDistrito(id: string): void;
  buscarDistrito(id: string): Promise<Distrito | null>;
};

type UnidadeProps = {
  unidades: Unidade[];
  listarUnidade(): Promise<void>;
  criarUnidade(unidade: Unidade): Promise<void>;
  atualizarUnidade(id: string, unidade: Omit<Unidade, "id">): void;
  deletarUnidade(id: string): void;
  buscarUnidade(id: string): Promise<Unidade | null>;
};

type ChecklistProps = {
  atualizar: boolean;
  setAtualizar: React.Dispatch<React.SetStateAction<boolean>>;
  checklistItem: ChecklistsItemDoDia;
  checklists: criarChecklistProps[];
  checklistsDodia: ChecklistsDoDia[];
  checklistsDodiaunidade: ChecklistsDoDia[];
  quantidadeUnidade: {quantidadeUnidades: number};
  checklisComConflitos: ChecklistComConflitos[];
  buscarChecklistDiario(id: string): Promise<boolean>;
  temChecklist(id: string): Promise<boolean>;
  buscarChecklistItem(id: string): void;
  listarChecklist(): Promise<void>;
  listarChecklistsComConflitos(): Promise<void>;
  listarChecklistsDoDia(): Promise<void>;
  listarChecklistsDoDiaUnidade(idUsuario: string): Promise<void>;
  listarQuantidadeUnidadePorDistrito(idUnidade: string): Promise<void>;
  criarChecklist(checklist: CreateChecklistBody): Promise<boolean>;
  atualizarChecklist(id: string, checklist: Omit<Checklist, "id">): void;
  deletarChecklist(id: string): void;
};

type ItemChecklistProps = {
  itemChecklist: ItemChecklist[];
  itemChecklistOcasional: ItemChecklist[];
  listarItemChecklist(): Promise<void>;
  listarItemChecklistOcasional(): Promise<void>;
  criarItemChecklist(itemChecklist: ItemChecklist): Promise<void>;
}

type MotivoProps = {
  motivo: Motivo[];
  listarMotivo(): Promise<void>;
  criarMotivo(motivo: Motivo): Promise<void>;
}

type EnderecoProps = {
  endereco: Endereco[];
  listarEndereco(): Promise<void>;
  criarEndereco(endereco: Endereco): Promise<void>;
}

type ItemChecklistMotivoProps = {
  itemChecklistMotivo: ItemChecklistMotivo[];
  todosItemChecklistMotivo:ItemChecklistMotivoConsulta[];
  listItemChecklistMotivo: ItemChecklistMotivoLista[];
  listarItemChecklistMotivo(): Promise<void>;
  todosItensChecklistMotivo(): Promise<void>;
  criarItemChecklistMotivo(itemChecklistMotivo: ItemChecklistMotivo): Promise<void>;
}
interface ChecklistContextData {
  Login: LoginProps;
  User: UsuarioProps;
  Distrito: DistritoProps;
  Unidade: UnidadeProps;
  Checklist: ChecklistProps;
  ItemChecklist: ItemChecklistProps;
  Motivo: MotivoProps;
  Endereco: EnderecoProps;
  ItemChecklistMotivo: ItemChecklistMotivoProps;
}

export const ChecklistContext = createContext<ChecklistContextData>(
  {} as ChecklistContextData
);
