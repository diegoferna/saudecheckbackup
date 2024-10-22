import { Unidade } from "./Unidade";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarUnidades(): Promise<Unidade[]> {
  try {
    const response = await fetch(`${BASE_URL}/unidade`);
    if (!response.ok) {
      throw new Error("Erro ao buscar unidades");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function buscarUnidade(id: string): Promise<Unidade | null> {
  try {
    const response = await fetch(`${BASE_URL}/unidade/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar unidade");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function criarUnidade(unidade: Unidade) {
  try {
    const response = await fetch(`${BASE_URL}/unidade`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unidade),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar unidade");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function atualizarUnidade(
  id: string,
  unidade: Omit<Unidade, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/unidades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unidade),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar unidade");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletarUnidade(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/unidades/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir unidade");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
