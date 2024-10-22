import { Distrito } from "./Distrito";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarDistritos(): Promise<Distrito[]> {
  try {
    const response = await fetch(`${BASE_URL}/distrito`);
    if (!response.ok) {
      throw new Error("Erro ao buscar distritos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function buscarDistrito(id: string): Promise<Distrito | null> {
  try {
    const response = await fetch(`${BASE_URL}/distrito/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar distrito");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function criarDistrito(distrito: Distrito): Promise<Distrito> {
  try {
    const response = await fetch(`${BASE_URL}/distrito`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(distrito),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar distrito");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function atualizarDistrito(
  id: string,
  distrito: Omit<Distrito, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/distritos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(distrito),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar distrito");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletarDistrito(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/distritos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir distrito");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
