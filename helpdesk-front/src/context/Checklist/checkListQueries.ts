import { Checklist, CreateChecklistBody } from "./Checklist";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function listarChecklists() {
  try {
    const response = await fetch(`${BASE_URL}/checklists`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checklists");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}



export async function buscarChecklist(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/checklists/checklistDiario/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar checklist");
    }
    const checklist = await response.json();
    return checklist;
  } catch (error) {
    console.error(error);
  }
}

export async function buscarChecklistDiario(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/checklists/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar checklist");
    }
    const checklist = await response.json();

    return checklist;
  } catch (error) {
    console.error(error);
  }
}

export async function temChecklist(id: string) {
  try {
    const response = await fetch(`${BASE_URL}/checklists/tem-checklist/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar checklist");
    }
    const checklist = await response.json();

    return checklist;
  } catch (error) {
    console.error(error);
  }
}


export async function listarChecklistsDoDia() {
  try {
    const response = await fetch(`${BASE_URL}/checklists/checklists-detalhados`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checklists do dia");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function listarChecklistsComConflitos() {
  try {
    const response = await fetch(`${BASE_URL}/checklists/checklists-com-conflitos`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checklists do dia");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function listarChecklistsDoDiaUnidade(idUsuario: string) {
  try {
    const response = await fetch(`${BASE_URL}/checklists/checklists-detalhados-usuario/${idUsuario}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checklists do dia");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}


export async function listarQuantidadeUnidadePorDistrito(idUsuario: string) {
  try {
    const response = await fetch(`${BASE_URL}/checklists/quantidade-unidades-distrito/${idUsuario}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar checklists do dia");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

export async function criarChecklist(checklist: CreateChecklistBody) {
  try {
    const response = await fetch(`${BASE_URL}/checklists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checklist),
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar checklists do dia");
    }

    const data = await response.json();
    return  data ;
  } catch (error) {
    return  error;
  }
}



export async function atualizarChecklist(
  id: string,
  checklist: Omit<Checklist, "id">
): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}}/checklists/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checklist),
    });
    if (!response.ok) {
      throw new Error("Erro ao atualizar checklist");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deletarChecklist(id: string): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/checklists/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir checklist");
    }
  } catch (error) {
    console.error(error);
  }
}
