import { ItemChecklist } from "./ItemChecklist";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarItemChecklist(): Promise<ItemChecklist[]> {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist/item-checklist-diario`);
    if (!response.ok) {
      throw new Error("Erro ao buscar ItemChecklist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function listarItemChecklistOcasional(): Promise<ItemChecklist[]> {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist/item-checklist-ocasional`);
    if (!response.ok) {
      throw new Error("Erro ao buscar ItemChecklist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function buscarItemChecklist(id: string): Promise<ItemChecklist | null> {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar ItemChecklist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function criarItemChecklist(ItemChecklist: ItemChecklist) {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ItemChecklist),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar ItemChecklist");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function atualizarItemChecklist(
  id: string,
  ItemChecklist: Omit<ItemChecklist, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ItemChecklist),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar ItemChecklist");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletarItemChecklist(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/ItemChecklist/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir ItemChecklist");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
