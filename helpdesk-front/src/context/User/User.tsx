export interface User {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
}

export interface sessionUser {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  unidade_id: string;
}

export interface UsuarioReseteSenha {
  id: string;
  nome: string;
}

export interface ReseteSenha {
  id: string;
  novaSenhaPadrao: string;
}