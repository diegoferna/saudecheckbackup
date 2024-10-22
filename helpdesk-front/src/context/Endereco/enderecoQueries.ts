import { Endereco } from "./endereco";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarEndereco(): Promise<Endereco[]> {
  try {
    const response = await fetch(`${BASE_URL}/endereco`);
    if (!response.ok) {
      throw new Error("Erro ao buscar motivo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function buscarEndereco() {
  try {
    const response = await fetch(`${BASE_URL}/endereco`);
    if (!response.ok) {
      throw new Error("Erro ao buscar motivo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


export async function criarEndereco(endereco: Endereco) {
  try {
    const response = await fetch(`${BASE_URL}/endereco`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar motivo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function atualizarItemChecklistMotivo(
  id: string,
  endereco: Omit<Endereco, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/endereco/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar motivo");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletarEndereco(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/endereco/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir motivo");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
