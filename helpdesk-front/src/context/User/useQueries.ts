import { User } from "./User";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarUsuarios() {
  try {
    const response = await fetch(`${BASE_URL}/usuario`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function listarUsuariosReseteSenha() {
  try {
    const response = await fetch(`${BASE_URL}/usuario/lista-usuarios`);
    if (!response.ok) {
      throw new Error("Erro ao buscar usuario");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function criarUsuario(usuario: User) {
  try {
    const response = await fetch(`${BASE_URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function ReseteDeSenha(dados: {
  id: string;
  novaSenhaPadrao : string;
}): Promise<{ message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/usuario/resetarSenha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao alterar a senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function alterarSenha(dados: {
  nome: string;
  senhaAtual: string;
  novaSenha: string;
}): Promise<{ message: string }> {
  try {
    const response = await fetch(`${BASE_URL}/usuario/alterarSenha`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao alterar a senha");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function atualizarUsuario(id: string, usuario: Omit<User, "id">) {
  try {
    const response = await fetch(`${BASE_URL}/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deletarUsuario(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/usuario/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir usuário");
    }
  } catch (error) {
    console.error(error);
  }
}
