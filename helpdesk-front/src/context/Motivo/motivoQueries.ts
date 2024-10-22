import { Motivo } from "./Motivo";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarMotivos(): Promise<Motivo[]> {
  try {
    const response = await fetch(`${BASE_URL}/motivo`);
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

export async function buscarMotivo(id: string): Promise<Motivo | null> {
  try {
    const response = await fetch(`${BASE_URL}/motivo/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar motivo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function criarMotivo(motivo: Motivo) {
  try {
    const response = await fetch(`${BASE_URL}/motivo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(motivo),
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

export async function atualizarMotivo(
  id: string,
  motivo: Omit<Motivo, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/motivo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(motivo),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar motivo");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletarMotivo(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/motivo/${id}`, {
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
