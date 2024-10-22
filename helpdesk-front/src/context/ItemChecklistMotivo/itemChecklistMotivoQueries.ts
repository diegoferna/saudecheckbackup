import { ItemChecklistMotivo, ItemChecklistMotivoConsulta, ItemChecklistMotivoLista } from "./ItemChecklistMotivo";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarItemChecklistMotivo(): Promise<ItemChecklistMotivoLista[]> {
  try {
    const response = await fetch(`${BASE_URL}/itemChecklistMotivo`);
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

export async function todosItensChecklistMotivo(): Promise<ItemChecklistMotivoConsulta[]> {
  try {
    const response = await fetch(`${BASE_URL}/itemChecklistMotivo/todosItensChecklistMotivo`);
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

export async function buscarItemChecklistMotivo() {
  try {
    const response = await fetch(`${BASE_URL}/itemChecklistMotivo/todos`);
    if (!response.ok) {
      throw new Error("Erro ao buscar motivo");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


export async function criarItemChecklistMotivo(ItemChecklistMotivo: ItemChecklistMotivo) {
  try {
    const response = await fetch(`${BASE_URL}/itemChecklistMotivo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ItemChecklistMotivo),
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
  motivo: Omit<ItemChecklistMotivo, "id">
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

export async function deletarItemChecklistMotivo(id: string): Promise<void> {
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
