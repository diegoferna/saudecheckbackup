import { useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import * as unidadeQueries from "./Unidade/unidadeQueries";
import * as distritoQueries from "./Distrito/distritoQueries";
import * as authQueries from "./Auth/authQueries";
import * as userQueries from "./User/useQueries";
import * as checklistQueries from "./Checklist/checkListQueries";
import * as itemchecklistQueries from "./ItemChecklist/itemChecklistQueries";
import * as motivoQueries from "./Motivo/motivoQueries";
import * as enderecoQueries from "./Endereco/enderecoQueries";

import * as itemChecklistMotivoQueries from './ItemChecklistMotivo/itemChecklistMotivoQueries'
import {
  Checklist,
  criarChecklistProps,
  CreateChecklistBody,
  ChecklistsDoDia,
  ChecklistsItemDoDia,
  ChecklistComConflitos,
} from "./Checklist/Checklist";
import { ReseteSenha, User, UsuarioReseteSenha, sessionUser } from "./User/User";
import { Unidade } from "./Unidade/Unidade";
import { ChecklistContext } from "./useContext";
import { Distrito } from "./Distrito/Distrito";
import { ItemChecklist } from "./ItemChecklist/ItemChecklist";
import { Motivo } from "./Motivo/Motivo";
import { ItemChecklistMotivo, ItemChecklistMotivoConsulta, ItemChecklistMotivoLista } from "./ItemChecklistMotivo/ItemChecklistMotivo";
import { Endereco } from "./Endereco/endereco";

interface ChecklistContextProviderProps {
  children: ReactNode;
}

export function ChecklistProvider({ children }: ChecklistContextProviderProps) {
  const [atualizar, setAtualizar] = useState(false);
  const [userData, setUserdata] = useState<sessionUser | null>(null);
  const [checklistItem, setChecklistItem] = useState<ChecklistsItemDoDia>({
    data: new Date().toISOString(),
    nome_unidade: "",
	  nome_gerente: "",
    justificativa: "",
    itens_diario: [],
    checklist_id: "",
    percentual_itens_marcados: 0
  });
  const [checklists, setChecklist] = useState<criarChecklistProps[]>([]);
  const [checklistsDodia, setChecklistdodia] = useState<ChecklistsDoDia[]>([]);
  const [checklisComConflitos, setChecklistComConflitos] = useState<ChecklistComConflitos[]>([]);
  const [checklistsDodiaunidade, setChecklistsDodiaunidade] = useState<ChecklistsDoDia[]>([]);
  const [quantidadeUnidade, setQuantidadeUnidade]= useState< {quantidadeUnidades: number}>({quantidadeUnidades: 0})
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [usuariosresetesenha, setUsuarioresetesenha] = useState<UsuarioReseteSenha[]>([]);
  const [unidades, setUnidades] = useState<Unidade[]>([]);
  const [distrito, setDistritos] = useState<Distrito[]>([]);
  const [itemChecklist, setItemChecklist] = useState<ItemChecklist[]>([]);
  const [itemChecklistOcasional, setItemChecklistOcasional] = useState<ItemChecklist[]>([]);
  const [endereco, setEndereco] = useState<Endereco[]>([]);
  const [motivo, setMotivo] = useState<Motivo[]>([]);
  const [itemChecklistMotivo, setItemChecklistMotivo] = useState<ItemChecklistMotivo[]>([]);
  const [listItemChecklistMotivo, setListItemChecklistMotivo] = useState<ItemChecklistMotivoLista[]>([]);
  const [todosItemChecklistMotivo, setTodosItemChecklistMotivo] = useState<ItemChecklistMotivoConsulta[]>([]);


  const navigate = useNavigate();

  async function listarUsuarios() {
    const data = await userQueries.listarUsuarios();
    setUsuarios(data);
  }

  async function listarUsuariosReseteSenha() {
    const data = await userQueries.listarUsuariosReseteSenha();
    setUsuarioresetesenha(data);
  }

  async function ReseteDeSenha(dados: ReseteSenha) {
    await userQueries.ReseteDeSenha(dados)
  }

  async function criarUsuario(usuario: User) {
    const data = await userQueries.criarUsuario(usuario);
    setUsuarios((state) => [...state, data]);
  }

  function atualizarUsuario(id: string, usuario: Omit<User, "id">) {
    userQueries.atualizarUsuario(id, usuario);
    setUsuarios((state) =>
      state.map((item) => (item.id === id ? { ...item, ...usuario } : item))
    );
  }

  async function alterarSenha(nome: string, senhaAtual:string, novaSenha:string) {
    await userQueries.alterarSenha({nome, senhaAtual, novaSenha});
  }

  async function deletarUsuario(id: string) {
    await userQueries.deletarUsuario(id);
    setUsuarios((state) => state.filter((usuario) => usuario.id !== id));
  }

  async function listarUnidade() {
    const data = await unidadeQueries.listarUnidades();
    setUnidades(data);
  }

  async function buscarUnidade(id: string): Promise<Unidade | null> {
    try {
      const data = await unidadeQueries.buscarUnidade(id);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function criarUnidade(unidade: Unidade) {
    const data = await unidadeQueries.criarUnidade(unidade);
    setUnidades((state) => [...state, data]);
  }

  function atualizarUnidade(id: string, unidade: Omit<Unidade, "id">) {
    unidadeQueries.atualizarUnidade(id, unidade);
    setUnidades((state) =>
      state.map((item) => (item.id === id ? { ...item, ...unidade } : item))
    );
  }

  async function deletarUnidade(id: string) {
    await unidadeQueries.deletarUnidade(id);
    setUnidades((state) => state.filter((unidade) => unidade.id !== id));
  }

  //Distrito

  async function listarDistrito() {
    const data = await distritoQueries.listarDistritos();
    setDistritos(data);
  }

  async function buscarDistrito(id: string): Promise<Distrito | null> {
    try {
      const data = await distritoQueries.buscarDistrito(id);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function criarDistrito(distrito: Distrito) {
    const data = await distritoQueries.criarDistrito(distrito);
    setDistritos((state) => [...state, data]);
  }

  function atualizarDistrito(id: string, distrito: Omit<Distrito, "id">) {
    distritoQueries.atualizarDistrito(id, distrito);
    setDistritos((state) =>
      state.map((item) => (item.id === id ? { ...item, ...distrito } : item))
    );
  }

  async function deletarDistrito(id: string) {
    await distritoQueries.deletarDistrito(id);
    setDistritos((state) => state.filter((distrito) => distrito.id !== id));
  }

  async function login(email: string, senha: string) {
    const userData = await authQueries.login(email, senha);
    setUserdata(userData);
    navigate("/");
  }

  function logout() {
    authQueries.logout();
    setUserdata(null);
    navigate("/");
  }

  async function buscarChecklistItem(id: string) {
    const data = await checklistQueries.buscarChecklist(id);
    setChecklistItem(data);
  }

  async function listarChecklist() {
    const data = await checklistQueries.listarChecklists();
    setChecklist(data);
  }

  async function listarChecklistsDoDia() {
    const data = await checklistQueries.listarChecklistsDoDia();
    setChecklistdodia(data);
  }

  async function listarChecklistsComConflitos() {
    const data = await checklistQueries.listarChecklistsComConflitos();
    setChecklistComConflitos(data);
  }

  async function listarChecklistsDoDiaUnidade(idUsuario: string) {
    const data = await checklistQueries.listarChecklistsDoDiaUnidade(idUsuario);
    setChecklistsDodiaunidade(data);
  }

  async function listarQuantidadeUnidadePorDistrito(idUnidade: string) {
    const data = await checklistQueries.listarQuantidadeUnidadePorDistrito(idUnidade);
    setQuantidadeUnidade(data);
  }



  async function criarChecklist(chcecklist: CreateChecklistBody): Promise<boolean> {
    try {
      const data= await checklistQueries.criarChecklist(chcecklist);
  
      setChecklist((state) => [...state, data]);
      listarChecklistsDoDia();
      return true;
    } catch (error) {
      throw error; 
    }
  }
  

  function atualizarChecklist(id: string, chcecklist: Omit<Checklist, "id">) {
    checklistQueries.atualizarChecklist(id, chcecklist);
    setChecklist((state) =>
      state.map((item) => (item.id === id ? { ...item, ...chcecklist } : item))
    );
  }

  async function buscarChecklistDiario(id: string): Promise<boolean> {
    const data = await checklistQueries.buscarChecklistDiario(id);
    if(data == true){
      return true;
    }else {
      return false;
    }
  }

  async function temChecklist(id: string): Promise<boolean> {
    const data = await checklistQueries.temChecklist(id);
    if(data == true){
      return true;
    }else {
      return false;
    }
  }
  
  async function deletarChecklist(id: string) {
    await checklistQueries.deletarChecklist(id);
    setChecklist((state) => state.filter((chcecklist) => chcecklist.id !== id));
  }

  async function listarItemChecklist() {
    const data = await itemchecklistQueries.listarItemChecklist();
    setItemChecklist(data);
  }

  async function criarItemChecklist(itemChecklist: ItemChecklist) {
    const data = await itemchecklistQueries.criarItemChecklist(itemChecklist);
    setItemChecklist((state) => [...state, data]);
    listarItemChecklist();
    
  }

  async function listarItemChecklistOcasional() {
    const data = await itemchecklistQueries.listarItemChecklistOcasional();
    setItemChecklistOcasional(data);
  }

  async function listarMotivo() {
    const data = await motivoQueries.listarMotivos();
    setMotivo(data);
  }

  async function criarMotivo(motivo: Motivo) {
    const data = await motivoQueries.criarMotivo(motivo);
    setMotivo((state) => [...state, data]);
    listarItemChecklistMotivo();
  }

  async function listarItemChecklistMotivo() {
    const data = await itemChecklistMotivoQueries.listarItemChecklistMotivo();
    setListItemChecklistMotivo(data);
  }

  async function todosItensChecklistMotivo() {
    const data = await itemChecklistMotivoQueries.todosItensChecklistMotivo();
    setTodosItemChecklistMotivo(data);
  }

  async function criarItemChecklistMotivo(itemChecklistMotivo: ItemChecklistMotivo) {
    const data = await itemChecklistMotivoQueries.criarItemChecklistMotivo(itemChecklistMotivo);
    setItemChecklistMotivo((state) => [...state, data]);
    listarItemChecklist();

  }

  async function listarEndereco() {
    const data = await enderecoQueries.listarEndereco();
    setEndereco(data);
  }

  async function criarEndereco(endereco: Endereco) {
    const data = await enderecoQueries.criarEndereco(endereco);
    setEndereco((state) => [...state, data]);
    listarEndereco();
  }




  useEffect(() => {
    listarUsuarios();
    listarUnidade();
    listarDistrito();
    listarChecklistsDoDia();
    listarItemChecklist();
    listarItemChecklistOcasional();
    listarMotivo();
    listarEndereco();
    listarItemChecklistMotivo();
    listarUsuariosReseteSenha();
    todosItensChecklistMotivo();
  }, []);
  
  return (
    <ChecklistContext.Provider
      value={{
        Login: { login, logout, userData },
        User: {
          usuarios,
          usuariosresetesenha,
          listarUsuarios,
          criarUsuario,
          atualizarUsuario,
          alterarSenha,
          listarUsuariosReseteSenha,
          deletarUsuario,
          ReseteDeSenha,
        },
        Distrito: {
          distrito,
          listarDistrito,
          criarDistrito,
          atualizarDistrito,
          deletarDistrito,
          buscarDistrito,
        },
        Unidade: {
          unidades,
          listarUnidade,
          criarUnidade,
          atualizarUnidade,
          deletarUnidade,
          buscarUnidade,
        },
        Checklist: {
          atualizar,
          setAtualizar,
          checklistItem,
          checklistsDodiaunidade,
          quantidadeUnidade,
          checklisComConflitos,
          buscarChecklistDiario,
          temChecklist,
          buscarChecklistItem,
          checklists,
          checklistsDodia,
          listarChecklist,
          listarChecklistsDoDia,
          listarChecklistsDoDiaUnidade,
          listarQuantidadeUnidadePorDistrito,
          listarChecklistsComConflitos,
          criarChecklist,
          atualizarChecklist,
          deletarChecklist,
        },
        ItemChecklist: {
          itemChecklist,
          itemChecklistOcasional,
          listarItemChecklist,
          listarItemChecklistOcasional,
          criarItemChecklist
        },
        Motivo: {
          motivo,
          listarMotivo,
          criarMotivo
        },
        Endereco:  {
          endereco,
          listarEndereco,
          criarEndereco
        },
        ItemChecklistMotivo: {
          itemChecklistMotivo,
          listItemChecklistMotivo,
          todosItemChecklistMotivo,
          listarItemChecklistMotivo,
          criarItemChecklistMotivo,
          todosItensChecklistMotivo,
        }
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
}
