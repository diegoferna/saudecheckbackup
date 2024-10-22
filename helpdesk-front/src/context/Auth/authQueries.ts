import { sessionUser } from "../User/User";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(nome: string, senha: string): Promise<sessionUser | null> {
  try {
    const response = await fetch(`${BASE_URL}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, senha }),
    });
    
    if (!response.ok) {
      throw new Error("Erro ao fazer login");
    }
    
    const data = await response.json();
    

    if (data.id) {
      const newUser = <sessionUser>{
        id:data.id,
        nome: data.nome,
        tipo: data.tipo,
        unidade_id: data.unidade_id,
      };

      sessionStorage.setItem("user", JSON.stringify(newUser));

      return newUser;
    }
  } catch (error) {
    throw new Error("Credenciais inválidas");
  }

  return null;
}

export function logout() {
  sessionStorage.removeItem("user");
}
